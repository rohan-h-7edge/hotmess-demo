import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/icon';
import { AppText } from '@/components/typography';
import { spacing, ThemeColors, useTheme } from '@/theme';

interface CouponRowProps {
  onPress?: () => void;
}

const percentIcon = require('@/assets/icons/percent.svg');
const chevronIcon = require('@/assets/icons/chevron-right.svg');

export default function CouponRow({ onPress }: CouponRowProps) {
  const { t } = useTranslation('cart');
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
      <Icon source={percentIcon} color={colors.text} />
      <AppText variant="body" style={styles.label}>
        {t('coupon')}
      </AppText>
      <Icon source={chevronIcon} color={colors.text} />
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg,
      padding: spacing.lg,
      backgroundColor: colors.background,
    },
    label: {
      flex: 1,
    },
  });
