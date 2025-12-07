/**
 * AI Service Routes
 */

import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { authenticate, AuthRequest } from '../../shared/middleware'
import { aiService } from './ai.service'
import { ApiResponse } from '../../shared/types'

const router = Router()

// Validation schemas
const generateProfileSchema = z.object({
  inputType: z.enum(['business_card_image', 'resume', 'manual_input']),
  imageBase64: z.string().optional(),
  imageMimeType: z.string().optional(),
  resumeText: z.string().optional(),
  basicInfo: z.object({}).optional()
})

/**
 * POST /ai/generate-profile
 * Generate profile using AI
 */
router.post('/generate-profile', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const data = generateProfileSchema.parse(req.body)
    const userId = req.user!.userId

    // Get or create card
    // This would be handled by card service
    const cardId = req.body.cardId || 'temp'

    let result
    if (data.inputType === 'business_card_image' && data.imageBase64) {
      result = await aiService.generateProfileFromCardImage(
        userId,
        cardId,
        data.imageBase64,
        data.imageMimeType || 'image/png'
      )
    } else if (data.inputType === 'resume' && data.resumeText) {
      result = await aiService.generateProfileFromResume(userId, cardId, data.resumeText)
    } else {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_INPUT', message: 'Invalid input type or missing data' }
      })
    }

    const response: ApiResponse = {
      success: true,
      data: { profile: result }
    }

    res.json(response)
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: {
        code: 'AI_GENERATION_ERROR',
        message: error.message || 'Failed to generate profile'
      }
    })
  }
})

/**
 * POST /ai/chatbot
 * Public chatbot for profile pages
 */
router.post('/chatbot', async (req: Request, res: Response) => {
  try {
    const { cardId, sessionId, message, history } = req.body

    if (!cardId || !sessionId || !message) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_PARAMS', message: 'cardId, sessionId, and message are required' }
      })
    }

    const response = await aiService.generateChatbotResponse(
      cardId,
      sessionId,
      message,
      history || []
    )

    res.json({
      success: true,
      data: { response }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'CHATBOT_ERROR',
        message: error.message || 'Failed to generate response'
      }
    })
  }
})

export default router

