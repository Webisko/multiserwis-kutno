import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { getDbPool } from '../db';
import { config } from '../config';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// Mock test users for development
const TEST_USERS = [
  { email: 'admin@test.com', password: 'admin123', name: 'Administrator', role: 'ADMIN', phone: '+48 123 456 789' },
  { email: 'student@test.com', password: 'student123', name: 'Jan Kowalski', role: 'STUDENT', phone: '+48 730 101 000' },
  { email: 'guardian@test.com', password: 'guardian123', name: 'Opiekun Firmy ABC', role: 'COMPANY_GUARDIAN', phone: '+48 345 678 901', company: 'ABC Sp. z o.o.' }
];

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional()
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const parse = credentialsSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Invalid payload', details: parse.error.flatten() });
    }

    const { email, password } = parse.data;

    // Check test users first (for development)
    const testUser = TEST_USERS.find(u => u.email === email && u.password === password);
    if (testUser) {
      const token = jwt.sign({ userId: testUser.email }, config.jwtSecret, { expiresIn: '7d' });
      return res.json({
        token,
        user: {
          id: testUser.email,
          email: testUser.email,
          name: testUser.name,
          phone: testUser.phone,
          role: testUser.role,
          company: testUser.company,
          employeeLimit: 10
        }
      });
    }

    // Check database users
    const pool = getDbPool();
    const conn = await pool.getConnection();
    
    try {
      const [rows]: any = await conn.execute(
        'SELECT id, email, name, phone, role, company, employee_limit, password_hash FROM users WHERE email = ?',
        [email]
      );

      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = rows[0];
      const validPassword = await bcrypt.compare(password, user.password_hash);

      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '7d' });

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          role: user.role,
          company: user.company,
          employeeLimit: user.employee_limit
        }
      });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const parse = credentialsSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Invalid payload', details: parse.error.flatten() });
    }

    const { email, password, name } = parse.data;
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      // Check if email exists
      const [existing]: any = await conn.execute('SELECT id FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      // Hash password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const userId = randomUUID();

      // Insert user
      await conn.execute(
        'INSERT INTO users (id, email, name, password_hash, role) VALUES (?, ?, ?, ?, ?)',
        [userId, email, name || email.split('@')[0], passwordHash, 'STUDENT']
      );

      // Issue token
      const token = jwt.sign({ userId }, config.jwtSecret, { expiresIn: '7d' });

      return res.status(201).json({
        token,
        user: {
          id: userId,
          email,
          name: name || email.split('@')[0],
          role: 'STUDENT'
        }
      });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [rows]: any = await conn.execute(
        'SELECT id, email, name, phone, role, company, employee_limit FROM users WHERE id = ?',
        [req.user?.userId]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json({
        id: rows[0].id,
        email: rows[0].email,
        name: rows[0].name,
        phone: rows[0].phone,
        role: rows[0].role,
        company: rows[0].company,
        employeeLimit: rows[0].employee_limit
      });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Get user error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
