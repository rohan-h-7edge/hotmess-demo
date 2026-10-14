import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/typography';
import { spacing, ThemeColors, useTheme } from '@/theme';

interface MenuSectionProps {
  title: string;
  children: ReactNode;
}

export default function MenuSection({ title, children }: MenuSectionProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.section}>
      <AppText variant="caption" accessibilityRole="header" style={styles.title}>
        {title}
      </AppText>
      <View style={styles.rows}>{children}</View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    section: {
      gap: spacing.sm,
    },
    title: {
      paddingHorizontal: spacing.lg,
    },
    rows: {
      backgroundColor: colors.surfaceElevated,
    },
  });
