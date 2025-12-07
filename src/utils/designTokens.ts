/**
 * Design Tokens
 * Can be synced from Figma or manually maintained
 */

export interface DesignTokens {
  colors: {
    background: string
    textPrimary: string
    textSecondary: string
    accent: string
    action: string
    glassBg: string
    glassBorder: string
    stickyNote: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  typography: {
    fontSize: {
      sm: string
      base: string
      md: string
      lg: string
      xl: string
    }
    fontWeight: {
      normal: number
      medium: number
      semibold: number
      bold: number
    }
  }
  radius: {
    sm: string
    md: string
    lg: string
    xl: string
    full: string
  }
  effects: {
    glass: {
      background: string
      backdropFilter: string
      border: string
    }
    glow: {
      primary: string
    }
  }
}

// Default design tokens (Cyber Minimalist theme)
export const defaultTokens: DesignTokens = {
  colors: {
    background: '#0F172A',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    accent: '#6366F1',
    action: '#10B981',
    glassBg: 'rgba(255, 255, 255, 0.03)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',
    stickyNote: 'rgba(250, 204, 21, 0.1)'
  },
  spacing: {
    xs: '8rpx',
    sm: '16rpx',
    md: '32rpx',
    lg: '40rpx',
    xl: '60rpx'
  },
  typography: {
    fontSize: {
      sm: '24rpx',
      base: '28rpx',
      md: '30rpx',
      lg: '32rpx',
      xl: '48rpx'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  radius: {
    sm: '8rpx',
    md: '16rpx',
    lg: '20rpx',
    xl: '50rpx',
    full: '50%'
  },
  effects: {
    glass: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.08)'
    },
    glow: {
      primary: 'rgba(99, 102, 241, 0.5)'
    }
  }
}

// Current tokens (can be updated from Figma)
let currentTokens: DesignTokens = { ...defaultTokens }

/**
 * Get current design tokens
 */
export function getDesignTokens(): DesignTokens {
  return currentTokens
}

/**
 * Update design tokens (e.g., from Figma sync)
 */
export function updateDesignTokens(tokens: Partial<DesignTokens>) {
  currentTokens = {
    ...currentTokens,
    ...tokens,
    colors: { ...currentTokens.colors, ...tokens.colors },
    spacing: { ...currentTokens.spacing, ...tokens.spacing },
    typography: { ...currentTokens.typography, ...tokens.typography },
    radius: { ...currentTokens.radius, ...tokens.radius },
    effects: { ...currentTokens.effects, ...tokens.effects }
  }
}

/**
 * Convert Figma styles to design tokens
 */
export function convertFigmaToTokens(figmaStyles: any): Partial<DesignTokens> {
  const tokens: Partial<DesignTokens> = {}

  if (figmaStyles.colors) {
    tokens.colors = {
      background: figmaStyles.colors['background'] || figmaStyles.colors['bg'] || defaultTokens.colors.background,
      textPrimary: figmaStyles.colors['text-primary'] || figmaStyles.colors['text'] || defaultTokens.colors.textPrimary,
      textSecondary: figmaStyles.colors['text-secondary'] || defaultTokens.colors.textSecondary,
      accent: figmaStyles.colors['accent'] || figmaStyles.colors['primary'] || defaultTokens.colors.accent,
      action: figmaStyles.colors['action'] || figmaStyles.colors['success'] || defaultTokens.colors.action,
      glassBg: defaultTokens.colors.glassBg,
      glassBorder: defaultTokens.colors.glassBorder,
      stickyNote: defaultTokens.colors.stickyNote
    }
  }

  return tokens
}

