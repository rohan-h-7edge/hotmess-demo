import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { radius, spacing, ThemeColors, useTheme } from '@/theme';
import { moderateScale } from '@/utils/scaling';
import { Button } from '../button';
import { Icon } from '../icon';
import { AppText } from '../typography';

interface ProductGridCardProps {
  style?: StyleProp<ViewStyle>;
  name: string;
  typeName: string;
  colour: string | null;
  priceLabel: string;
  imageUrl: string;
  inStock: boolean;
  cartQuantity: number;
  isAddingToCart: boolean;
  isWishlisted: boolean;
  onWishlistPress?: () => void;
  onAddToCartPress?: () => void;
}

const heartFill = require('@/assets/icons/heart-filled.svg');
const heartOutline = require('@/assets/icons/heart-outline.svg');
const HEART_SIZE = moderateScale(24);

export default function ProductGridCard({
  name,
  typeName,
  colour,
  priceLabel,
  imageUrl,
  inStock,
  cartQuantity,
  isAddingToCart,
  isWishlisted,
  onWishlistPress,
  onAddToCartPress,
  style,
}: ProductGridCardProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const addToCartLabel = () => {
    if (!inStock) return t('product.outOfStock');
    if (cartQuantity > 0) return t('product.inCart', { quantity: cartQuantity });
    return t('product.addToCart');
  };

  return (
    <View style={[styles.card, style]}>
      <View style={styles.media}>
        <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" recyclingKey={imageUrl} transition={200} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isWishlisted ? t('product.removeFromWishlist') : t('product.addToWishlist')}
          accessibilityState={{ selected: isWishlisted }}
          hitSlop={spacing.md}
          onPress={onWishlistPress}
          style={styles.wishlist}
        >
          <Icon source={heartFill} color={isWishlisted ? colors.favorite : colors.onMedia} size={HEART_SIZE} />
          <View style={styles.heartOutline}>
            <Icon source={heartOutline} color={isWishlisted ? colors.favorite : colors.chrome} size={HEART_SIZE} />
          </View>
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
      <Button
        title={addToCartLabel()}
        disabled={!inStock}
        loading={isAddingToCart}
        variant={cartQuantity > 0 ? 'secondary' : 'primary'}
        onPress={onAddToCartPress}
      />
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
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
    // Product photos are mostly white, so the white heart needs a thin dark edge to stay visible.
    heartOutline: {
      ...StyleSheet.absoluteFill,
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
