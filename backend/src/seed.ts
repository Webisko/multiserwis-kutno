/**
 * Seed script - creates test users in database
 * Run: npx ts-node src/seed.ts
 */

import { getDbPool } from './db';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    console.log('🌱 Seeding database...');
    const pool = getDbPool();

    // Hash passwords
    const adminPass = await bcrypt.hash('admin123', 10);
    const studentPass = await bcrypt.hash('student123', 10);
    const guardianPass = await bcrypt.hash('guardian123', 10);

    // Check if users already exist
    const [existingUsers] = await pool.query('SELECT COUNT(*) as count FROM users');
    if ((existingUsers as any)[0].count > 0) {
      console.log('✅ Users already exist, skipping seed');
      process.exit(0);
    }

    // Insert test users
    await pool.query(
      'INSERT INTO users (email, password, name, phone, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      ['admin@test.com', adminPass, 'Administrator', '+48 123 456 789', 'ADMIN']
    );

    await pool.query(
      'INSERT INTO users (email, password, name, phone, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      ['student@test.com', studentPass, 'Jan Kowalski', '+48 730 101 000', 'STUDENT']
    );

    await pool.query(
      'INSERT INTO users (email, password, name, phone, role, company, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
      ['guardian@test.com', guardianPass, 'Opiekun Firmy ABC', '+48 345 678 901', 'COMPANY_GUARDIAN', 'ABC Sp. z o.o.']
    );

    console.log('✅ Seed completed successfully!');
    console.log('\nTest credentials:');
    console.log('  Admin: admin@test.com / admin123');
    console.log('  Student: student@test.com / student123');
    console.log('  Guardian: guardian@test.com / guardian123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
