export const lightColors = {
  background: '#FFFFFF',
  surface: '#F2F2F7',
  text: '#000000',
  textSecondary: '#6C6C70',
  border: '#D1D1D6',
  primary: '#007AFF',
  onPrimary: '#FFFFFF',
  error: '#D70015',
  success: '#248A3D',
  warning: '#B25000',
  onMedia: '#FFFFFF',
  onMediaMuted: 'rgba(255, 255, 255, 0.4)',
};

export type ThemeColors = typeof lightColors;
export type ColorName = keyof ThemeColors;

export const darkColors: ThemeColors = {
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#AEAEB2',
  border: '#38383A',
  primary: '#0A84FF',
  onPrimary: '#FFFFFF',
  error: '#FF453A',
  success: '#30D158',
  warning: '#FF9F0A',
  onMedia: '#FFFFFF',
  onMediaMuted: 'rgba(255, 255, 255, 0.4)',
};
