/**
 * Communication Plan Service
 * Manages communication plans, scheduling, and automation
 */

import { pool } from '../../config/database'
import logger from '../../config/logger'
import { v4 as uuidv4 } from 'uuid'
import { aiService } from '../ai/ai.service'

export class CommunicationService {
  /**
   * Generate communication plan
   */
  async generatePlan(
    userId: string,
    contactId: string,
    planType: string,
    context?: any
  ): Promise<any> {
    const client = await pool.connect()
    try {
      // Use AI service to generate plan
      const plan = await aiService.generateCommunicationPlan(
        userId,
        contactId,
        planType,
        context
      )

      return plan
    } catch (error: any) {
      logger.error('Communication plan generation error:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Get communication plans for user
   */
  async getPlans(userId: string, status?: string): Promise<any[]> {
    const client = await pool.connect()
    try {
      let query = `SELECT cp.*, sc.remark_text, sc.remark_location, bc.slug, u.full_name as contact_name
                   FROM communication_plans cp
                   JOIN saved_contacts sc ON sc.id = cp.saved_contact_id
                   JOIN business_cards bc ON bc.id = sc.business_card_id
                   JOIN users u ON u.id = bc.user_id
                   WHERE cp.user_id = $1`
      const params: any[] = [userId]

      if (status) {
        query += ' AND cp.status = $2'
        params.push(status)
      }

      query += ' ORDER BY cp.scheduled_date ASC, cp.created_at DESC'

      const result = await client.query(query, params)
      return result.rows
    } finally {
      client.release()
    }
  }

  /**
   * Schedule communication
   */
  async scheduleCommunication(
    planId: string,
    scheduledDate: Date,
    channel: string
  ): Promise<void> {
    const client = await pool.connect()
    try {
      await client.query(
        `UPDATE communication_plans 
         SET scheduled_date = $1, channel = $2, status = 'scheduled'
         WHERE id = $3`,
        [scheduledDate, channel, planId]
      )
    } finally {
      client.release()
    }
  }

  /**
   * Send communication (background job)
   */
  async sendScheduledCommunications(): Promise<void> {
    const client = await pool.connect()
    try {
      // Get all scheduled communications that are due
      const result = await client.query(
        `SELECT * FROM communication_plans 
         WHERE status = 'scheduled' 
           AND scheduled_date <= NOW()
         ORDER BY scheduled_date ASC
         LIMIT 100`
      )

      for (const plan of result.rows) {
        try {
          // Send via appropriate channel
          await this.sendMessage(plan)

          // Update status
          await client.query(
            `UPDATE communication_plans 
             SET status = 'sent', sent_at = CURRENT_TIMESTAMP
             WHERE id = $1`,
            [plan.id]
          )
        } catch (error: any) {
          logger.error(`Failed to send communication ${plan.id}:`, error)
          // Mark as failed but don't throw
        }
      }
    } finally {
      client.release()
    }
  }

  /**
   * Send message via channel
   */
  private async sendMessage(plan: any): Promise<void> {
    // This would integrate with WhatsApp, Email, SMS APIs
    // TODO: Implement channel integrations
    logger.info(`Sending ${plan.plan_type} via ${plan.channel} to contact ${plan.saved_contact_id}`)
  }

  /**
   * Generate greeting message for new contact
   */
  async generateGreeting(userId: string, contactId: string): Promise<any> {
    return this.generatePlan(userId, contactId, 'greeting')
  }

  /**
   * Generate birthday wish
   */
  async generateBirthdayWish(userId: string, contactId: string): Promise<any> {
    return this.generatePlan(userId, contactId, 'birthday')
  }

  /**
   * Generate milestone congratulations
   */
  async generateMilestoneMessage(
    userId: string,
    contactId: string,
    milestoneType: string
  ): Promise<any> {
    return this.generatePlan(userId, contactId, 'milestone', { milestoneType })
  }
}

export const communicationService = new CommunicationService()

