import { Router } from 'express';
import { randomUUID } from 'crypto';
import { getDbPool } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// Helper to generate certificate number
function generateCertificateNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000);
  return `CERT-${year}-${String(random).padStart(4, '0')}`;
}

// GET /api/certificates - list user's certificates
router.get('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [certs]: any = await conn.execute(
        `SELECT c.id, c.certificate_number, c.issued_at, c.expires_at, 
                co.title, co.slug, u.name
         FROM certificates c
         JOIN enrollments e ON c.enrollment_id = e.id
         JOIN courses co ON c.course_id = co.id
         JOIN users u ON c.user_id = u.id
         WHERE c.user_id = ?
         ORDER BY c.issued_at DESC`,
        [req.user?.userId]
      );

      res.json(certs);
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('List certificates error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/certificates - generate certificate (auto called when enrollment completed)
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { enrollment_id } = req.body;

    if (!enrollment_id) {
      return res.status(400).json({ error: 'enrollment_id required' });
    }

    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      // Get enrollment details
      const [enrollments]: any = await conn.execute(
        `SELECT e.id, e.user_id, e.course_id, e.status
         FROM enrollments e
         WHERE e.id = ? AND e.user_id = ?`,
        [enrollment_id, req.user?.userId]
      );

      if (enrollments.length === 0) {
        return res.status(404).json({ error: 'Enrollment not found' });
      }

      const enrollment = enrollments[0];

      if (enrollment.status !== 'completed') {
        return res.status(400).json({ error: 'Enrollment must be completed' });
      }

      // Check if certificate already exists
      const [existing]: any = await conn.execute(
        'SELECT id FROM certificates WHERE enrollment_id = ?',
        [enrollment_id]
      );

      if (existing.length > 0) {
        return res.status(409).json({ error: 'Certificate already issued' });
      }

      // Generate certificate
      const certId = randomUUID();
      const certNumber = generateCertificateNumber();
      const expiresAt = new Date();
      expiresAt.setFullYear(expiresAt.getFullYear() + 3); // Valid for 3 years

      await conn.execute(
        'INSERT INTO certificates (id, enrollment_id, user_id, course_id, certificate_number, expires_at) VALUES (?, ?, ?, ?, ?, ?)',
        [certId, enrollment_id, req.user?.userId, enrollment.course_id, certNumber, expiresAt]
      );

      res.status(201).json({
        id: certId,
        certificate_number: certNumber,
        issued_at: new Date(),
        expires_at: expiresAt
      });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Generate certificate error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/certificates/:certNumber - verify certificate
router.get('/:certNumber', async (req, res) => {
  try {
    const pool = getDbPool();
    const conn = await pool.getConnection();

    try {
      const [certs]: any = await conn.execute(
        `SELECT c.id, c.certificate_number, c.issued_at, c.expires_at,
                co.title, u.name, e.completed_at
         FROM certificates c
         JOIN courses co ON c.course_id = co.id
         JOIN users u ON c.user_id = u.id
         JOIN enrollments e ON c.enrollment_id = e.id
         WHERE c.certificate_number = ?`,
        [req.params.certNumber]
      );

      if (certs.length === 0) {
        return res.status(404).json({ error: 'Certificate not found' });
      }

      const cert = certs[0];
      const isValid = new Date() <= new Date(cert.expires_at);

      res.json({
        ...cert,
        is_valid: isValid
      });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Verify certificate error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
