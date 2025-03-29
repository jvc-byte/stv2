import { Pool } from 'pg';

let pool: Pool;

// Check if DATABASE_URL environment variable exists (for production)
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Often needed for cloud PostgreSQL
    }
  });
} else {
  // Fall back to individual credential variables (for local development)
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
  });
}

export default pool;