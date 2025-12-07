/**
 * Network Insights Service
 * Manages network insights, contact monitoring, and change detection
 */

import { pool } from '../../config/database'
import logger from '../../config/logger'
import { v4 as uuidv4 } from 'uuid'
import { aiService } from '../ai/ai.service'

export class NetworkService {
  /**
   * Generate network insights for a contact
   */
  async generateInsights(userId: string, contactId: string): Promise<any[]> {
    const client = await pool.connect()
    try {
      // Get contact data
      const contactResult = await client.query(
        `SELECT sc.*, bc.*, u.full_name, u.email
         FROM saved_contacts sc
         JOIN business_cards bc ON bc.id = sc.business_card_id
         JOIN users u ON u.id = bc.user_id
         WHERE sc.id = $1 AND sc.deleted_at IS NULL`,
        [contactId]
      )

      if (contactResult.rows.length === 0) {
        throw new Error('Contact not found')
      }

      const contact = contactResult.rows[0]

      // Use AI service to generate insights
      const insights = await aiService.generateNetworkInsights(
        userId,
        contactId,
        contact
      )

      // Update contact
      await client.query(
        `UPDATE saved_contacts 
         SET ai_insights_generated_at = CURRENT_TIMESTAMP,
             last_insight_update_at = CURRENT_TIMESTAMP
         WHERE id = $1`,
        [contactId]
      )

      return insights
    } catch (error: any) {
      logger.error('Network insights generation error:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Get network insights for a contact
   */
  async getInsights(contactId: string): Promise<any[]> {
    const client = await pool.connect()
    try {
      const result = await client.query(
        `SELECT * FROM network_insights 
         WHERE saved_contact_id = $1 AND is_active = true
         ORDER BY confidence_score DESC, created_at DESC`,
        [contactId]
      )
      return result.rows
    } finally {
      client.release()
    }
  }

  /**
   * Enable contact change monitoring
   */
  async enableMonitoring(
    userId: string,
    contactId: string,
    checkFrequency: string = 'weekly',
    changeTypes: string[] = ['job_change', 'company_change', 'promotion']
  ): Promise<void> {
    const client = await pool.connect()
    try {
      await client.query(
        `INSERT INTO contact_change_monitoring (id, user_id, saved_contact_id, monitoring_enabled, check_frequency, change_types, last_checked_at)
         VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
         ON CONFLICT DO NOTHING`,
        [
          uuidv4(),
          userId,
          contactId,
          true,
          checkFrequency,
          changeTypes
        ]
      )
    } finally {
      client.release()
    }
  }

  /**
   * Check for contact changes (background job)
   */
  async checkContactChanges(userId: string): Promise<any[]> {
    const client = await pool.connect()
    try {
      // Get all monitored contacts
      const monitoringResult = await client.query(
        `SELECT cm.*, sc.business_card_id, bc.slug, u.full_name
         FROM contact_change_monitoring cm
         JOIN saved_contacts sc ON sc.id = cm.saved_contact_id
         JOIN business_cards bc ON bc.id = sc.business_card_id
         JOIN users u ON u.id = bc.user_id
         WHERE cm.user_id = $1 
           AND cm.monitoring_enabled = true
           AND (cm.last_checked_at IS NULL 
                OR (cm.check_frequency = 'daily' AND cm.last_checked_at < NOW() - INTERVAL '1 day')
                OR (cm.check_frequency = 'weekly' AND cm.last_checked_at < NOW() - INTERVAL '7 days')
                OR (cm.check_frequency = 'monthly' AND cm.last_checked_at < NOW() - INTERVAL '30 days'))`,
        [userId]
      )

      const changes: any[] = []

      for (const monitor of monitoringResult.rows) {
        // Perform web search and AI analysis
        // This would integrate with web search APIs
        const detectedChanges = await this.detectChanges(monitor)

        for (const change of detectedChanges) {
          // Save detected change
          await client.query(
            `INSERT INTO contact_changes_detected (id, contact_change_monitoring_id, change_type, change_description, source, confidence_score)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              uuidv4(),
              monitor.id,
              change.type,
              change.description,
              change.source,
              change.confidence
            ]
          )

          changes.push({
            contactId: monitor.saved_contact_id,
            contactName: monitor.full_name,
            change
          })
        }

        // Update last checked time
        await client.query(
          `UPDATE contact_change_monitoring 
           SET last_checked_at = CURRENT_TIMESTAMP,
               last_change_detected_at = CASE WHEN $1 THEN CURRENT_TIMESTAMP ELSE last_change_detected_at END
           WHERE id = $2`,
          [detectedChanges.length > 0, monitor.id]
        )
      }

      return changes
    } finally {
      client.release()
    }
  }

  /**
   * Detect changes for a monitored contact
   */
  private async detectChanges(monitor: any): Promise<any[]> {
    // This would integrate with web search APIs and AI analysis
    // For now, return empty array
    // TODO: Implement web search integration
    return []
  }

  /**
   * Get contact tags
   */
  async getContactTags(contactId: string): Promise<any[]> {
    const client = await pool.connect()
    try {
      const result = await client.query(
        `SELECT * FROM contact_tags 
         WHERE saved_contact_id = $1
         ORDER BY created_by_ai DESC, confidence_score DESC NULLS LAST`,
        [contactId]
      )
      return result.rows
    } finally {
      client.release()
    }
  }
}

export const networkService = new NetworkService()

