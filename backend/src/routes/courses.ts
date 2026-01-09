import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { getDbPool } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  price: z.number().default(0),
  duration_hours: z.number().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  is_published: z.boolean().default(false)
});

// GET /api/courses - list all published courses
router.get('/', async (_req, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [rows]: any = await conn.execute(
        'SELECT id, title, description, slug, price, duration_hours, difficulty FROM courses WHERE is_published = true ORDER BY created_at DESC'
      );
      res.json(rows);
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('List courses error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/courses/:slug - get course details
router.get('/:slug', async (req, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [courseRows]: any = await conn.execute(
        'SELECT * FROM courses WHERE slug = ? AND is_published = true',
        [req.params.slug]
      );

      if (courseRows.length === 0) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const course = courseRows[0];

      // Get modules and lessons
      const [modules]: any = await conn.execute(
        'SELECT id, title, description, order_index FROM modules WHERE course_id = ? ORDER BY order_index',
        [course.id]
      );

      for (const module of modules) {
        const [lessons]: any = await conn.execute(
          'SELECT id, title, video_url, video_duration_seconds, order_index FROM lessons WHERE module_id = ? ORDER BY order_index',
          [module.id]
        );
        module.lessons = lessons;
      }

      res.json({ ...course, modules });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Get course error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/courses - create course (admin only)
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  try {
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

      const parse = courseSchema.safeParse(req.body);
      if (!parse.success) {
        return res.status(400).json({ error: 'Invalid payload', details: parse.error.flatten() });
      }

      const courseId = randomUUID();
      const { title, description, slug, price, duration_hours, difficulty, is_published } = parse.data;

      await conn.execute(
        'INSERT INTO courses (id, title, description, slug, price, duration_hours, difficulty, is_published, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [courseId, title, description, slug, price, duration_hours, difficulty, is_published, req.user?.userId]
      );

      res.status(201).json({ id: courseId, title, slug });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Create course error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/courses/:id - update course (admin only)
router.put('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [userRows]: any = await conn.execute('SELECT role FROM users WHERE id = ?', [req.user?.userId]);
      if (userRows.length === 0 || userRows[0].role !== 'ADMIN') {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const parse = courseSchema.partial().safeParse(req.body);
      if (!parse.success) {
        return res.status(400).json({ error: 'Invalid payload', details: parse.error.flatten() });
      }

      const updates = parse.data;
      const setClauses = Object.keys(updates).map(k => `${k} = ?`).join(', ');
      const values = [...Object.values(updates), req.params.id];

      await conn.execute(
        `UPDATE courses SET ${setClauses}, updated_at = NOW() WHERE id = ?`,
        values
      );

      res.json({ success: true });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Update course error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/courses/:id - delete course (admin only)
router.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [userRows]: any = await conn.execute('SELECT role FROM users WHERE id = ?', [req.user?.userId]);
      if (userRows.length === 0 || userRows[0].role !== 'ADMIN') {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await conn.execute('DELETE FROM courses WHERE id = ?', [req.params.id]);
      res.json({ success: true });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Delete course error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
