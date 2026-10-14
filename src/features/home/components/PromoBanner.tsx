import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '@/components/button';
import { AppText } from '@/components/typography';
import { spacing, ThemeColors, useTheme } from '@/theme';
import { verticalScale } from '@/utils/scaling';

interface PromoBannerProps {
  title: string;
  tagline: string;
  ctaLabel: string;
  imageUrl?: string;
  onCtaPress?: () => void;
}

export default function PromoBanner({ title, tagline, ctaLabel, imageUrl, onCtaPress }: PromoBannerProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.banner}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={200}
        />
      ) : null}
      <View style={styles.scrim} />
      <View style={styles.cta}>
        <Button title={ctaLabel} variant="inverse" onPress={onCtaPress} />
      </View>
      <AppText variant="headline" color="onMedia">
        {title}
      </AppText>
      <AppText variant="caption" color="onMedia">
        {tagline}
      </AppText>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    banner: {
      minHeight: verticalScale(225),
      padding: spacing.lg,
      overflow: 'hidden',
      backgroundColor: colors.chrome,
    },
    scrim: {
      ...StyleSheet.absoluteFill,
      backgroundColor: colors.scrim,
    },
    cta: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.lg,
    },
  });
