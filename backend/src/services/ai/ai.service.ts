/**
 * AI Service - Gemini Integration
 * Handles all AI-powered features using Google Gemini
 */

import { GoogleGenerativeAI } from '@google/generative-ai'
import { pool } from '../../config/database'
import logger from '../../config/logger'
import { v4 as uuidv4 } from 'uuid'

export class AIService {
  private genAI: GoogleGenerativeAI | null = null
  private model: any = null

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY
    if (apiKey) {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey)
        // Use gemini-1.5-pro or gemini-pro based on availability
        this.model = this.genAI.getGenerativeModel({ 
          model: process.env.GEMINI_MODEL || 'gemini-1.5-pro' 
        })
        logger.info('✅ Gemini AI initialized')
      } catch (error: any) {
        logger.error('Failed to initialize Gemini AI:', error)
      }
    } else {
      logger.warn('⚠️ Gemini API key not configured - AI features will be limited')
    }
  }

  /**
   * Generate profile from business card image
   */
  async generateProfileFromCardImage(
    userId: string,
    cardId: string,
    imageBase64: string,
    imageMimeType: string
  ): Promise<any> {
    if (!this.model) {
      throw new Error('AI service not configured')
    }

    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      // Log AI request
      const requestId = uuidv4()
      await client.query(
        `INSERT INTO ai_requests (id, user_id, request_type, request_status, metadata)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          requestId,
          userId,
          'profile_generation',
          'processing',
          JSON.stringify({ card_id: cardId, input_type: 'business_card_image' })
        ]
      )

      // Use Gemini Vision API for image analysis
      const visionModel = this.genAI!.getGenerativeModel({ 
        model: process.env.GEMINI_VISION_MODEL || 'gemini-1.5-pro' 
      })
      
      const prompt = `Analyze this business card image and extract all information. 
      Return a JSON object with the following structure:
      {
        "personal": {
          "fullName": "extracted name",
          "title": "job title",
          "tagline": "tagline if present",
          "chineseName": "Chinese name if present"
        },
        "contact": {
          "phones": [{"number": "phone number", "label": "type"}],
          "emails": [{"email": "email", "label": "type"}],
          "addresses": [{"street": "address", "city": "city", "country": "country"}]
        },
        "businesses": [{
          "name": "company name",
          "role": "position",
          "description": "company description"
        }],
        "social": {
          "linkedin": "url if present",
          "website": "url if present"
        }
      }`

      const imagePart = {
        inlineData: {
          data: imageBase64,
          mimeType: imageMimeType
        }
      }

      const result = await visionModel.generateContent([prompt, imagePart])
      const response = await result.response
      const text = response.text()
      
      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const profileData = jsonMatch ? JSON.parse(jsonMatch[0]) : {}

      // Enrich with web search if needed
      const enrichedData = await this.enrichProfileWithWebSearch(profileData)

      // Calculate tokens used (approximate)
      const tokensUsed = Math.ceil(text.length / 4) // Rough estimate

      // Update AI request
      await client.query(
        `UPDATE ai_requests 
         SET request_status = 'completed', tokens_used = $1, metadata = jsonb_set(metadata, '{result}', $2::jsonb)
         WHERE id = $3`,
        [tokensUsed, JSON.stringify(enrichedData), requestId]
      )

      // Save generation history
      await client.query(
        `INSERT INTO ai_profile_generations (id, user_id, business_card_id, input_type, input_data, generated_content, tokens_used)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          uuidv4(),
          userId,
          cardId,
          'business_card_image',
          JSON.stringify({ image_processed: true }),
          JSON.stringify(enrichedData),
          tokensUsed
        ]
      )

      await client.query('COMMIT')

      // Deduct tokens
      await this.deductTokens(userId, tokensUsed, 'ai_request', requestId)

      return enrichedData
    } catch (error: any) {
      await client.query('ROLLBACK')
      logger.error('AI profile generation error:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Generate profile from resume/CV
   */
  async generateProfileFromResume(
    userId: string,
    cardId: string,
    resumeText: string
  ): Promise<any> {
    if (!this.model) {
      throw new Error('AI service not configured')
    }

    const prompt = `Analyze this resume and create a comprehensive professional profile.
    Extract all relevant information and create a JSON object with:
    - Personal information (name, title, bio)
    - Work experience (businesses, roles, descriptions)
    - Education
    - Skills and expertise
    - Contact information if present
    - Professional summary
    
    Return as JSON matching the business card structure.`

    const result = await this.model.generateContent(prompt + '\n\nResume:\n' + resumeText)
    const response = await result.response
    const text = response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const profileData = jsonMatch ? JSON.parse(jsonMatch[0]) : {}

    // Enrich with web search
    const enrichedData = await this.enrichProfileWithWebSearch(profileData)

    return enrichedData
  }

  /**
   * Enrich profile with web search
   */
  private async enrichProfileWithWebSearch(profileData: any): Promise<any> {
    // This would integrate with a web search API
    // For now, return the data as-is
    // TODO: Integrate with web search API (Google Custom Search, Bing, etc.)
    return profileData
  }

  /**
   * Generate network insights for a contact
   */
  async generateNetworkInsights(
    userId: string,
    contactId: string,
    contactData: any
  ): Promise<any[]> {
    if (!this.model) {
      throw new Error('AI service not configured')
    }

    const client = await pool.connect()
    try {
      // Get user's profile for comparison
      const userResult = await client.query(
        `SELECT bc.*, u.full_name, u.email 
         FROM business_cards bc
         JOIN users u ON u.id = bc.user_id
         WHERE bc.user_id = $1 AND bc.deleted_at IS NULL
         LIMIT 1`,
        [userId]
      )

      const userProfile = userResult.rows[0]

      // Search MetaIC database for common connections
      const commonConnections = await this.findCommonConnections(userId, contactData)

      // Generate insights using AI
      const prompt = `Analyze these two professional profiles and generate network insights.
      
      User Profile:
      ${JSON.stringify(userProfile, null, 2)}
      
      Contact Profile:
      ${JSON.stringify(contactData, null, 2)}
      
      Common Connections: ${commonConnections.length}
      
      Generate insights in JSON array format:
      [
        {
          "type": "common_connection" | "business_opportunity" | "shared_interest" | "conversation_topic",
          "content": "detailed insight",
          "confidence": 0.0-1.0
        }
      ]
      
      Focus on:
      - Common connections and mutual contacts
      - Business collaboration opportunities
      - Shared interests and hobbies
      - Conversation starters and topics
      - Industry connections
      - Potential partnerships`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const jsonMatch = text.match(/\[[\s\S]*\]/)
      const insights = jsonMatch ? JSON.parse(jsonMatch[0]) : []

      // Save insights to database
      for (const insight of insights) {
        await client.query(
          `INSERT INTO network_insights (id, saved_contact_id, insight_type, insight_content, confidence_score, source)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            uuidv4(),
            contactId,
            insight.type,
            insight.content,
            insight.confidence || 0.8,
            'ai_analysis'
          ]
        )
      }

      // Auto-generate tags
      await this.generateContactTags(contactId, insights, contactData)

      const tokensUsed = Math.ceil(text.length / 4)
      await this.deductTokens(userId, tokensUsed, 'ai_request', null)

      return insights
    } catch (error: any) {
      logger.error('Network insights generation error:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Generate contact tags
   */
  private async generateContactTags(
    contactId: string,
    insights: any[],
    contactData: any
  ): Promise<void> {
    const client = await pool.connect()
    try {
      const tags = new Set<string>()

      // Extract tags from insights
      insights.forEach(insight => {
        if (insight.type === 'shared_interest') {
          tags.add(insight.content.toLowerCase())
        }
      })

      // Extract from contact data
      if (contactData.businesses) {
        contactData.businesses.forEach((b: any) => {
          if (b.industry) tags.add(b.industry.toLowerCase())
        })
      }

      // Save tags
      for (const tag of tags) {
        await client.query(
          `INSERT INTO contact_tags (id, saved_contact_id, tag_name, tag_category, created_by_ai, confidence_score)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT DO NOTHING`,
          [
            uuidv4(),
            contactId,
            tag,
            'ai_generated',
            true,
            0.8
          ]
        )
      }
    } finally {
      client.release()
    }
  }

  /**
   * Find common connections
   */
  private async findCommonConnections(userId: string, contactData: any): Promise<any[]> {
    const client = await pool.connect()
    try {
      // Find contacts that both users have
      const result = await client.query(
        `SELECT DISTINCT sc2.business_card_id, bc.slug, u.full_name
         FROM saved_contacts sc1
         JOIN saved_contacts sc2 ON sc1.business_card_id = sc2.business_card_id
         JOIN business_cards bc ON bc.id = sc2.business_card_id
         JOIN users u ON u.id = bc.user_id
         WHERE sc1.user_id = $1
           AND sc2.user_id != $1
           AND sc1.deleted_at IS NULL
           AND sc2.deleted_at IS NULL
         LIMIT 10`,
        [userId]
      )
      return result.rows
    } finally {
      client.release()
    }
  }

  /**
   * Generate communication plan
   */
  async generateCommunicationPlan(
    userId: string,
    contactId: string,
    planType: string,
    context?: any
  ): Promise<any> {
    if (!this.model) {
      throw new Error('AI service not configured')
    }

    const client = await pool.connect()
    try {
      // Get contact and user information
      const contactResult = await client.query(
        `SELECT sc.*, bc.*, u.full_name as contact_name
         FROM saved_contacts sc
         JOIN business_cards bc ON bc.id = sc.business_card_id
         JOIN users u ON u.id = bc.user_id
         WHERE sc.id = $1`,
        [contactId]
      )

      const contact = contactResult.rows[0]

      const prompt = `Generate a ${planType} message for this contact:
      
      Contact: ${contact.contact_name}
      Meeting Context: ${contact.remark_text || 'N/A'}
      Meeting Location: ${contact.remark_location || 'N/A'}
      
      Generate a personalized, professional message. Return JSON:
      {
        "message": "the message text",
        "suggested_date": "YYYY-MM-DD",
        "channel": "whatsapp" | "email" | "sms"
      }`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const planData = jsonMatch ? JSON.parse(jsonMatch[0]) : {}

      // Save communication plan
      const planId = uuidv4()
      await client.query(
        `INSERT INTO communication_plans (id, user_id, saved_contact_id, plan_type, message_template, channel, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          planId,
          userId,
          contactId,
          planType,
          planData.message,
          planData.channel || 'whatsapp',
          'pending'
        ]
      )

      const tokensUsed = Math.ceil(text.length / 4)
      await this.deductTokens(userId, tokensUsed, 'ai_request', null)

      return { id: planId, ...planData }
    } catch (error: any) {
      logger.error('Communication plan generation error:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Chatbot response for public profile
   */
  async generateChatbotResponse(
    cardId: string,
    sessionId: string,
    userMessage: string,
    conversationHistory: any[] = []
  ): Promise<string> {
    if (!this.model) {
      throw new Error('AI service not configured')
    }

    const client = await pool.connect()
    try {
      // Get card and user information
      const cardResult = await client.query(
        `SELECT bc.*, u.full_name, u.email
         FROM business_cards bc
         JOIN users u ON u.id = bc.user_id
         WHERE bc.id = $1 AND bc.deleted_at IS NULL`,
        [cardId]
      )

      const card = cardResult.rows[0]

      const systemPrompt = `You are MetaIC AI Assistant, helping visitors learn about ${card.full_name}.
      You can answer questions about their profile, assist with scheduling, and guide users to register for MetaIC AI.
      Be helpful, professional, and concise.`

      const historyText = conversationHistory
        .map((msg: any) => `${msg.type}: ${msg.content}`)
        .join('\n')

      const prompt = `${systemPrompt}\n\nProfile Information:\n${JSON.stringify(card, null, 2)}\n\nConversation History:\n${historyText}\n\nUser: ${userMessage}\n\nAssistant:`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Save conversation
      await client.query(
        `INSERT INTO ai_conversations_public (id, business_card_id, session_id, message_type, message_content, tokens_used)
         VALUES ($1, $2, $3, $4, $5, $6), ($7, $8, $9, $10, $11, $12)`,
        [
          uuidv4(), cardId, sessionId, 'user', userMessage, 0,
          uuidv4(), cardId, sessionId, 'assistant', text, Math.ceil(text.length / 4)
        ]
      )

      return text
    } catch (error: any) {
      logger.error('Chatbot response error:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Deduct tokens from user balance
   */
  private async deductTokens(
    userId: string,
    amount: number,
    referenceType: string,
    referenceId: string | null
  ): Promise<void> {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      // Get current balance
      const balanceResult = await client.query(
        'SELECT token_balance FROM users WHERE id = $1',
        [userId]
      )

      const currentBalance = balanceResult.rows[0]?.token_balance || 0
      const newBalance = currentBalance - amount

      if (newBalance < 0) {
        throw new Error('Insufficient tokens')
      }

      // Create transaction
      await client.query(
        `INSERT INTO token_transactions (id, user_id, transaction_type, amount, balance_after, reference_type, reference_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          uuidv4(),
          userId,
          'spent',
          -amount,
          newBalance,
          referenceType,
          referenceId
        ]
      )

      // Update balance (trigger will handle this, but we can also do it explicitly)
      await client.query(
        'UPDATE users SET token_balance = $1 WHERE id = $2',
        [newBalance, userId]
      )

      await client.query('COMMIT')
    } catch (error: any) {
      await client.query('ROLLBACK')
      logger.error('Token deduction error:', error)
      throw error
    } finally {
      client.release()
    }
  }
}

export const aiService = new AIService()

