/**
 * Business Card Routes
 */

import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { cardService } from './card.service'
import { authenticate, optionalAuth, AuthRequest } from '../../shared/middleware'
import { ApiResponse } from '../../shared/types'

const router = Router()

// Validation schemas
const createCardSchema = z.object({
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  title: z.string().optional(),
  tagline: z.string().optional(),
  headline: z.string().optional(),
  bio: z.array(z.string()).optional(),
  is_public: z.boolean().optional(),
})

/**
 * GET /cards/:slug
 * Get public card by slug
 */
router.get('/:slug', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params
    const card = await cardService.getCardBySlug(slug)

    if (!card) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Card not found'
        }
      })
    }

    // Track view
    await cardService.trackView(
      card.id || '',
      req.user?.userId,
      'link_share'
    )

    const response: ApiResponse = {
      success: true,
      data: { card }
    }

    res.json(response)
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message
      }
    })
  }
})

/**
 * POST /cards
 * Create a new card
 */
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const data = createCardSchema.parse(req.body)
    const card = await cardService.createCard(req.user!.userId, data)

    const response: ApiResponse = {
      success: true,
      data: { card }
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
        code: 'CARD_CREATION_ERROR',
        message: error.message || 'Failed to create card'
      }
    })
  }
})

/**
 * PUT /cards/:id
 * Update card
 */
router.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const data = createCardSchema.partial().parse(req.body)
    
    const card = await cardService.updateCard(id, req.user!.userId, data)

    const response: ApiResponse = {
      success: true,
      data: { card }
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

    res.status(400).json({
      success: false,
      error: {
        code: 'CARD_UPDATE_ERROR',
        message: error.message || 'Failed to update card'
      }
    })
  }
})

export default router

