import dotenv from 'dotenv';

dotenv.config({ path: process.env.BACKEND_ENV_PATH || '.env' });

export const config = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  databaseUrl: process.env.DATABASE_URL || '',
  bunny: {
    libraryId: process.env.BUNNY_STREAM_LIBRARY_ID || '',
    apiKey: process.env.BUNNY_STREAM_API_KEY || '',
    pullZone: process.env.BUNNY_PULL_ZONE_URL || ''
  }
};
