import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/icon';
import { radius, spacing, ThemeColors, typography, useTheme } from '@/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onBackPress: () => void;
}

const backIcon = require('@/assets/icons/arrow-left.svg');
const searchIcon = require('@/assets/icons/search.png');
const clearIcon = require('@/assets/icons/close.svg');

export default function SearchBar({ value, onChangeText, onBackPress }: SearchBarProps) {
  const { t } = useTranslation('catalog');
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.bar}>
      <Pressable accessibilityRole="button" accessibilityLabel={t('actions.back', { ns: 'common' })} hitSlop={spacing.md} onPress={onBackPress}>
        <Icon source={backIcon} color={colors.text} />
      </Pressable>
      <View style={styles.field}>
        <Icon source={searchIcon} color={colors.textSecondary} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={t('search.placeholder')}
          placeholderTextColor={colors.textSecondary}
          accessibilityLabel={t('search.placeholder')}
          autoFocus
          autoCorrect={false}
          returnKeyType="search"
          style={styles.input}
        />
        {value ? (
          <Pressable accessibilityRole="button" accessibilityLabel={t('search.clear')} hitSlop={spacing.md} onPress={() => onChangeText('')}>
            <Icon source={clearIcon} color={colors.textSecondary} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      padding: spacing.lg,
      backgroundColor: colors.background,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    field: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radius.full,
      backgroundColor: colors.surface,
    },
    input: {
      ...typography.body,
      flex: 1,
      color: colors.text,
      paddingVertical: spacing.sm,
    },
  });
