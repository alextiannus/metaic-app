/**
 * Authentication Service
 */

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../../config/database'
import { User, JwtPayload } from '../../shared/types'
import logger from '../../config/logger'

export class AuthService {
  /**
   * Register a new user
   */
  async register(data: {
    email?: string
    phone?: string
    password?: string
    full_name: string
    first_name?: string
    last_name?: string
    auth_provider: string
    auth_provider_id?: string
  }): Promise<{ user: User; token: string; refresh_token: string }> {
    const client = await pool.connect()
    
    try {
      await client.query('BEGIN')

      // Check if user already exists
      if (data.email) {
        const emailCheck = await client.query(
          'SELECT id FROM users WHERE email = $1 AND deleted_at IS NULL',
          [data.email]
        )
        if (emailCheck.rows.length > 0) {
          throw new Error('User with this email already exists')
        }
      }

      if (data.phone) {
        const phoneCheck = await client.query(
          'SELECT id FROM users WHERE phone = $1 AND deleted_at IS NULL',
          [data.phone]
        )
        if (phoneCheck.rows.length > 0) {
          throw new Error('User with this phone already exists')
        }
      }

      // Hash password if provided
      let passwordHash = null
      if (data.password) {
        passwordHash = await bcrypt.hash(data.password, 10)
      }

      // Insert user
      const result = await client.query(
        `INSERT INTO users (
          email, phone, password_hash, auth_provider, auth_provider_id,
          full_name, first_name, last_name, timezone, language
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
        [
          data.email || null,
          data.phone || null,
          passwordHash,
          data.auth_provider,
          data.auth_provider_id || null,
          data.full_name,
          data.first_name || null,
          data.last_name || null,
          'UTC',
          'en'
        ]
      )

      const user = result.rows[0] as User

      // Generate tokens
      const token = this.generateToken(user)
      const refreshToken = this.generateRefreshToken(user)

      await client.query('COMMIT')

      logger.info(`User registered: ${user.id}`)

      return {
        user: {
          ...user,
          password_hash: undefined as any
        },
        token,
        refresh_token: refreshToken
      }
    } catch (error: any) {
      await client.query('ROLLBACK')
      logger.error('Registration error:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Login user
   */
  async login(credentials: {
    email?: string
    phone?: string
    password: string
  }): Promise<{ user: User; token: string; refresh_token: string }> {
    const client = await pool.connect()

    try {
      let query = 'SELECT * FROM users WHERE deleted_at IS NULL'
      const params: any[] = []

      if (credentials.email) {
        query += ' AND email = $1'
        params.push(credentials.email)
      } else if (credentials.phone) {
        query += ' AND phone = $1'
        params.push(credentials.phone)
      } else {
        throw new Error('Email or phone required')
      }

      const result = await client.query(query, params)

      if (result.rows.length === 0) {
        throw new Error('Invalid credentials')
      }

      const user = result.rows[0] as User

      // Verify password
      if (user.password_hash) {
        const isValid = await bcrypt.compare(credentials.password, user.password_hash)
        if (!isValid) {
          throw new Error('Invalid credentials')
        }
      }

      // Update last login
      await client.query(
        'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1',
        [user.id]
      )

      // Generate tokens
      const token = this.generateToken(user)
      const refreshToken = this.generateRefreshToken(user)

      logger.info(`User logged in: ${user.id}`)

      return {
        user: {
          ...user,
          password_hash: undefined as any
        },
        token,
        refresh_token: refreshToken
      }
    } catch (error: any) {
      logger.error('Login error:', error)
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Generate JWT token
   */
  private generateToken(user: User): string {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      phone: user.phone
    }

    return jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-secret-key',
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    )
  }

  /**
   * Generate refresh token
   */
  private generateRefreshToken(user: User): string {
    const payload: JwtPayload = {
      userId: user.id
    }

    return jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
      }
    )
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key'
      ) as JwtPayload

      const client = await pool.connect()
      const result = await client.query(
        'SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL',
        [decoded.userId]
      )
      client.release()

      if (result.rows.length === 0) {
        throw new Error('User not found')
      }

      const user = result.rows[0] as User
      const token = this.generateToken(user)

      return { token }
    } catch (error: any) {
      logger.error('Token refresh error:', error)
      throw new Error('Invalid refresh token')
    }
  }
}

export const authService = new AuthService()

