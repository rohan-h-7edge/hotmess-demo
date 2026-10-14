import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/typography';
import { spacing } from '@/theme';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <View style={styles.header}>
      <AppText variant="title" accessibilityRole="header">
        {title}
      </AppText>
      <AppText variant="caption">{subtitle}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.xs,
    marginBottom: spacing.xxxl,
  },
});
