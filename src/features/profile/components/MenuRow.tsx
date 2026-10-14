import React, { ReactNode } from 'react';
import { ImageSource } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon } from '@/components/icon';
import { AppText } from '@/components/typography';
import { spacing, ThemeColors, useTheme } from '@/theme';

interface MenuRowProps {
  icon: ImageSource | number;
  label: string;
  value?: string;
  onPress?: () => void;
  trailing?: ReactNode;
}

const chevronIcon = require('@/assets/icons/chevron-right.svg');

export default function MenuRow({ icon, label, value, onPress, trailing }: MenuRowProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const content = (
    <>
      <Icon source={icon} color={colors.text} />
      <AppText variant="body" style={styles.label}>
        {label}
      </AppText>
      {value ? <AppText variant="caption">{value}</AppText> : null}
      {trailing}
      {onPress ? <Icon source={chevronIcon} color={colors.textSecondary} /> : null}
    </>
  );

  if (!onPress) return <View style={styles.row}>{content}</View>;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={value ? `${label}, ${value}` : label} onPress={onPress} style={styles.row}>
      {content}
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    label: {
      flex: 1,
    },
  });
