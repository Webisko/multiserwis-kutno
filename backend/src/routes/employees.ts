import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { randomBytes } from 'crypto';
import { getDbPool } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

const employeeSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  phone: z.string().min(5).optional()
});

// Helper: generate unique invite token
function generateInviteToken(): string {
  return randomBytes(32).toString('hex');
}

// GET /api/employees - list employees for guardian
router.get('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      // Check if user is company guardian
      const [userRows]: any = await conn.execute(
        'SELECT role, employee_limit FROM users WHERE id = ?',
        [req.user?.userId]
      );

      if (userRows.length === 0 || userRows[0].role !== 'COMPANY_GUARDIAN') {
        return res.status(403).json({ error: 'Only company guardians can list employees' });
      }

      const [employees]: any = await conn.execute(
        `SELECT id, email, name, phone, status, created_at 
         FROM employees 
         WHERE guardian_id = ? 
         ORDER BY created_at DESC`,
        [req.user?.userId]
      );

      // Count stats
      const totalCount = employees.length;
      const activeCount = employees.filter((e: any) => e.status === 'active').length;
      const pendingCount = employees.filter((e: any) => e.status === 'pending').length;

      res.json({
        employees,
        stats: {
          total: totalCount,
          active: activeCount,
          pending: pendingCount,
          limit: userRows[0].employee_limit,
          available: Math.max(0, userRows[0].employee_limit - totalCount)
        }
      });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('List employees error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/employees - add employee
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const parse = employeeSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Invalid payload', details: parse.error.flatten() });
    }

    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      // Check if user is company guardian
      const [userRows]: any = await conn.execute(
        'SELECT role, employee_limit FROM users WHERE id = ?',
        [req.user?.userId]
      );

      if (userRows.length === 0 || userRows[0].role !== 'COMPANY_GUARDIAN') {
        return res.status(403).json({ error: 'Only company guardians can add employees' });
      }

      // Check limit
      const [countRows]: any = await conn.execute(
        'SELECT COUNT(*) as count FROM employees WHERE guardian_id = ?',
        [req.user?.userId]
      );

      if (countRows[0].count >= userRows[0].employee_limit) {
        return res.status(400).json({ error: 'Employee limit reached' });
      }

      // Check if email already exists for this guardian
      const [existing]: any = await conn.execute(
        'SELECT id FROM employees WHERE guardian_id = ? AND email = ?',
        [req.user?.userId, parse.data.email]
      );

      if (existing.length > 0) {
        return res.status(409).json({ error: 'Employee with this email already exists' });
      }

      const employeeId = randomUUID();
      const inviteToken = generateInviteToken();
      const tokenExpires = new Date();
      tokenExpires.setDate(tokenExpires.getDate() + 7); // 7 days validity

      await conn.execute(
        'INSERT INTO employees (id, guardian_id, email, name, phone, status, invite_token, token_expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [employeeId, req.user?.userId, parse.data.email, parse.data.name, parse.data.phone || null, 'pending', inviteToken, tokenExpires]
      );

      res.status(201).json({
        id: employeeId,
        email: parse.data.email,
        name: parse.data.name,
        status: 'pending',
        inviteLink: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/invite/${inviteToken}`
      });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Add employee error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/employees/:id - edit employee
router.put('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const parse = employeeSchema.partial().safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Invalid payload', details: parse.error.flatten() });
    }

    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      // Check ownership and role
      const [empRows]: any = await conn.execute(
        'SELECT guardian_id FROM employees WHERE id = ?',
        [req.params.id]
      );

      if (empRows.length === 0 || empRows[0].guardian_id !== req.user?.userId) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      const updates = parse.data;
      const setClauses = Object.keys(updates).map(k => `${k} = ?`).join(', ');
      const values = [...Object.values(updates), req.params.id];

      await conn.execute(
        `UPDATE employees SET ${setClauses} WHERE id = ?`,
        values
      );

      res.json({ success: true });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Update employee error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/employees/:id - delete employee
router.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      // Check ownership
      const [empRows]: any = await conn.execute(
        'SELECT guardian_id FROM employees WHERE id = ?',
        [req.params.id]
      );

      if (empRows.length === 0 || empRows[0].guardian_id !== req.user?.userId) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      await conn.execute('DELETE FROM employees WHERE id = ?', [req.params.id]);

      res.json({ success: true });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Delete employee error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/employees/verify-invite/:token - activate employee account
router.post('/verify-invite/:token', async (req, res) => {
  try {
    const { password, name } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      // Find employee by token
      const [empRows]: any = await conn.execute(
        'SELECT id, email, guardian_id FROM employees WHERE invite_token = ? AND token_expires_at > NOW()',
        [req.params.token]
      );

      if (empRows.length === 0) {
        return res.status(404).json({ error: 'Invalid or expired invite token' });
      }

      const employee = empRows[0];

      // TODO: Create user account for employee
      // For now just mark as active
      await conn.execute(
        'UPDATE employees SET status = ?, invite_token = NULL WHERE id = ?',
        ['active', employee.id]
      );

      res.json({ success: true, message: 'Account activated' });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Verify invite error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
