import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { AppText } from '@/components/typography';
import { radius, spacing, ThemeColors, useTheme } from '@/theme';

interface CollectionTileProps {
  label: string;
  imageUrl?: string;
}

export default function CollectionTile({ label, imageUrl }: CollectionTileProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.tile}>
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
    </View>
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
