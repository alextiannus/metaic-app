/**
 * Token Service
 * Manages user tokens, subscriptions, and rewards
 */

import { pool } from '../../config/database'
import logger from '../../config/logger'
import { v4 as uuidv4 } from 'uuid'

export class TokenService {
  /**
   * Get user token balance
   */
  async getTokenBalance(userId: string): Promise<number> {
    const client = await pool.connect()
    try {
      const result = await client.query(
        'SELECT token_balance FROM users WHERE id = $1',
        [userId]
      )
      return result.rows[0]?.token_balance || 0
    } finally {
      client.release()
    }
  }

  /**
   * Add tokens to user
   */
  async addTokens(
    userId: string,
    amount: number,
    transactionType: string,
    description?: string,
    referenceId?: string,
    referenceType?: string
  ): Promise<void> {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      const currentBalance = await this.getTokenBalance(userId)
      const newBalance = currentBalance + amount

      await client.query(
        `INSERT INTO token_transactions (id, user_id, transaction_type, amount, balance_after, description, reference_id, reference_type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          uuidv4(),
          userId,
          transactionType,
          amount,
          newBalance,
          description,
          referenceId,
          referenceType
        ]
      )

      await client.query(
        'UPDATE users SET token_balance = $1 WHERE id = $2',
        [newBalance, userId]
      )

      await client.query('COMMIT')
      logger.info(`Added ${amount} tokens to user ${userId}`)
    } catch (error: any) {
      await client.query('ROLLBACK')
      logger.error('Token addition error:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Award monthly free tokens
   */
  async awardMonthlyTokens(userId: string): Promise<void> {
    const client = await pool.connect()
    try {
      // Get user's subscription tier
      const userResult = await client.query(
        `SELECT u.subscription_tier, st.monthly_tokens, u.lions_club_id, lco.monthly_token_allocation
         FROM users u
         LEFT JOIN subscription_tiers st ON st.name = u.subscription_tier
         LEFT JOIN lions_club_organizations lco ON lco.lions_club_id = u.lions_club_id
         WHERE u.id = $1`,
        [userId]
      )

      const user = userResult.rows[0]
      let tokensToAward = user.monthly_tokens || 1000

      // Add Lions Club bonus if applicable
      if (user.lions_club_id && user.monthly_token_allocation) {
        tokensToAward += user.monthly_token_allocation
      }

      await this.addTokens(
        userId,
        tokensToAward,
        'earned',
        'Monthly free token allocation',
        null,
        'subscription'
      )
    } catch (error: any) {
      logger.error('Monthly token award error:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Process referral reward
   */
  async processReferral(referrerUserId: string, referredUserId: string, referralCode: string): Promise<void> {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      // Award tokens to referrer
      const referrerReward = 500 // Configurable
      await this.addTokens(
        referrerUserId,
        referrerReward,
        'referral',
        `Referral reward for ${referralCode}`,
        referredUserId,
        'referral'
      )

      // Award tokens to referred user
      const referredReward = 200
      await this.addTokens(
        referredUserId,
        referredReward,
        'referral',
        `Welcome bonus for using referral code ${referralCode}`,
        referrerUserId,
        'referral'
      )

      // Record referral
      await client.query(
        `INSERT INTO referrals (id, referrer_user_id, referred_user_id, referral_code, tokens_awarded_referrer, tokens_awarded_referred, status, completed_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)`,
        [
          uuidv4(),
          referrerUserId,
          referredUserId,
          referralCode,
          referrerReward,
          referredReward,
          'completed'
        ]
      )

      await client.query('COMMIT')
    } catch (error: any) {
      await client.query('ROLLBACK')
      logger.error('Referral processing error:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Process donation and award tokens
   */
  async processDonation(
    donorUserId: string | null,
    amount: number,
    paymentId: string,
    message?: string
  ): Promise<void> {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      // Calculate token reward (e.g., 100 tokens per $1)
      const tokensAwarded = Math.floor(amount * 100)

      // Record donation
      const donationId = uuidv4()
      await client.query(
        `INSERT INTO donations (id, donor_user_id, amount, payment_id, tokens_awarded, message, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          donationId,
          donorUserId,
          amount,
          paymentId,
          tokensAwarded,
          message,
          'completed'
        ]
      )

      // Award tokens if donor is registered
      if (donorUserId) {
        await this.addTokens(
          donorUserId,
          tokensAwarded,
          'donation',
          `Token reward for donation of $${amount}`,
          donationId,
          'donation'
        )
      }

      await client.query('COMMIT')
    } catch (error: any) {
      await client.query('ROLLBACK')
      logger.error('Donation processing error:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Get subscription tier
   */
  async getSubscriptionTier(userId: string): Promise<any> {
    const client = await pool.connect()
    try {
      const result = await client.query(
        `SELECT u.subscription_tier, st.*, us.status as subscription_status, us.current_period_end
         FROM users u
         LEFT JOIN subscription_tiers st ON st.name = u.subscription_tier
         LEFT JOIN user_subscriptions us ON us.user_id = u.id AND us.status = 'active'
         WHERE u.id = $1`,
        [userId]
      )
      return result.rows[0]
    } finally {
      client.release()
    }
  }

  /**
   * Upgrade subscription
   */
  async upgradeSubscription(userId: string, tierId: string): Promise<void> {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      const tierResult = await client.query(
        'SELECT * FROM subscription_tiers WHERE id = $1',
        [tierId]
      )
      const tier = tierResult.rows[0]

      // Update user subscription
      await client.query(
        'UPDATE users SET subscription_tier = $1 WHERE id = $2',
        [tier.name, userId]
      )

      // Award monthly tokens
      await this.addTokens(
        userId,
        tier.monthly_tokens,
        'earned',
        `Subscription upgrade to ${tier.display_name}`,
        tierId,
        'subscription'
      )

      await client.query('COMMIT')
    } catch (error: any) {
      await client.query('ROLLBACK')
      logger.error('Subscription upgrade error:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Verify Lions Club ID and award tokens
   */
  async verifyLionsClubId(userId: string, lionsClubId: string): Promise<boolean> {
    const client = await pool.connect()
    try {
      const result = await client.query(
        'SELECT * FROM lions_club_organizations WHERE lions_club_id = $1 AND is_active = true',
        [lionsClubId]
      )

      if (result.rows.length > 0) {
        const org = result.rows[0]

        // Update user
        await client.query(
          'UPDATE users SET lions_club_id = $1 WHERE id = $2',
          [lionsClubId, userId]
        )

        // Award bonus tokens
        await this.addTokens(
          userId,
          org.monthly_token_allocation,
          'lions_club',
          `Lions Club member bonus for ${org.organization_name}`,
          org.id,
          'lions_club'
        )

        return true
      }

      return false
    } catch (error: any) {
      logger.error('Lions Club verification error:', error)
      throw error
    } finally {
      client.release()
    }
  }
}

export const tokenService = new TokenService()

