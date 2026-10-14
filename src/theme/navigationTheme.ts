import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { useTheme } from './useTheme';

export const useNavigationTheme = (): Theme => {
  const { colors, isDark } = useTheme();
  const base = isDark ? DarkTheme : DefaultTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.text,
      border: colors.border,
      notification: colors.error,
    },
  };
};
