import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { spacing, ThemeColors, useTheme } from '@/theme';
import { Icon } from '../icon';
import { AppText } from '../typography';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
}

const backIcon = require('@/assets/icons/arrow-left.svg');

export default function Header({ title, onBackPress }: HeaderProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.header}>
      {onBackPress ? (
        <Pressable accessibilityRole="button" accessibilityLabel={t('actions.back')} hitSlop={spacing.md} onPress={onBackPress}>
          <Icon source={backIcon} color={colors.text} />
        </Pressable>
      ) : null}
      <AppText variant="body" accessibilityRole="header">
        {title}
      </AppText>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xl,
      padding: spacing.lg,
      backgroundColor: colors.background,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
  });
