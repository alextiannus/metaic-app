/**
 * Figma API Service
 * Fetches design tokens and styles from Figma
 */

import axios from 'axios'

export interface FigmaToken {
  name: string
  value: string
  type: 'color' | 'spacing' | 'typography' | 'radius' | 'shadow'
}

export interface FigmaStyles {
  colors: Record<string, string>
  spacing: Record<string, string>
  typography: Record<string, any>
  radius: Record<string, string>
}

class FigmaService {
  private apiToken: string = ''
  private fileKey: string = ''
  private baseURL: string = 'https://api.figma.com/v1'

  /**
   * Initialize Figma service with API token and file key
   */
  init(apiToken: string, fileKey: string) {
    this.apiToken = apiToken
    this.fileKey = fileKey
  }

  /**
   * Get Figma file data
   */
  async getFile() {
    if (!this.apiToken || !this.fileKey) {
      throw new Error('Figma API token and file key must be set')
    }

    try {
      const response = await axios.get(`${this.baseURL}/files/${this.fileKey}`, {
        headers: {
          'X-Figma-Token': this.apiToken
        }
      })
      return response.data
    } catch (error: any) {
      console.error('Error fetching Figma file:', error)
      throw new Error(`Failed to fetch Figma file: ${error.message}`)
    }
  }

  /**
   * Extract design tokens from Figma file
   * Looks for variables, styles, and component properties
   */
  async extractDesignTokens(): Promise<FigmaStyles> {
    const fileData = await this.getFile()
    const tokens: FigmaStyles = {
      colors: {},
      spacing: {},
      typography: {},
      radius: {}
    }

    // Extract variables (Figma Variables API)
    if (fileData.styles) {
      // Extract color styles
      Object.values(fileData.styles).forEach((style: any) => {
        if (style.styleType === 'FILL' && style.name) {
          const colorName = this.sanitizeName(style.name)
          tokens.colors[colorName] = this.figmaColorToHex(style)
        }
      })
    }

    // Extract from document structure
    this.traverseNodes(fileData.document, tokens)

    return tokens
  }

  /**
   * Traverse Figma nodes to extract design tokens
   */
  private traverseNodes(node: any, tokens: FigmaStyles) {
    if (!node) return

    // Extract color fills
    if (node.fills && Array.isArray(node.fills)) {
      node.fills.forEach((fill: any) => {
        if (fill.type === 'SOLID' && node.name) {
          const colorName = this.sanitizeName(node.name)
          if (!tokens.colors[colorName]) {
            tokens.colors[colorName] = this.rgbaToHex(fill.color, fill.opacity || 1)
          }
        }
      })
    }

    // Extract spacing (from frame padding, gaps, etc.)
    if (node.paddingLeft && node.name?.toLowerCase().includes('spacing')) {
      const spacingName = this.sanitizeName(node.name)
      tokens.spacing[spacingName] = `${node.paddingLeft}px`
    }

    // Extract border radius
    if (node.cornerRadius && node.name?.toLowerCase().includes('radius')) {
      const radiusName = this.sanitizeName(node.name)
      tokens.radius[radiusName] = `${node.cornerRadius}px`
    }

    // Recursively traverse children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child: any) => this.traverseNodes(child, tokens))
    }
  }

  /**
   * Convert Figma color to hex
   */
  private figmaColorToHex(style: any): string {
    // This would need to fetch the actual style value
    // For now, return a placeholder
    return '#000000'
  }

  /**
   * Convert RGBA to hex
   */
  private rgbaToHex(color: { r: number; g: number; b: number }, opacity: number = 1): string {
    const r = Math.round(color.r * 255)
    const g = Math.round(color.g * 255)
    const b = Math.round(color.b * 255)
    
    if (opacity < 1) {
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    }
    
    return `#${[r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')}`
  }

  /**
   * Sanitize name for use as CSS variable
   */
  private sanitizeName(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }

  /**
   * Get specific node by name or ID
   */
  async getNode(nodeId: string) {
    if (!this.apiToken || !this.fileKey) {
      throw new Error('Figma API token and file key must be set')
    }

    try {
      const response = await axios.get(
        `${this.baseURL}/files/${this.fileKey}/nodes?ids=${nodeId}`,
        {
          headers: {
            'X-Figma-Token': this.apiToken
          }
        }
      )
      return response.data
    } catch (error: any) {
      console.error('Error fetching Figma node:', error)
      throw new Error(`Failed to fetch Figma node: ${error.message}`)
    }
  }

  /**
   * Get images from Figma
   */
  async getImages(nodeIds: string[], format: 'png' | 'jpg' | 'svg' = 'png', scale: number = 2) {
    if (!this.apiToken || !this.fileKey) {
      throw new Error('Figma API token and file key must be set')
    }

    try {
      const response = await axios.get(
        `${this.baseURL}/images/${this.fileKey}`,
        {
          params: {
            ids: nodeIds.join(','),
            format,
            scale
          },
          headers: {
            'X-Figma-Token': this.apiToken
          }
        }
      )
      return response.data
    } catch (error: any) {
      console.error('Error fetching Figma images:', error)
      throw new Error(`Failed to fetch Figma images: ${error.message}`)
    }
  }
}

export const figmaService = new FigmaService()

