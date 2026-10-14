import { Platform, TextStyle } from 'react-native';
import { fontScale } from '@/utils/scaling';
import type { ColorName } from './colors';

export const typography = {
  title: { fontSize: fontScale(28), lineHeight: fontScale(34), fontWeight: '700' },
  subtitle: { fontSize: fontScale(22), lineHeight: fontScale(28), fontWeight: '600' },
  headline: { fontSize: fontScale(17), lineHeight: fontScale(22), fontWeight: '600' },
  body: { fontSize: fontScale(16), lineHeight: fontScale(22), fontWeight: '400' },
  caption: { fontSize: fontScale(12), lineHeight: fontScale(16), fontWeight: '500' },
  code: {
    fontSize: fontScale(14),
    lineHeight: fontScale(20),
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  },
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;

export const textColors: Record<TypographyVariant, ColorName> = {
  title: 'text',
  subtitle: 'text',
  headline: 'text',
  body: 'text',
  caption: 'textSecondary',
  code: 'text',
};
