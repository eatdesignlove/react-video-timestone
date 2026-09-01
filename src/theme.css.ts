import { createGlobalTheme } from '@vanilla-extract/css';

/**
 * Shared design tokens for the demo site.
 * Restrained dark developer-tool palette: neutral greys, one green accent.
 */
export const vars = createGlobalTheme(':root', {
  color: {
    // Surfaces
    bg: '#0A0B0C',
    bgSubtle: '#0E0F11',
    surface: 'rgba(255, 255, 255, 0.03)',
    surfaceHover: 'rgba(255, 255, 255, 0.055)',
    scrim: 'rgba(9, 10, 11, 0.62)',

    // Lines
    border: 'rgba(255, 255, 255, 0.09)',
    borderStrong: 'rgba(255, 255, 255, 0.16)',

    // Type
    text: '#F2F4F5',
    textMuted: 'rgba(242, 244, 245, 0.66)',
    textFaint: 'rgba(242, 244, 245, 0.44)',

    // Accent
    accent: '#49E78B',
    accentText: '#06140C',
    accentHover: '#6BEDA1',
    accentSoft: 'rgba(73, 231, 139, 0.14)',
    accentBorder: 'rgba(73, 231, 139, 0.34)',
  },

  font: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
  },

  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '18px',
    pill: '999px',
  },

  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '24px',
    6: '32px',
    7: '48px',
    8: '64px',
    9: '96px',
  },

  size: {
    /** Minimum comfortable pointer target. */
    target: '44px',
    headerHeight: '60px',
    contentWidth: '1040px',
    wideWidth: '1200px',
  },

  shadow: {
    card: '0 1px 2px rgba(0, 0, 0, 0.4)',
    frame: '0 24px 64px rgba(0, 0, 0, 0.55)',
  },

  transition: {
    fast: '140ms cubic-bezier(0.23, 1, 0.32, 1)',
    base: '220ms cubic-bezier(0.23, 1, 0.32, 1)',
    easeOut: 'cubic-bezier(0.23, 1, 0.32, 1)',
    easeInOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
  },
});

/** Shared focus ring so every interactive element behaves identically. */
export const focusRing = {
  outline: `2px solid ${vars.color.accent}`,
  outlineOffset: '2px',
} as const;
