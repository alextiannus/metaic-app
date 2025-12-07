/**
 * Network Insights Routes
 */

import { Router, Request, Response } from 'express'
import { authenticate, AuthRequest } from '../../shared/middleware'
import { networkService } from './network.service'
import { ApiResponse } from '../../shared/types'

const router = Router()

/**
 * POST /network/insights/:contactId
 * Generate network insights for a contact
 */
router.post('/insights/:contactId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { contactId } = req.params
    const insights = await networkService.generateInsights(req.user!.userId, contactId)

    res.json({
      success: true,
      data: { insights }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INSIGHTS_ERROR',
        message: error.message || 'Failed to generate insights'
      }
    })
  }
})

/**
 * GET /network/insights/:contactId
 * Get network insights for a contact
 */
router.get('/insights/:contactId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { contactId } = req.params
    const insights = await networkService.getInsights(contactId)

    res.json({
      success: true,
      data: { insights }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INSIGHTS_ERROR',
        message: error.message
      }
    })
  }
})

/**
 * POST /network/monitoring/:contactId
 * Enable contact change monitoring
 */
router.post('/monitoring/:contactId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { contactId } = req.params
    const { checkFrequency, changeTypes } = req.body

    await networkService.enableMonitoring(
      req.user!.userId,
      contactId,
      checkFrequency || 'weekly',
      changeTypes || ['job_change', 'company_change', 'promotion']
    )

    res.json({
      success: true,
      data: { message: 'Monitoring enabled' }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'MONITORING_ERROR',
        message: error.message
      }
    })
  }
})

/**
 * GET /network/tags/:contactId
 * Get contact tags
 */
router.get('/tags/:contactId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { contactId } = req.params
    const tags = await networkService.getContactTags(contactId)

    res.json({
      success: true,
      data: { tags }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'TAGS_ERROR',
        message: error.message
      }
    })
  }
})

export default router

