/**
 * Communication Plan Routes
 */

import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { authenticate, AuthRequest } from '../../shared/middleware'
import { communicationService } from './communication.service'
import { ApiResponse } from '../../shared/types'

const router = Router()

// Validation schemas
const generatePlanSchema = z.object({
  planType: z.enum(['greeting', 'birthday', 'milestone', 'follow_up', 'check_in']),
  context: z.object({}).optional()
})

/**
 * POST /communication/generate/:contactId
 * Generate communication plan
 */
router.post('/generate/:contactId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { contactId } = req.params
    const data = generatePlanSchema.parse(req.body)

    const plan = await communicationService.generatePlan(
      req.user!.userId,
      contactId,
      data.planType,
      data.context
    )

    res.json({
      success: true,
      data: { plan }
    })
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

    res.status(500).json({
      success: false,
      error: {
        code: 'PLAN_GENERATION_ERROR',
        message: error.message || 'Failed to generate plan'
      }
    })
  }
})

/**
 * GET /communication/plans
 * Get all communication plans
 */
router.get('/plans', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query
    const plans = await communicationService.getPlans(
      req.user!.userId,
      status as string | undefined
    )

    res.json({
      success: true,
      data: { plans }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'PLANS_ERROR',
        message: error.message
      }
    })
  }
})

/**
 * POST /communication/schedule/:planId
 * Schedule a communication
 */
router.post('/schedule/:planId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { planId } = req.params
    const { scheduledDate, channel } = req.body

    if (!scheduledDate || !channel) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_PARAMS',
          message: 'scheduledDate and channel are required'
        }
      })
    }

    await communicationService.scheduleCommunication(
      planId,
      new Date(scheduledDate),
      channel
    )

    res.json({
      success: true,
      data: { message: 'Communication scheduled' }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SCHEDULE_ERROR',
        message: error.message
      }
    })
  }
})

/**
 * POST /communication/greeting/:contactId
 * Generate greeting message
 */
router.post('/greeting/:contactId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { contactId } = req.params
    const plan = await communicationService.generateGreeting(req.user!.userId, contactId)

    res.json({
      success: true,
      data: { plan }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'GREETING_ERROR',
        message: error.message
      }
    })
  }
})

export default router

