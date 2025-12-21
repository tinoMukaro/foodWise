import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import 'dotenv/config.js';

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql);

export default { db, sql};