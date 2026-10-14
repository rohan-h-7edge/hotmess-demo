export const lightColors = {
  background: '#FFFFFF',
  surface: '#F2F2F7',
  text: '#000000',
  textSecondary: '#363636',
  border: '#D1D1D6',
  primary: '#000000',
  onPrimary: '#FFFFFF',
  error: '#D70015',
  success: '#248A3D',
  warning: '#B25000',
  onMedia: '#FFFFFF',
  onMediaMuted: 'rgba(255, 255, 255, 0.4)',
  chrome: '#222222',
  onChrome: '#FFFFFF',
  onChromeMuted: '#8E8E8E',
  scrim: 'rgba(0, 0, 0, 0.35)',
  favorite: '#E53935',
};

export type ThemeColors = typeof lightColors;
export type ColorName = keyof ThemeColors;

export const darkColors: ThemeColors = {
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#AEAEB2',
  border: '#38383A',
  primary: '#FFFFFF',
  onPrimary: '#000000',
  error: '#FF453A',
  success: '#30D158',
  warning: '#FF9F0A',
  onMedia: '#FFFFFF',
  onMediaMuted: 'rgba(255, 255, 255, 0.4)',
  chrome: '#222222',
  onChrome: '#FFFFFF',
  onChromeMuted: '#8E8E8E',
  scrim: 'rgba(0, 0, 0, 0.35)',
  favorite: '#E53935',
};
