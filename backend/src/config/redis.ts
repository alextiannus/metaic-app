/**
 * Redis Configuration
 */

import { createClient } from 'redis'
import dotenv from 'dotenv'

dotenv.config()

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
})

redisClient.on('error', (err) => {
  console.warn('⚠️  Redis Client Error (optional service):', err.message)
  // Redis is optional, so we don't throw errors
})

redisClient.on('connect', () => {
  console.log('✅ Redis connected')
})

// Connect to Redis (non-blocking)
if (!redisClient.isOpen) {
  redisClient.connect().catch(() => {
    // Redis is optional, continue without it
    console.log('ℹ️  Continuing without Redis (optional service)')
  })
}

export default redisClient
