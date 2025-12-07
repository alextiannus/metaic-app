/**
 * Vue Composable for API Client
 */

import { ref } from 'vue'
import { apiClient } from '../utils/api'
import type { ApiResponse } from '../utils/api'

export function useApi() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Execute API call with loading and error handling
   */
  const execute = async <T = any>(
    apiCall: () => Promise<ApiResponse<T>>
  ): Promise<T | null> => {
    // Don't set loading state - we don't want to block UI
    error.value = null

    try {
      // Add timeout wrapper
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 4000)
      )
      
      const response = await Promise.race([
        apiCall(),
        timeoutPromise
      ]) as ApiResponse<T>
      
      if (response.success && response.data) {
        return response.data as T
      } else {
        error.value = response.error?.message || 'An error occurred'
        return null
      }
    } catch (err: any) {
      // Handle timeout and connection errors gracefully - don't throw
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout') || err.message === 'Request timeout') {
        error.value = 'Request timeout - using default data'
        console.warn('⏱️ API timeout, using default data')
      } else if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error') || err.code === 'ERR_NETWORK') {
        error.value = 'Cannot connect to server - using default data'
        console.warn('🔌 API connection refused, using default data')
      } else {
        error.value = err.response?.data?.error?.message || err.message || 'Network error'
        console.warn('⚠️ API error:', err.message || err)
      }
      // Don't log full error to avoid noise
      return null
    }
  }

  return {
    isLoading,
    error,
    execute,
    apiClient
  }
}

