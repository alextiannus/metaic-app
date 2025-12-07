/**
 * Token Service Routes
 */

import { Router, Request, Response } from 'express'
import { authenticate, AuthRequest } from '../../shared/middleware'
import { tokenService } from './token.service'
import { ApiResponse } from '../../shared/types'

const router = Router()

/**
 * GET /tokens/balance
 * Get user token balance
 */
router.get('/balance', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const balance = await tokenService.getTokenBalance(req.user!.userId)
    const tier = await tokenService.getSubscriptionTier(req.user!.userId)

    res.json({
      success: true,
      data: {
        balance,
        tier: tier.subscription_tier,
        tierInfo: tier
      }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'TOKEN_ERROR',
        message: error.message
      }
    })
  }
})

/**
 * POST /tokens/verify-lions-club
 * Verify Lions Club ID
 */
router.post('/verify-lions-club', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { lionsClubId } = req.body

    if (!lionsClubId) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_PARAM', message: 'lionsClubId is required' }
      })
    }

    const verified = await tokenService.verifyLionsClubId(req.user!.userId, lionsClubId)

    res.json({
      success: verified,
      data: { verified }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'VERIFICATION_ERROR',
        message: error.message
      }
    })
  }
})

/**
 * POST /tokens/upgrade
 * Upgrade subscription
 */
router.post('/upgrade', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { tierId } = req.body

    if (!tierId) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_PARAM', message: 'tierId is required' }
      })
    }

    await tokenService.upgradeSubscription(req.user!.userId, tierId)

    res.json({
      success: true,
      data: { message: 'Subscription upgraded successfully' }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'UPGRADE_ERROR',
        message: error.message
      }
    })
  }
})

export default router

