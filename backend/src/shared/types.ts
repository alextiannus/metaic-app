/**
 * Shared Types
 */

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
    has_next: boolean
    has_prev: boolean
  }
}

export interface User {
  id: string
  email?: string
  phone?: string
  full_name: string
  first_name?: string
  last_name?: string
  chinese_name?: string
  avatar_url?: string
  timezone: string
  language: string
  is_verified: boolean
  is_active: boolean
  is_premium: boolean
  created_at: Date
  updated_at: Date
}

export interface BusinessCard {
  id: string
  user_id: string
  slug: string
  title?: string
  title_zh?: string
  tagline?: string
  tagline_zh?: string
  headline?: string
  bio?: string[]
  theme: string
  is_public: boolean
  show_email: boolean
  show_phone: boolean
  allow_messages: boolean
  views_count: number
  shares_count: number
  saves_count: number
  created_at: Date
  updated_at: Date
}

export interface JwtPayload {
  userId: string
  email?: string
  phone?: string
  iat?: number
  exp?: number
}

