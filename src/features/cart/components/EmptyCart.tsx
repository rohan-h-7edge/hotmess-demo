import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { AppText } from '@/components/typography';
import { spacing } from '@/theme';
import { scale } from '@/utils/scaling';

interface EmptyCartProps {
  onShopNow: () => void;
}

const illustration = require('@/assets/images/empty-cart.png');
const ILLUSTRATION_ASPECT_RATIO = 190 / 145;

export default function EmptyCart({ onShopNow }: EmptyCartProps) {
  const { t } = useTranslation('cart');

  return (
    <View style={styles.container}>
      <AppText variant="headline" style={styles.centered}>
        {t('empty.title')}
      </AppText>
      <Image source={illustration} style={styles.illustration} contentFit="contain" />
      <AppText variant="caption" color="text" style={styles.centered}>
        {t('empty.message')}
      </AppText>
      <Button title={t('empty.cta')} onPress={onShopNow} style={styles.cta} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxl,
    padding: spacing.xxxl,
  },
  centered: {
    textAlign: 'center',
  },
  illustration: {
    width: scale(190),
    aspectRatio: ILLUSTRATION_ASPECT_RATIO,
  },
  cta: {
    minWidth: '45%',
  },
});
