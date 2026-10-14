import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/icon';
import { radius, ThemeColors, useTheme } from '@/theme';
import { moderateScale } from '@/utils/scaling';

interface FilterButtonProps {
  onPress?: () => void;
}

const filterIcon = require('@/assets/icons/filter.svg');
const BUTTON_SIZE = moderateScale(56);

export default function FilterButton({ onPress }: FilterButtonProps) {
  const { t } = useTranslation('catalog');
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={t('filter')} onPress={onPress} style={styles.button}>
      <Icon source={filterIcon} color={colors.chrome} />
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      backgroundColor: colors.onMedia,
      shadowColor: colors.chrome,
      shadowOpacity: 0.2,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 4,
    },
  });
