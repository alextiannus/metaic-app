/**
 * MetaIC Backend API Server
 */

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import { errorHandler, notFoundHandler } from './shared/middleware'
import logger from './config/logger'

// Import routes
import authRoutes from './services/auth/auth.routes'
import cardRoutes from './services/card/card.routes'
import aiRoutes from './services/ai/ai.routes'
import tokenRoutes from './services/token/token.routes'
import networkRoutes from './services/network/network.routes'
import communicationRoutes from './services/communication/communication.routes'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const API_VERSION = process.env.API_VERSION || 'v1'

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use('/api/', limiter)

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'metaic-backend'
  })
})

// API Routes
app.use(`/api/${API_VERSION}/auth`, authRoutes)
app.use(`/api/${API_VERSION}/cards`, cardRoutes)
app.use(`/api/${API_VERSION}/ai`, aiRoutes)
app.use(`/api/${API_VERSION}/tokens`, tokenRoutes)
app.use(`/api/${API_VERSION}/network`, networkRoutes)
app.use(`/api/${API_VERSION}/communication`, communicationRoutes)

// Error handling
app.use(notFoundHandler)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 MetaIC Backend API Server running on port ${PORT}`)
  logger.info(`📚 API Version: ${API_VERSION}`)
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
  logger.info(`📍 Health check: http://localhost:${PORT}/health`)
  logger.info(`🔗 API Base: http://localhost:${PORT}/api/${API_VERSION}`)
})

export default app

