import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { getDbPool } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

const enrollmentSchema = z.object({
  course_id: z.string().uuid()
});

// GET /api/enrollments - list user's enrollments
router.get('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [enrollments]: any = await conn.execute(
        `SELECT e.id, e.course_id, e.status, e.enrolled_at, e.progress_percent, c.title, c.slug, c.difficulty
         FROM enrollments e
         JOIN courses c ON e.course_id = c.id
         WHERE e.user_id = ?
         ORDER BY e.enrolled_at DESC`,
        [req.user?.userId]
      );

      res.json(enrollments);
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('List enrollments error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/enrollments - enroll in course
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const parse = enrollmentSchema.safeParse(req.body);
      if (!parse.success) {
        return res.status(400).json({ error: 'Invalid payload', details: parse.error.flatten() });
      }

      const { course_id } = parse.data;

      // Check if already enrolled
      const [existing]: any = await conn.execute(
        'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
        [req.user?.userId, course_id]
      );

      if (existing.length > 0) {
        return res.status(409).json({ error: 'Already enrolled' });
      }

      // Check if course exists
      const [courseRows]: any = await conn.execute(
        'SELECT id FROM courses WHERE id = ?',
        [course_id]
      );

      if (courseRows.length === 0) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const enrollmentId = randomUUID();
      await conn.execute(
        'INSERT INTO enrollments (id, user_id, course_id, status) VALUES (?, ?, ?, ?)',
        [enrollmentId, req.user?.userId, course_id, 'active']
      );

      res.status(201).json({ id: enrollmentId });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Enroll error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/enrollments/:id - update enrollment status
router.put('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const statusSchema = z.object({
      status: z.enum(['active', 'completed', 'dropped'])
    });

    const parse = statusSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      // Verify ownership
      const [enrollments]: any = await conn.execute(
        'SELECT user_id FROM enrollments WHERE id = ?',
        [req.params.id]
      );

      if (enrollments.length === 0 || enrollments[0].user_id !== req.user?.userId) {
        return res.status(404).json({ error: 'Not found' });
      }

      const completedAt = parse.data.status === 'completed' ? new Date() : null;

      await conn.execute(
        'UPDATE enrollments SET status = ?, completed_at = ?, updated_at = NOW() WHERE id = ?',
        [parse.data.status, completedAt, req.params.id]
      );

      res.json({ success: true });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Update enrollment error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
