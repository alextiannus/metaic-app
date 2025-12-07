/**
 * Figma Code Loader
 * Loads and applies code from Figma prototypes
 */

import { figmaCodeExtractor, ExtractedCode, FigmaCodeSnippet } from './figmaCodeExtractor'
import { figmaService } from './figma'

export interface LoadedCode {
  components: Map<string, string> // component name -> code
  styles: Map<string, string> // style name -> code
  scripts: Map<string, string> // script name -> code
  templates: Map<string, string> // template name -> code
  config: Map<string, any> // config name -> parsed object
}

class FigmaCodeLoader {
  /**
   * Load code from Figma file
   */
  async loadFromFigma(fileKey: string, apiToken: string): Promise<LoadedCode> {
    const extracted = await figmaCodeExtractor.extractAndApply(fileKey, apiToken)
    return this.organizeCode(extracted)
  }

  /**
   * Organize extracted code into maps
   */
  private organizeCode(extracted: ExtractedCode): LoadedCode {
    const loaded: LoadedCode = {
      components: new Map(),
      styles: new Map(),
      scripts: new Map(),
      templates: new Map(),
      config: new Map()
    }

    // Organize components
    extracted.components.forEach(snippet => {
      const key = this.generateKey(snippet.nodeName)
      loaded.components.set(key, snippet.code)
    })

    // Organize styles
    extracted.styles.forEach(snippet => {
      const key = this.generateKey(snippet.nodeName)
      loaded.styles.set(key, snippet.code)
    })

    // Organize scripts
    extracted.scripts.forEach(snippet => {
      const key = this.generateKey(snippet.nodeName)
      loaded.scripts.set(key, snippet.code)
    })

    // Organize templates
    extracted.templates.forEach(snippet => {
      const key = this.generateKey(snippet.nodeName)
      loaded.templates.set(key, snippet.code)
    })

    // Organize config (parse JSON)
    extracted.config.forEach(snippet => {
      const key = this.generateKey(snippet.nodeName)
      try {
        const parsed = JSON.parse(snippet.code)
        loaded.config.set(key, parsed)
      } catch {
        loaded.config.set(key, snippet.code)
      }
    })

    return loaded
  }

  /**
   * Generate a clean key from node name
   */
  private generateKey(nodeName: string): string {
    return nodeName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  /**
   * Get component code by name
   */
  getComponent(loaded: LoadedCode, name: string): string | undefined {
    const key = this.generateKey(name)
    return loaded.components.get(key)
  }

  /**
   * Get style code by name
   */
  getStyle(loaded: LoadedCode, name: string): string | undefined {
    const key = this.generateKey(name)
    return loaded.styles.get(key)
  }

  /**
   * Get script code by name
   */
  getScript(loaded: LoadedCode, name: string): string | undefined {
    const key = this.generateKey(name)
    return loaded.scripts.get(key)
  }

  /**
   * Get template code by name
   */
  getTemplate(loaded: LoadedCode, name: string): string | undefined {
    const key = this.generateKey(name)
    return loaded.templates.get(key)
  }

  /**
   * Get config by name
   */
  getConfig(loaded: LoadedCode, name: string): any {
    const key = this.generateKey(name)
    return loaded.config.get(key)
  }

  /**
   * List all available components
   */
  listComponents(loaded: LoadedCode): string[] {
    return Array.from(loaded.components.keys())
  }

  /**
   * List all available styles
   */
  listStyles(loaded: LoadedCode): string[] {
    return Array.from(loaded.styles.keys())
  }
}

export const figmaCodeLoader = new FigmaCodeLoader()

