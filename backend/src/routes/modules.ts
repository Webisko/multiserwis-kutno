import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { getDbPool } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

const moduleSchema = z.object({
  course_id: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().optional(),
  order_index: z.number().default(0)
});

// GET /api/modules/:courseId - list modules for course
router.get('/course/:courseId', async (req, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [modules]: any = await conn.execute(
        'SELECT id, title, description, order_index FROM modules WHERE course_id = ? ORDER BY order_index',
        [req.params.courseId]
      );

      res.json(modules);
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('List modules error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/modules - create module (admin only)
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const parse = moduleSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Invalid payload', details: parse.error.flatten() });
    }

    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      // Check if user is admin
      const [userRows]: any = await conn.execute(
        'SELECT role FROM users WHERE id = ?',
        [req.user?.userId]
      );

      if (userRows.length === 0 || userRows[0].role !== 'ADMIN') {
        return res.status(403).json({ error: 'Forbidden' });
      }

      // Check if course exists
      const [courseRows]: any = await conn.execute(
        'SELECT id FROM courses WHERE id = ?',
        [parse.data.course_id]
      );

      if (courseRows.length === 0) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const moduleId = randomUUID();
      const { title, description, order_index, course_id } = parse.data;

      await conn.execute(
        'INSERT INTO modules (id, course_id, title, description, order_index) VALUES (?, ?, ?, ?, ?)',
        [moduleId, course_id, title, description, order_index]
      );

      res.status(201).json({ id: moduleId, title, course_id });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Create module error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/modules/:id - update module (admin only)
router.put('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [userRows]: any = await conn.execute('SELECT role FROM users WHERE id = ?', [req.user?.userId]);
      if (userRows.length === 0 || userRows[0].role !== 'ADMIN') {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const parse = moduleSchema.partial().safeParse(req.body);
      if (!parse.success) {
        return res.status(400).json({ error: 'Invalid payload' });
      }

      const updates = parse.data;
      const setClauses = Object.keys(updates).map(k => `${k} = ?`).join(', ');
      const values = [...Object.values(updates), req.params.id];

      await conn.execute(
        `UPDATE modules SET ${setClauses} WHERE id = ?`,
        values
      );

      res.json({ success: true });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Update module error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/modules/:id - delete module (admin only)
router.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [userRows]: any = await conn.execute('SELECT role FROM users WHERE id = ?', [req.user?.userId]);
      if (userRows.length === 0 || userRows[0].role !== 'ADMIN') {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await conn.execute('DELETE FROM modules WHERE id = ?', [req.params.id]);
      res.json({ success: true });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Delete module error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
