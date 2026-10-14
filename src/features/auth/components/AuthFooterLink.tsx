import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/typography';
import { spacing } from '@/theme';

interface AuthFooterLinkProps {
  prompt: string;
  actionLabel: string;
  onPress: () => void;
}

const LINK_HIT_SLOP = spacing.md;

export default function AuthFooterLink({ prompt, actionLabel, onPress }: AuthFooterLinkProps) {
  return (
    <View style={styles.row}>
      <AppText variant="caption">{prompt}</AppText>
      <Pressable accessibilityRole="link" onPress={onPress} hitSlop={LINK_HIT_SLOP}>
        <AppText variant="caption" color="text" style={styles.link}>
          {actionLabel}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.xxl,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
