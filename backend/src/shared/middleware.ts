/**
 * Shared Middleware
 */

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from './types'

export interface AuthRequest extends Request {
  user?: JwtPayload
}

/**
 * Authentication middleware
 */
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'AUTH_REQUIRED',
          message: 'Authentication required'
        }
      })
    }

    const token = authHeader.substring(7)
    const secret = process.env.JWT_SECRET || 'your-secret-key'
    
    const decoded = jwt.verify(token, secret) as JwtPayload
    req.user = decoded
    
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'AUTH_INVALID',
        message: 'Invalid or expired token'
      }
    })
  }
}

/**
 * Optional authentication middleware
 */
export const optionalAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const secret = process.env.JWT_SECRET || 'your-secret-key'
      const decoded = jwt.verify(token, secret) as JwtPayload
      req.user = decoded
    }
    
    next()
  } catch (error) {
    // Continue without authentication
    next()
  }
}

/**
 * Error handler middleware
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err)
  
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message
    }
  })
}

/**
 * Not found handler
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`
    }
  })
}

