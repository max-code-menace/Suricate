export const colors = {
  background: '#FFF8F3',
  surface: '#FFFFFF',
  primary: '#FF5D73',
  primaryDark: '#E14760',
  secondary: '#FFB648',
  accent: '#3DBE8B',
  text: '#241D1D',
  textMuted: '#8C7E7E',
  border: '#F0E3DC',
  danger: '#E14760',
  overlayLike: 'rgba(61, 190, 139, 0.85)',
  overlayNope: 'rgba(225, 71, 96, 0.85)',
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
  sm: 8,
  md: 16,
  lg: 24,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;
