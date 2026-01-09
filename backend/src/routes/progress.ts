import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { getDbPool } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

const progressSchema = z.object({
  enrollment_id: z.string().uuid(),
  lesson_id: z.string().uuid().optional(),
  module_id: z.string().uuid().optional(),
  status: z.enum(['not_started', 'in_progress', 'completed']),
  time_spent_seconds: z.number().default(0)
});

// GET /api/progress/:enrollmentId - get progress for enrollment
router.get('/:enrollmentId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      // Verify ownership
      const [enrollments]: any = await conn.execute(
        'SELECT user_id FROM enrollments WHERE id = ?',
        [req.params.enrollmentId]
      );

      if (enrollments.length === 0 || enrollments[0].user_id !== req.user?.userId) {
        return res.status(404).json({ error: 'Not found' });
      }

      const [progress]: any = await conn.execute(
        `SELECT p.id, p.lesson_id, p.module_id, p.status, p.completed_at, p.time_spent_seconds,
                l.title as lesson_title, m.title as module_title
         FROM progress p
         LEFT JOIN lessons l ON p.lesson_id = l.id
         LEFT JOIN modules m ON p.module_id = m.id
         WHERE p.enrollment_id = ?
         ORDER BY p.completed_at DESC`,
        [req.params.enrollmentId]
      );

      res.json(progress);
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Get progress error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/progress - track lesson/module completion
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const parse = progressSchema.safeParse(req.body);
      if (!parse.success) {
        return res.status(400).json({ error: 'Invalid payload', details: parse.error.flatten() });
      }

      // Verify enrollment ownership
      const [enrollments]: any = await conn.execute(
        'SELECT user_id FROM enrollments WHERE id = ?',
        [parse.data.enrollment_id]
      );

      if (enrollments.length === 0 || enrollments[0].user_id !== req.user?.userId) {
        return res.status(404).json({ error: 'Enrollment not found' });
      }

      // Check if progress already exists
      let progressId;
      if (parse.data.lesson_id) {
        const [existing]: any = await conn.execute(
          'SELECT id FROM progress WHERE enrollment_id = ? AND lesson_id = ?',
          [parse.data.enrollment_id, parse.data.lesson_id]
        );

        if (existing.length > 0) {
          progressId = existing[0].id;
          // Update existing
          await conn.execute(
            'UPDATE progress SET status = ?, time_spent_seconds = time_spent_seconds + ?, completed_at = NOW() WHERE id = ?',
            [parse.data.status, parse.data.time_spent_seconds, progressId]
          );
        } else {
          // Create new
          progressId = randomUUID();
          const completedAt = parse.data.status === 'completed' ? new Date() : null;
          await conn.execute(
            'INSERT INTO progress (id, enrollment_id, lesson_id, module_id, status, completed_at, time_spent_seconds) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [progressId, parse.data.enrollment_id, parse.data.lesson_id, parse.data.module_id, parse.data.status, completedAt, parse.data.time_spent_seconds]
          );
        }
      }

      // Update enrollment progress percentage
      const [stats]: any = await conn.execute(
        `SELECT COUNT(*) as total, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
         FROM progress WHERE enrollment_id = ?`,
        [parse.data.enrollment_id]
      );

      const progressPercent = stats[0].total > 0 ? Math.round((stats[0].completed / stats[0].total) * 100) : 0;
      await conn.execute(
        'UPDATE enrollments SET progress_percent = ? WHERE id = ?',
        [progressPercent, parse.data.enrollment_id]
      );

      res.status(201).json({ id: progressId });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Track progress error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
