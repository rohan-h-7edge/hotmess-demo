import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { radius, ThemeColors, useTheme } from '@/theme';
import { moderateScale } from '@/utils/scaling';

interface SplashProgressBarProps {
  durationMs: number;
  accessibilityLabel: string;
  onComplete: () => void;
}

export default function SplashProgressBar({ durationMs, accessibilityLabel, onComplete }: SplashProgressBarProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.set(
      withTiming(1, { duration: durationMs, easing: Easing.out(Easing.quad) }, (finished) => {
        if (finished) scheduleOnRN(onComplete);
      })
    );
  }, [durationMs, onComplete, progress]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${progress.get() * 100}%` }));

  return (
    <View style={styles.track} accessible accessibilityRole="progressbar" accessibilityLabel={accessibilityLabel}>
      <Animated.View style={[styles.fill, fillStyle]} />
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    track: {
      width: '100%',
      height: moderateScale(4),
      borderRadius: radius.full,
      backgroundColor: colors.onMediaMuted,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      borderRadius: radius.full,
      backgroundColor: colors.onMedia,
    },
  });
