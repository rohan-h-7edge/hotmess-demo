import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/typography';
import { spacing, ThemeColors, useTheme } from '@/theme';

interface ListHeaderProps {
  title: string;
  subtitle: string;
}

export default function ListHeader({ title, subtitle }: ListHeaderProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.header}>
      <AppText variant="headline" accessibilityRole="header" style={styles.centered}>
        {title}
      </AppText>
      <AppText variant="caption" style={styles.centered}>
        {subtitle}
      </AppText>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      gap: spacing.xs,
      marginHorizontal: spacing.lg,
      paddingBottom: spacing.xs,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.textSecondary,
    },
    centered: {
      textAlign: 'center',
    },
  });
