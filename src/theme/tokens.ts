import type { TextStyle } from 'react-native';

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  soft: 12,
  card: 16,
  pill: 999,
} as const;

export const typography: Record<'title' | 'body' | 'meta' | 'code', TextStyle> = {
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  meta: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  code: {
    fontSize: 11,
    lineHeight: 17,
    fontFamily: 'Courier',
    fontWeight: '400',
  },
};

export const ui = {
  hairline: 1,
  screenPadding: 16,
  cardPadding: 12,
  minTouch: 44,
} as const;
