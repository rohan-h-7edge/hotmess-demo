import React from 'react';
import { StyleSheet } from 'react-native';
import { AppText } from '@/components/typography';
import { spacing } from '@/theme';

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <AppText variant="caption" color="error" accessibilityRole="alert" style={styles.error}>
      {message}
    </AppText>
  );
}

const styles = StyleSheet.create({
  error: {
    marginBottom: spacing.md,
  },
});
