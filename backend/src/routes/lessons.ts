import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { getDbPool } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

const lessonSchema = z.object({
  module_id: z.string().uuid(),
  title: z.string().min(3),
  content: z.string().optional(),
  video_url: z.string().url().optional(),
  video_duration_seconds: z.number().optional(),
  order_index: z.number().default(0)
});

// GET /api/lessons/:moduleId - list lessons for module
router.get('/module/:moduleId', async (req, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [lessons]: any = await conn.execute(
        'SELECT id, title, content, video_url, video_duration_seconds, order_index FROM lessons WHERE module_id = ? ORDER BY order_index',
        [req.params.moduleId]
      );

      res.json(lessons);
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('List lessons error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/lessons/:id - get single lesson
router.get('/:id', async (req, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [lessons]: any = await conn.execute(
        'SELECT * FROM lessons WHERE id = ?',
        [req.params.id]
      );

      if (lessons.length === 0) {
        return res.status(404).json({ error: 'Lesson not found' });
      }

      res.json(lessons[0]);
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Get lesson error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/lessons - create lesson (admin only)
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const parse = lessonSchema.safeParse(req.body);
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

      // Check if module exists
      const [moduleRows]: any = await conn.execute(
        'SELECT id FROM modules WHERE id = ?',
        [parse.data.module_id]
      );

      if (moduleRows.length === 0) {
        return res.status(404).json({ error: 'Module not found' });
      }

      const lessonId = randomUUID();
      const { title, content, video_url, video_duration_seconds, order_index, module_id } = parse.data;

      await conn.execute(
        'INSERT INTO lessons (id, module_id, title, content, video_url, video_duration_seconds, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [lessonId, module_id, title, content, video_url, video_duration_seconds, order_index]
      );

      res.status(201).json({ id: lessonId, title, module_id });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Create lesson error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/lessons/:id - update lesson (admin only)
router.put('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [userRows]: any = await conn.execute('SELECT role FROM users WHERE id = ?', [req.user?.userId]);
      if (userRows.length === 0 || userRows[0].role !== 'ADMIN') {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const parse = lessonSchema.partial().safeParse(req.body);
      if (!parse.success) {
        return res.status(400).json({ error: 'Invalid payload' });
      }

      const updates = parse.data;
      const setClauses = Object.keys(updates).map(k => `${k} = ?`).join(', ');
      const values = [...Object.values(updates), req.params.id];

      await conn.execute(
        `UPDATE lessons SET ${setClauses} WHERE id = ?`,
        values
      );

      res.json({ success: true });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Update lesson error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/lessons/:id - delete lesson (admin only)
router.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [userRows]: any = await conn.execute('SELECT role FROM users WHERE id = ?', [req.user?.userId]);
      if (userRows.length === 0 || userRows[0].role !== 'ADMIN') {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await conn.execute('DELETE FROM lessons WHERE id = ?', [req.params.id]);
      res.json({ success: true });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Delete lesson error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
