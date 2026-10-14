import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing, ThemeColors, useTheme } from '@/theme';
import { AppText } from '../typography';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.header}>
      <AppText variant="subtitle">{title}</AppText>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      padding: spacing.lg,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
  });
