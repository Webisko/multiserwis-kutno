import mysql from 'mysql2/promise';
import { config } from './config';

let pool: mysql.Pool | null = null;

export function getDbPool() {
  if (!config.databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }
  if (!pool) {
    pool = mysql.createPool({ uri: config.databaseUrl, connectionLimit: 10 });
  }
  return pool;
}
