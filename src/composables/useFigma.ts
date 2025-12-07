/**
 * Vue Composable for Figma Integration
 * Use this in your components to sync and use Figma design tokens
 */

import { ref, onMounted } from 'vue'
import { syncFromFigma, type FigmaConfig } from '../utils/figmaSync'
import { getDesignTokens, type DesignTokens } from '../utils/designTokens'

export function useFigma() {
  const tokens = ref<DesignTokens>(getDesignTokens())
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Sync tokens from Figma
   */
  const sync = async (config: FigmaConfig) => {
    isLoading.value = true
    error.value = null
    
    try {
      await syncFromFigma(config)
      tokens.value = getDesignTokens()
    } catch (err: any) {
      error.value = err.message || 'Failed to sync from Figma'
      console.error('Figma sync error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Auto-sync on mount if config is provided
   */
  const autoSync = (config?: FigmaConfig) => {
    if (config) {
      onMounted(() => {
        sync(config)
      })
    }
  }

  return {
    tokens,
    isLoading,
    error,
    sync,
    autoSync
  }
}

