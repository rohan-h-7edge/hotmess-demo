import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { AppText } from '@/components/typography';
import { spacing, ThemeColors, useTheme } from '@/theme';
import { scale } from '@/utils/scaling';

interface ProductCardProps {
  name: string;
  imageUrl: string;
}

const PRODUCT_IMAGE_ASPECT_RATIO = 3 / 4;

export default function ProductCard({ name, imageUrl }: ProductCardProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" recyclingKey={imageUrl} transition={200} />
      <AppText variant="caption" style={styles.name}>
        {name}
      </AppText>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: scale(150),
    },
    image: {
      width: '100%',
      aspectRatio: PRODUCT_IMAGE_ASPECT_RATIO,
      backgroundColor: colors.surface,
    },
    name: {
      marginTop: spacing.xs,
    },
  });
