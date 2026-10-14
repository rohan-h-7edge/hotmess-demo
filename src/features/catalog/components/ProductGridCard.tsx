import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { AppText } from '@/components/typography';
import { radius, spacing, ThemeColors, useTheme } from '@/theme';

interface ProductGridCardProps {
  name: string;
  typeName: string;
  colour: string | null;
  priceLabel: string;
  imageUrl: string;
  onWishlistPress?: () => void;
  onAddToCartPress?: () => void;
}

const heartIcon = require('@/assets/icons/heart-filled.svg');

export default function ProductGridCard({
  name,
  typeName,
  colour,
  priceLabel,
  imageUrl,
  onWishlistPress,
  onAddToCartPress,
}: ProductGridCardProps) {
  const { t } = useTranslation('catalog');
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.card}>
      <View style={styles.media}>
        <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" recyclingKey={imageUrl} transition={200} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('product.addToWishlist')}
          hitSlop={spacing.md}
          onPress={onWishlistPress}
          style={styles.wishlist}
        >
          <Icon source={heartIcon} color={colors.onMedia} />
        </Pressable>
        <View style={styles.pricePill}>
          <AppText variant="caption" color="chrome">
            {priceLabel}
          </AppText>
        </View>
      </View>
      <View style={styles.details}>
        <AppText variant="headline">{name}</AppText>
        <AppText variant="body" color="textSecondary">
          {typeName}
        </AppText>
        {colour ? <AppText variant="caption">{t('product.colour', { colour })}</AppText> : null}
      </View>
      <Button title={t('product.addToCart')} onPress={onAddToCartPress} />
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      flex: 1,
      gap: spacing.md,
    },
    media: {
      aspectRatio: 1,
      backgroundColor: colors.surface,
    },
    image: {
      ...StyleSheet.absoluteFill,
    },
    wishlist: {
      position: 'absolute',
      top: spacing.sm,
      right: spacing.sm,
    },
    pricePill: {
      position: 'absolute',
      right: spacing.sm,
      bottom: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: radius.full,
      backgroundColor: colors.onMedia,
    },
    details: {
      flex: 1,
      gap: spacing.xxs,
    },
  });
