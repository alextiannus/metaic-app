/**
 * Authentication Routes
 */

import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { authService } from './auth.service'
import { authenticate } from '../../shared/middleware'
import { ApiResponse } from '../../shared/types'

const router = Router()

// Validation schemas
const registerSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(8).optional(),
  full_name: z.string().min(1),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  auth_provider: z.enum(['email', 'phone', 'google', 'apple', 'wechat']),
  auth_provider_id: z.string().optional(),
})

const loginSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(1),
})

/**
 * POST /auth/register
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body)
    const result = await authService.register(data)
    
    const response: ApiResponse = {
      success: true,
      data: result
    }
    
    res.status(201).json(response)
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: error.errors
        }
      })
    }
    
    res.status(400).json({
      success: false,
      error: {
        code: 'REGISTRATION_ERROR',
        message: error.message || 'Registration failed'
      }
    })
  }
})

/**
 * POST /auth/login
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const credentials = loginSchema.parse(req.body)
    const result = await authService.login(credentials)
    
    const response: ApiResponse = {
      success: true,
      data: result
    }
    
    res.json(response)
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: error.errors
        }
      })
    }
    
    res.status(401).json({
      success: false,
      error: {
        code: 'AUTH_INVALID',
        message: error.message || 'Invalid credentials'
      }
    })
  }
})

/**
 * POST /auth/refresh
 */
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body
    
    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Refresh token required'
        }
      })
    }
    
    const result = await authService.refreshToken(refresh_token)
    
    res.json({
      success: true,
      data: result
    })
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: {
        code: 'AUTH_INVALID',
        message: 'Invalid refresh token'
      }
    })
  }
})

/**
 * POST /auth/logout
 */
router.post('/logout', authenticate, async (req: Request, res: Response) => {
  // In a real implementation, you would invalidate the token
  // For now, we'll just return success
  res.json({
    success: true,
    data: { message: 'Logged out successfully' }
  })
})

export default router

