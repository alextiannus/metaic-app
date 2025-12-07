/**
 * API Client for MetaIC Backend
 */

import axios from 'axios'
import type { AxiosInstance, AxiosError } from 'axios'

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

class ApiClient {
  private client: AxiosInstance
  private baseURL: string

  constructor() {
    // Get API URL from environment or use default
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 5000, // Reduced timeout to 5 seconds
      headers: {
        'Content-Type': 'application/json',
      },
      // Add request timeout handling
      validateStatus: function (status) {
        return status < 500; // Don't throw on 4xx errors
      },
    })

    // Request interceptor - Add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = uni.getStorageSync('token') || localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor - Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiResponse>) => {
        if (error.response?.status === 401) {
          // Clear token and redirect to login
          uni.removeStorageSync('token')
          localStorage.removeItem('token')
          // Could redirect to login page here
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * Set authentication token
   */
  setToken(token: string) {
    uni.setStorageSync('token', token)
    localStorage.setItem('token', token)
  }

  /**
   * Clear authentication token
   */
  clearToken() {
    uni.removeStorageSync('token')
    localStorage.removeItem('token')
  }

  /**
   * Auth API
   */
  async register(data: {
    email?: string
    phone?: string
    password?: string
    full_name: string
    auth_provider: string
  }): Promise<ApiResponse> {
    const response = await this.client.post('/auth/register', data)
    if (response.data.success && response.data.data?.token) {
      this.setToken(response.data.data.token)
    }
    return response.data
  }

  async login(credentials: {
    email?: string
    phone?: string
    password: string
  }): Promise<ApiResponse> {
    const response = await this.client.post('/auth/login', credentials)
    if (response.data.success && response.data.data?.token) {
      this.setToken(response.data.data.token)
    }
    return response.data
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.client.post('/auth/logout')
    this.clearToken()
    return response.data
  }

  /**
   * Card API
   */
  async getCardBySlug(slug: string): Promise<ApiResponse> {
    try {
      const response = await this.client.get(`/cards/${slug}`)
      return response.data
    } catch (error: any) {
      // Return error response in expected format
      if (error.response) {
        return error.response.data
      }
      throw error
    }
  }

  async createCard(data: {
    slug: string
    title?: string
    tagline?: string
    headline?: string
    bio?: string[]
    is_public?: boolean
  }): Promise<ApiResponse> {
    const response = await this.client.post('/cards', data)
    return response.data
  }

  async updateCard(cardId: string, data: any): Promise<ApiResponse> {
    const response = await this.client.put(`/cards/${cardId}`, data)
    return response.data
  }
}

export const apiClient = new ApiClient()

