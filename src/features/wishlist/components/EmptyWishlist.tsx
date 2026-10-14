import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { AppText } from '@/components/typography';
import { spacing, useTheme } from '@/theme';
import { moderateScale } from '@/utils/scaling';

interface EmptyWishlistProps {
  onShopNow: () => void;
}

const heartIcon = require('@/assets/icons/heart.png');
const ICON_SIZE = moderateScale(64);

export default function EmptyWishlist({ onShopNow }: EmptyWishlistProps) {
  const { t } = useTranslation('wishlist');
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Icon source={heartIcon} color={colors.textSecondary} size={ICON_SIZE} />
      <AppText variant="headline" style={styles.centered}>
        {t('empty.title')}
      </AppText>
      <AppText variant="caption" color="text" style={styles.centered}>
        {t('empty.message')}
      </AppText>
      <Button title={t('empty.cta')} onPress={onShopNow} style={styles.cta} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.xxxl,
  },
  centered: {
    textAlign: 'center',
  },
  cta: {
    minWidth: '45%',
  },
});
