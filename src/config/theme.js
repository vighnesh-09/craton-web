/**
 * Semantic color tokens for light / dark.
 * Components must use these (Tailwind color names or var(--token)), never raw hex.
 */
export const themes = {
  light: {
    id: 'light',
    label: 'Light',
    mode: 'light',
    vars: {
      '--ink': '#0f1c1a',
      '--ink-soft': '#1a2e2a',
      '--mist': '#e8f0ed',
      '--foam': '#f4faf7',
      '--lagoon': '#0d6e6e',
      '--lagoon-deep': '#085454',
      '--coral': '#e85d4c',
      '--sun': '#f0a202',
      '--craton': '#131513',
      '--copper': '#d8a075',
      '--hero-base': '#1c1c1c',
      '--hero-fg': '#f8f6ee',
      '--hero-muted': '#ced0c5',
      '--hero-soft': '#e6e5d9',
      '--hero-body': '#c3c6ba',
      '--hero-cta': '#f0eee7',
      '--hero-nav': '#d2d3ca',
      '--hero-veil': 'rgba(28, 28, 28, 0.4)',
      '--hero-veil-mid': 'rgba(28, 28, 28, 0.08)',
      '--hero-veil-edge': 'rgba(28, 28, 28, 0.25)',
      '--line': 'rgba(15, 28, 26, 0.1)',
      '--line-on-dark': 'rgba(248, 246, 238, 0.12)',
      '--highlight': 'rgba(255, 255, 255, 0.25)',
      '--signal-line': '#373f48',
      '--signal-pulse': '#ff9a45',
      '--cursor': '#ffffff',
    },
  },
  dark: {
    id: 'dark',
    label: 'Dark',
    mode: 'dark',
    vars: {
      /* Deep forest charcoal — executive MedTech, not pure black */
      '--foam': '#0B1110',
      '--mist': '#141B19',
      '--craton': '#070A09',
      /* Warm paper type for long-form readability */
      '--ink': '#EDEBE4',
      '--ink-soft': '#A8B5B0',
      /* Confident teal + brass — trust signals, not neon */
      '--lagoon': '#4AAFA6',
      '--lagoon-deep': '#3A948C',
      '--copper': '#C9A07A',
      '--sun': '#D4A84B',
      '--coral': '#D96B5C',
      /* Hero continuum — charcoal stage, ivory type */
      '--hero-base': '#121716',
      '--hero-fg': '#F3F1E9',
      '--hero-muted': '#A3A89F',
      '--hero-soft': '#D8D5CA',
      '--hero-body': '#9CA39A',
      '--hero-cta': '#EDEBE3',
      '--hero-nav': '#B5B8AF',
      '--hero-veil': 'rgba(7, 10, 9, 0.5)',
      '--hero-veil-mid': 'rgba(7, 10, 9, 0.12)',
      '--hero-veil-edge': 'rgba(7, 10, 9, 0.35)',
      '--line': 'rgba(237, 235, 228, 0.10)',
      '--line-on-dark': 'rgba(243, 241, 233, 0.14)',
      '--highlight': 'rgba(74, 175, 166, 0.14)',
      /* Funnel: quiet slate lines, warm amber pulse */
      '--signal-line': '#3A464E',
      '--signal-pulse': '#E09A55',
      '--cursor': '#F3F1E9',
    },
  },
}

export const defaultThemeId = 'light'

/** CSS custom property names exposed as Tailwind colors via @theme */
export const themeColorKeys = [
  'ink',
  'ink-soft',
  'mist',
  'foam',
  'lagoon',
  'lagoon-deep',
  'coral',
  'sun',
  'craton',
  'copper',
  'hero-base',
  'hero-fg',
  'hero-muted',
  'hero-soft',
  'hero-body',
  'hero-cta',
  'hero-nav',
  'line',
  'line-on-dark',
  'highlight',
  'signal-line',
  'signal-pulse',
  'cursor',
]
