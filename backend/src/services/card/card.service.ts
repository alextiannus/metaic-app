/**
 * Business Card Service
 */

import { pool } from '../../config/database'
import { BusinessCard } from '../../shared/types'
import logger from '../../config/logger'
import { v4 as uuidv4 } from 'uuid'

export class CardService {
  /**
   * Get card by slug (public) with all related data
   */
  async getCardBySlug(slug: string): Promise<any | null> {
    const client = await pool.connect()
    
    try {
      // Get card
      const cardResult = await client.query(
        `SELECT * FROM business_cards 
         WHERE slug = $1 AND is_public = true AND deleted_at IS NULL`,
        [slug]
      )

      if (cardResult.rows.length === 0) {
        return null
      }

      const card = cardResult.rows[0]

      // Get user info
      const userResult = await client.query(
        'SELECT id, full_name, first_name, last_name, chinese_name, avatar_url FROM users WHERE id = $1',
        [card.user_id]
      )
      const user = userResult.rows[0]

      // Get businesses
      const businessesResult = await client.query(
        `SELECT b.*, 
         (SELECT json_agg(json_build_object('service_name', bs.service_name, 'service_name_zh', bs.service_name_zh))
          FROM business_services bs WHERE bs.business_id = b.id) as services
         FROM businesses b 
         WHERE b.business_card_id = $1 AND b.is_active = true 
         ORDER BY b.display_order`,
        [card.id]
      )

      // Get contact information
      const contactsResult = await client.query(
        'SELECT * FROM contact_information WHERE business_card_id = $1 ORDER BY display_order',
        [card.id]
      )

      // Get social links
      const linksResult = await client.query(
        'SELECT platform, url FROM social_links WHERE business_card_id = $1 ORDER BY display_order',
        [card.id]
      )

      // Get works and services
      const worksResult = await client.query(
        'SELECT * FROM works_and_services WHERE business_card_id = $1 ORDER BY display_order',
        [card.id]
      )

      // Get personal interests
      const interestsResult = await client.query(
        'SELECT category, name FROM personal_interests WHERE business_card_id = $1 ORDER BY display_order',
        [card.id]
      )

      // Get networking preferences
      const networkingResult = await client.query(
        'SELECT category, name, name_zh FROM networking_preferences WHERE business_card_id = $1 ORDER BY display_order',
        [card.id]
      )

      // Transform data to match frontend structure
      const phones = contactsResult.rows.filter(c => c.type === 'phone')
      const emails = contactsResult.rows.filter(c => c.type === 'email')
      const addresses = contactsResult.rows.filter(c => c.type === 'address')

      const links: any = {}
      linksResult.rows.forEach((link: any) => {
        if (link.platform === 'linkedin') links.linkedin = link.url
        else if (link.platform === 'whatsapp') links.whatsapp = link.url
        else if (link.platform === 'metaic') links.metaicProfile = link.url
        else if (link.platform === 'website') {
          if (!links.website) links.website = []
          links.website.push(link.url)
        }
      })

      const hobbies = interestsResult.rows
        .filter(i => i.category === 'hobby')
        .map(i => i.name)

      const lookingFor = networkingResult.rows
        .filter(n => n.category === 'looking_for')
        .map(n => n.name)

      // Build businesses with services
      const businesses = businessesResult.rows.map((b: any) => ({
        id: b.id,
        name: b.name,
        chineseName: b.chinese_name,
        role: b.role,
        description: b.description,
        website: b.website,
        services: b.services || []
      }))

      return {
        id: card.id || '',
        slug: card.slug || '',
        personal: {
          fullName: user.full_name,
          firstName: user.first_name,
          lastName: user.last_name,
          chineseName: user.chinese_name,
          avatar: user.avatar_url,
          title: card.title,
          tagline: card.tagline,
          location: {
            city: 'Singapore',
            country: 'Singapore',
            timezone: 'Asia/Singapore'
          }
        },
        businesses,
        contact: {
          phones: phones.map(p => ({
            type: p.type,
            number: p.value,
            countryCode: p.country_code,
            label: p.label
          })),
          emails: emails.map(e => ({
            type: e.type,
            email: e.value,
            label: e.label
          })),
          addresses: addresses.map(a => ({
            type: a.type,
            street: a.street,
            city: a.city,
            postalCode: a.postal_code,
            country: a.country
          }))
        },
        links,
        professional: {
          headline: card.headline,
          bio: card.bio || []
        },
        personal_interests: {
          hobbies
        },
        networking: {
          lookingFor
        },
        ai: {
          enabled: true,
          summary: 'Alex Tian Ye is a visionary entrepreneur bridging the gap between AI technology and practical business applications.',
          conversationStarter: 'Ask me about AI implementation strategies, F&B technology solutions, or building platforms for multicultural communities!'
        }
      }
    } catch (error) {
      logger.error('Error getting card by slug:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Get card by ID
   */
  async getCardById(cardId: string, userId?: string): Promise<BusinessCard | null> {
    const client = await pool.connect()
    
    try {
      let query = 'SELECT * FROM business_cards WHERE id = $1 AND deleted_at IS NULL'
      const params: any[] = [cardId]

      if (userId) {
        query += ' AND user_id = $2'
        params.push(userId)
      }

      const result = await client.query(query, params)

      if (result.rows.length === 0) {
        return null
      }

      return result.rows[0] as BusinessCard
    } catch (error) {
      logger.error('Error getting card by ID:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Create a new business card
   */
  async createCard(userId: string, data: {
    slug: string
    title?: string
    tagline?: string
    headline?: string
    bio?: string[]
    is_public?: boolean
  }): Promise<BusinessCard> {
    const client = await pool.connect()
    
    try {
      await client.query('BEGIN')

      // Check if slug is available
      const slugCheck = await client.query(
        'SELECT id FROM business_cards WHERE slug = $1 AND deleted_at IS NULL',
        [data.slug]
      )

      if (slugCheck.rows.length > 0) {
        throw new Error('Slug already exists')
      }

      // Insert card
      const result = await client.query(
        `INSERT INTO business_cards (
          id, user_id, slug, title, tagline, headline, bio,
          theme, is_public, show_email, show_phone, allow_messages
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *`,
        [
          uuidv4(),
          userId,
          data.slug,
          data.title || null,
          data.tagline || null,
          data.headline || null,
          data.bio || null,
          'dark',
          data.is_public ?? true,
          true,
          true,
          true
        ]
      )

      await client.query('COMMIT')

      logger.info(`Card created: ${result.rows[0].id}`)

      return result.rows[0] as BusinessCard
    } catch (error: any) {
      await client.query('ROLLBACK')
      logger.error('Error creating card:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Update card
   */
  async updateCard(cardId: string, userId: string, data: Partial<BusinessCard>): Promise<BusinessCard> {
    const client = await pool.connect()
    
    try {
      await client.query('BEGIN')

      // Verify ownership
      const card = await this.getCardById(cardId, userId)
      if (!card) {
        throw new Error('Card not found')
      }

      // Build update query
      const updates: string[] = []
      const values: any[] = []
      let paramCount = 1

      if (data.title !== undefined) {
        updates.push(`title = $${paramCount++}`)
        values.push(data.title)
      }
      if (data.tagline !== undefined) {
        updates.push(`tagline = $${paramCount++}`)
        values.push(data.tagline)
      }
      if (data.headline !== undefined) {
        updates.push(`headline = $${paramCount++}`)
        values.push(data.headline)
      }
      if (data.bio !== undefined) {
        updates.push(`bio = $${paramCount++}`)
        values.push(data.bio)
      }
      if (data.is_public !== undefined) {
        updates.push(`is_public = $${paramCount++}`)
        values.push(data.is_public)
      }

      updates.push(`updated_at = CURRENT_TIMESTAMP`)
      values.push(cardId, userId)

      const result = await client.query(
        `UPDATE business_cards 
         SET ${updates.join(', ')}
         WHERE id = $${paramCount} AND user_id = $${paramCount + 1}
         RETURNING *`,
        values
      )

      await client.query('COMMIT')

      return result.rows[0] as BusinessCard
    } catch (error: any) {
      await client.query('ROLLBACK')
      logger.error('Error updating card:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Track card view
   */
  async trackView(cardId: string, viewerUserId?: string, viewType?: string): Promise<void> {
    const client = await pool.connect()
    
    try {
      // Increment view count
      await client.query(
        'UPDATE business_cards SET views_count = views_count + 1 WHERE id = $1',
        [cardId]
      )

      // Log view event
      await client.query(
        `INSERT INTO card_views (id, business_card_id, viewer_user_id, view_type)
         VALUES ($1, $2, $3, $4)`,
        [uuidv4(), cardId, viewerUserId || null, viewType || null]
      )
    } catch (error) {
      logger.error('Error tracking view:', error)
      // Don't throw - view tracking is not critical
    } finally {
      client.release()
    }
  }
}

export const cardService = new CardService()
