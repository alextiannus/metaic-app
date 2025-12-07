/**
 * Figma Sync Utility
 * Syncs design tokens from Figma to the application
 */

import { figmaService, FigmaStyles } from './figma'
import { updateDesignTokens, convertFigmaToTokens } from './designTokens'

export interface FigmaConfig {
  apiToken: string
  fileKey: string
  nodeIds?: string[] // Optional: specific node IDs to sync
}

/**
 * Sync design tokens from Figma
 */
export async function syncFromFigma(config: FigmaConfig): Promise<void> {
  try {
    // Initialize Figma service
    figmaService.init(config.apiToken, config.fileKey)

    // Extract design tokens from Figma
    const figmaStyles = await figmaService.extractDesignTokens()

    // Convert Figma styles to design tokens
    const tokens = convertFigmaToTokens(figmaStyles)

    // Update design tokens
    updateDesignTokens(tokens)

    console.log('✅ Design tokens synced from Figma successfully')
  } catch (error) {
    console.error('❌ Failed to sync from Figma:', error)
    throw error
  }
}

/**
 * Get Figma file info (for debugging)
 */
export async function getFigmaFileInfo(config: FigmaConfig) {
  try {
    figmaService.init(config.apiToken, config.fileKey)
    const fileData = await figmaService.getFile()
    return {
      name: fileData.name,
      lastModified: fileData.lastModified,
      version: fileData.version,
      document: fileData.document
    }
  } catch (error) {
    console.error('Failed to get Figma file info:', error)
    throw error
  }
}

/**
 * Sync images from Figma
 */
export async function syncImagesFromFigma(
  config: FigmaConfig,
  nodeIds: string[],
  outputDir: string = '/static/figma'
): Promise<Record<string, string>> {
  try {
    figmaService.init(config.apiToken, config.fileKey)
    const imageData = await figmaService.getImages(nodeIds, 'png', 2)
    
    // In a real implementation, you would download and save these images
    // For now, we return the URLs
    return imageData.images || {}
  } catch (error) {
    console.error('Failed to sync images from Figma:', error)
    throw error
  }
}

