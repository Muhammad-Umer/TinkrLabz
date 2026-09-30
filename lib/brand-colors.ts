export const brandColors = {
  dark: {
    background: 0x0d0b1f,
    primary: 0xe8303a,
    secondary: 0x6c5ce7,
    gradient: ['#0d0b1f', '#2b1f72', '#e8303a'] as const,
  },
  light: {
    background: 0xf6f5fb,
    primary: 0xe8303a,
    secondary: 0x1b1648,
    gradient: ['#f6f5fb', '#b8b0f2', '#f26a70'] as const,
  },
}

export type BrandMode = keyof typeof brandColors
