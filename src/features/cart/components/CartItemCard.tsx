import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/components/typography';
import { spacing, ThemeColors, useTheme } from '@/theme';
import { scale } from '@/utils/scaling';
import QuantityPicker from './QuantityPicker';

interface CartItemCardProps {
  name: string;
  typeName: string;
  colour: string | null;
  imageUrl: string;
  priceLabel: string;
  quantity: number;
  maxQuantity: number;
  inStock: boolean;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  onMoveToWishlist?: () => void;
}

export default function CartItemCard({
  name,
  typeName,
  colour,
  imageUrl,
  priceLabel,
  quantity,
  maxQuantity,
  inStock,
  onQuantityChange,
  onRemove,
  onMoveToWishlist,
}: CartItemCardProps) {
  const { t } = useTranslation('cart');
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.card}>
      <View style={styles.body}>
        <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" recyclingKey={imageUrl} transition={200} />
        <View style={styles.details}>
          <AppText variant="headline">{name}</AppText>
          <AppText variant="caption">{typeName}</AppText>
          {colour ? <AppText variant="caption">{t('item.colour', { colour })}</AppText> : null}
          <QuantityPicker quantity={quantity} max={maxQuantity} onChange={onQuantityChange} />
          <AppText variant="headline">{priceLabel}</AppText>
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable accessibilityRole="button" hitSlop={spacing.sm} onPress={onRemove}>
          <AppText variant="caption" color="text">
            {t('item.remove')}
          </AppText>
        </Pressable>
        <Pressable accessibilityRole="button" hitSlop={spacing.sm} onPress={onMoveToWishlist}>
          <AppText variant="caption" color="text">
            {t('item.moveToWishlist')}
          </AppText>
        </Pressable>
        <AppText variant="caption" color={inStock ? 'success' : 'error'} style={styles.stock}>
          {inStock ? t('item.inStock') : t('item.outOfStock')}
        </AppText>
      </View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      padding: spacing.lg,
      gap: spacing.md,
      backgroundColor: colors.background,
    },
    body: {
      flexDirection: 'row',
      gap: spacing.lg,
    },
    image: {
      width: scale(140),
      aspectRatio: 1,
      backgroundColor: colors.surface,
    },
    details: {
      flex: 1,
      gap: spacing.xs,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: spacing.xl,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderStyle: 'dashed',
      borderTopColor: colors.border,
    },
    stock: {
      marginLeft: 'auto',
    },
  });
