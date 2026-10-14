import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { AppText } from '@/components/typography';
import { spacing, ThemeColors, useTheme } from '@/theme';

interface CheckoutBarProps {
  totalLabel: string;
  canCheckout: boolean;
  onCheckout?: () => void;
}

export default function CheckoutBar({ totalLabel, canCheckout, onCheckout }: CheckoutBarProps) {
  const { t } = useTranslation('cart');
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.bar}>
      <AppText variant="headline">{totalLabel}</AppText>
      <Button title={t('checkout')} disabled={!canCheckout} onPress={onCheckout} style={styles.button} />
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.lg,
      padding: spacing.lg,
      backgroundColor: colors.background,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
    button: {
      flexShrink: 1,
    },
  });
