import { moderateScale } from '@/utils/scaling';

export const radius = {
  sm: moderateScale(4),
  md: moderateScale(8),
  lg: moderateScale(12),
  xl: moderateScale(16),
  full: 9999,
} as const;
