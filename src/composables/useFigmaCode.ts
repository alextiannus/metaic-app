/**
 * Vue Composable for Loading Code from Figma
 */

import { ref } from 'vue'
import { figmaCodeLoader, LoadedCode } from '../utils/figmaCodeLoader'

export function useFigmaCode() {
  const loadedCode = ref<LoadedCode | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Load code from Figma
   */
  const loadCode = async (fileKey: string, apiToken: string) => {
    isLoading.value = true
    error.value = null

    try {
      const code = await figmaCodeLoader.loadFromFigma(fileKey, apiToken)
      loadedCode.value = code
      return code
    } catch (err: any) {
      error.value = err.message || 'Failed to load code from Figma'
      console.error('Figma code load error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get component code
   */
  const getComponent = (name: string): string | undefined => {
    if (!loadedCode.value) return undefined
    return figmaCodeLoader.getComponent(loadedCode.value, name)
  }

  /**
   * Get style code
   */
  const getStyle = (name: string): string | undefined => {
    if (!loadedCode.value) return undefined
    return figmaCodeLoader.getStyle(loadedCode.value, name)
  }

  /**
   * Get script code
   */
  const getScript = (name: string): string | undefined => {
    if (!loadedCode.value) return undefined
    return figmaCodeLoader.getScript(loadedCode.value, name)
  }

  /**
   * Get template code
   */
  const getTemplate = (name: string): string | undefined => {
    if (!loadedCode.value) return undefined
    return figmaCodeLoader.getTemplate(loadedCode.value, name)
  }

  /**
   * Get config
   */
  const getConfig = (name: string): any => {
    if (!loadedCode.value) return undefined
    return figmaCodeLoader.getConfig(loadedCode.value, name)
  }

  /**
   * List available components
   */
  const listComponents = (): string[] => {
    if (!loadedCode.value) return []
    return figmaCodeLoader.listComponents(loadedCode.value)
  }

  /**
   * List available styles
   */
  const listStyles = (): string[] => {
    if (!loadedCode.value) return []
    return figmaCodeLoader.listStyles(loadedCode.value)
  }

  return {
    loadedCode,
    isLoading,
    error,
    loadCode,
    getComponent,
    getStyle,
    getScript,
    getTemplate,
    getConfig,
    listComponents,
    listStyles
  }
}

