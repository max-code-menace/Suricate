export const colors = {
  background: '#F4F0FF',
  text: '#221935',
  textMuted: '#6E6383',
  textOnDark: '#FFFFFF',

  primary: '#FF4F81',
  primaryDark: '#E23B6C',
  secondary: '#7C5CFF',
  accent: '#2FD9B0',
  danger: '#FF4F6D',

  glass: 'rgba(255, 255, 255, 0.38)',
  glassStrong: 'rgba(255, 255, 255, 0.62)',
  glassBorder: 'rgba(255, 255, 255, 0.55)',
  glassDark: 'rgba(34, 25, 53, 0.35)',

  border: 'rgba(255, 255, 255, 0.45)',

  overlayLike: 'rgba(47, 217, 176, 0.85)',
  overlayNope: 'rgba(255, 79, 109, 0.85)',

  bubble1: 'rgba(255, 79, 129, 0.32)',
  bubble2: 'rgba(124, 92, 255, 0.3)',
  bubble3: 'rgba(47, 217, 176, 0.28)',
} as const;

export const gradients = {
  background: ['#FFD9E8', '#E4D6FF', '#CDEBFF'] as [string, string, string],
  primaryButton: ['#FF6F9C', '#FF4F81'] as [string, string],
  accentButton: ['#7C5CFF', '#5B3DFF'] as [string, string],
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 12,
  md: 20,
  lg: 28,
  xl: 36,
  pill: 999,
} as const;

export const typography = {
  title: { fontSize: 28, fontWeight: '700' as const },
  heading: { fontSize: 20, fontWeight: '700' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '500' as const },
};

export const shadow = {
  card: {
    shadowColor: '#3A2564',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 8,
  },
  soft: {
    shadowColor: '#3A2564',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;
