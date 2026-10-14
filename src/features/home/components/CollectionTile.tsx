import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { AppText } from '@/components/typography';
import { radius, spacing, ThemeColors, useTheme } from '@/theme';

interface CollectionTileProps {
  label: string;
  imageUrl?: string;
  onPress: () => void;
}

export default function CollectionTile({ label, imageUrl, onPress }: CollectionTileProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={styles.tile}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          contentPosition="top"
          transition={200}
        />
      ) : null}
      <View style={styles.scrim} />
      <AppText variant="body" color="onMedia" style={styles.label}>
        {label}
      </AppText>
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    tile: {
      flex: 1,
      aspectRatio: 1,
      justifyContent: 'flex-end',
      borderRadius: radius.sm,
      overflow: 'hidden',
      backgroundColor: colors.surface,
    },
    scrim: {
      ...StyleSheet.absoluteFill,
      backgroundColor: colors.scrim,
    },
    label: {
      padding: spacing.sm,
    },
  });
