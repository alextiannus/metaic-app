/**
 * Figma Code Extractor
 * Extracts code snippets and component code from Figma prototypes
 */

import { figmaService } from './figma'

export interface FigmaCodeSnippet {
  nodeId: string
  nodeName: string
  code: string
  language: 'vue' | 'html' | 'css' | 'scss' | 'typescript' | 'javascript' | 'json'
  type: 'component' | 'style' | 'script' | 'template' | 'config'
}

export interface ExtractedCode {
  components: FigmaCodeSnippet[]
  styles: FigmaCodeSnippet[]
  scripts: FigmaCodeSnippet[]
  templates: FigmaCodeSnippet[]
  config: FigmaCodeSnippet[]
}

class FigmaCodeExtractor {
  /**
   * Extract code from Figma file
   * Looks for code in:
   * - Component descriptions
   * - Frame descriptions
   * - Comments
   * - Code snippets in text layers
   */
  async extractCode(fileData: any): Promise<ExtractedCode> {
    const extracted: ExtractedCode = {
      components: [],
      styles: [],
      scripts: [],
      templates: [],
      config: []
    }

    // Traverse the document tree
    this.traverseNodes(fileData.document, extracted)

    return extracted
  }

  /**
   * Traverse Figma nodes to extract code
   */
  private traverseNodes(node: any, extracted: ExtractedCode) {
    if (!node) return

    // Check for code in description
    if (node.description) {
      const codeSnippet = this.parseDescriptionForCode(node)
      if (codeSnippet) {
        this.categorizeCode(codeSnippet, extracted)
      }
    }

    // Check for code in comments (if available in API response)
    if (node.comments) {
      node.comments.forEach((comment: any) => {
        const codeSnippet = this.parseCommentForCode(comment, node.id, node.name)
        if (codeSnippet) {
          this.categorizeCode(codeSnippet, extracted)
        }
      })
    }

    // Check for code in text layers (code snippets)
    if (node.type === 'TEXT' && node.characters) {
      const codeSnippet = this.parseTextForCode(node)
      if (codeSnippet) {
        this.categorizeCode(codeSnippet, extracted)
      }
    }

    // Check for code in component properties
    if (node.componentPropertyDefinitions) {
      Object.entries(node.componentPropertyDefinitions).forEach(([key, prop]: [string, any]) => {
        if (prop.defaultValue && typeof prop.defaultValue === 'string') {
          const codeSnippet = this.parsePropertyForCode(prop.defaultValue, node.id, node.name, key)
          if (codeSnippet) {
            this.categorizeCode(codeSnippet, extracted)
          }
        }
      })
    }

    // Recursively traverse children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child: any) => this.traverseNodes(child, extracted))
    }
  }

  /**
   * Parse description for code blocks
   */
  private parseDescriptionForCode(node: any): FigmaCodeSnippet | null {
    if (!node.description) return null

    const description = node.description.trim()

    // Look for code blocks (```language ... ```)
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g
    const matches = [...description.matchAll(codeBlockRegex)]

    if (matches.length > 0) {
      const match = matches[0]
      const language = this.detectLanguage(match[1] || '', node.name)
      const code = match[2].trim()

      return {
        nodeId: node.id,
        nodeName: node.name,
        code,
        language,
        type: this.detectType(language, node.name)
      }
    }

    // Look for inline code or code-like content
    if (description.includes('<') || description.includes('{') || description.includes('export')) {
      const language = this.detectLanguage('', node.name)
      return {
        nodeId: node.id,
        nodeName: node.name,
        code: description,
        language,
        type: this.detectType(language, node.name)
      }
    }

    return null
  }

  /**
   * Parse comment for code
   */
  private parseCommentForCode(comment: any, nodeId: string, nodeName: string): FigmaCodeSnippet | null {
    if (!comment.message) return null

    const message = comment.message.trim()
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g
    const matches = [...message.matchAll(codeBlockRegex)]

    if (matches.length > 0) {
      const match = matches[0]
      const language = this.detectLanguage(match[1] || '', nodeName)
      const code = match[2].trim()

      return {
        nodeId,
        nodeName,
        code,
        language,
        type: this.detectType(language, nodeName)
      }
    }

    return null
  }

  /**
   * Parse text node for code
   */
  private parseTextForCode(node: any): FigmaCodeSnippet | null {
    if (!node.characters) return null

    const text = node.characters.trim()

    // Check if text looks like code
    if (text.includes('<template>') || text.includes('<script') || text.includes('export') || text.includes('function')) {
      const language = this.detectLanguage('', node.name)
      return {
        nodeId: node.id,
        nodeName: node.name,
        code: text,
        language,
        type: this.detectType(language, node.name)
      }
    }

    return null
  }

  /**
   * Parse component property for code
   */
  private parsePropertyForCode(value: string, nodeId: string, nodeName: string, propKey: string): FigmaCodeSnippet | null {
    if (!value || typeof value !== 'string') return null

    const trimmed = value.trim()
    if (trimmed.includes('<') || trimmed.includes('{') || trimmed.includes('export')) {
      const language = this.detectLanguage('', nodeName)
      return {
        nodeId,
        nodeName: `${nodeName}.${propKey}`,
        code: trimmed,
        language,
        type: this.detectType(language, nodeName)
      }
    }

    return null
  }

  /**
   * Detect code language
   */
  private detectLanguage(hint: string, nodeName: string): FigmaCodeSnippet['language'] {
    const lowerHint = hint.toLowerCase()
    const lowerName = nodeName.toLowerCase()

    if (lowerHint.includes('vue') || lowerName.includes('vue') || lowerName.includes('component')) {
      return 'vue'
    }
    if (lowerHint.includes('html') || lowerName.includes('html') || lowerName.includes('template')) {
      return 'html'
    }
    if (lowerHint.includes('scss') || lowerHint.includes('sass') || lowerName.includes('style')) {
      return 'scss'
    }
    if (lowerHint.includes('css')) {
      return 'css'
    }
    if (lowerHint.includes('ts') || lowerHint.includes('typescript')) {
      return 'typescript'
    }
    if (lowerHint.includes('js') || lowerHint.includes('javascript')) {
      return 'javascript'
    }
    if (lowerHint.includes('json')) {
      return 'json'
    }

    // Default based on content
    return 'vue'
  }

  /**
   * Detect code type
   */
  private detectType(language: string, nodeName: string): FigmaCodeSnippet['type'] {
    const lowerName = nodeName.toLowerCase()

    if (lowerName.includes('component') || lowerName.includes('vue')) {
      return 'component'
    }
    if (lowerName.includes('style') || lowerName.includes('css') || lowerName.includes('scss')) {
      return 'style'
    }
    if (lowerName.includes('script') || lowerName.includes('ts') || lowerName.includes('js')) {
      return 'script'
    }
    if (lowerName.includes('template') || lowerName.includes('html')) {
      return 'template'
    }
    if (lowerName.includes('config') || lowerName.includes('json')) {
      return 'config'
    }

    return 'component'
  }

  /**
   * Categorize code snippet
   */
  private categorizeCode(snippet: FigmaCodeSnippet, extracted: ExtractedCode) {
    switch (snippet.type) {
      case 'component':
        extracted.components.push(snippet)
        break
      case 'style':
        extracted.styles.push(snippet)
        break
      case 'script':
        extracted.scripts.push(snippet)
        break
      case 'template':
        extracted.templates.push(snippet)
        break
      case 'config':
        extracted.config.push(snippet)
        break
    }
  }

  /**
   * Extract and apply code from Figma
   */
  async extractAndApply(fileKey: string, apiToken: string): Promise<ExtractedCode> {
    // Initialize service
    figmaService.init(apiToken, fileKey)

    // Get file data
    const fileData = await figmaService.getFile()

    // Extract code
    const extracted = await this.extractCode(fileData)

    return extracted
  }
}

export const figmaCodeExtractor = new FigmaCodeExtractor()

