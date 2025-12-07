/**
 * Database Configuration
 */

import { Pool, PoolConfig } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// Get database user from environment or use current system user
const dbUser = process.env.DB_USER || process.env.USER || 'postgres'
const dbPassword = process.env.DB_PASSWORD || ''

const poolConfig: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'metaic',
  user: dbUser,
  password: dbPassword || undefined,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

export const pool = new Pool(poolConfig)

// Test connection on startup
pool.query('SELECT NOW()')
  .then(() => {
    console.log('✅ Database connected successfully')
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err.message)
  })

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err)
})

export default pool
