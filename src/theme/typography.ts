import { Platform, TextStyle } from 'react-native';
import { fontScale } from '@/utils/scaling';
import type { ColorName } from './colors';

// File names match the PostScript names, so one family name works on iOS and Android.
export const fonts = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
} as const;

export const typography = {
  title: { fontFamily: fonts.medium, fontSize: fontScale(32), lineHeight: fontScale(42) },
  subtitle: { fontFamily: fonts.semiBold, fontSize: fontScale(22), lineHeight: fontScale(30) },
  headline: { fontFamily: fonts.semiBold, fontSize: fontScale(16), lineHeight: fontScale(24) },
  body: { fontFamily: fonts.regular, fontSize: fontScale(16), lineHeight: fontScale(24) },
  caption: { fontFamily: fonts.regular, fontSize: fontScale(12), lineHeight: fontScale(16) },
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
