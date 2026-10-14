import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/components/typography';
import { spacing, ThemeColors, useTheme } from '@/theme';

interface OrderDetailsProps {
  totalLabel: string;
}

export default function OrderDetails({ totalLabel }: OrderDetailsProps) {
  const { t } = useTranslation('cart');
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <AppText variant="headline">{t('order.title')}</AppText>
      <View style={styles.row}>
        <AppText variant="body">{t('order.total')}</AppText>
        <AppText variant="body">{totalLabel}</AppText>
      </View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      padding: spacing.lg,
      gap: spacing.sm,
      backgroundColor: colors.background,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
  });
