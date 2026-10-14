import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/typography';
import { radius, spacing, ThemeColors, useTheme } from '@/theme';

interface LanguageOption<T extends string> {
  value: T;
  label: string;
}

interface LanguageSwitchProps<T extends string> {
  value: T;
  options: LanguageOption<T>[];
  onChange: (value: T) => void;
}

export default function LanguageSwitch<T extends string>({ value, options, onChange }: LanguageSwitchProps<T>) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.switch} accessibilityRole="radiogroup">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            onPress={() => onChange(option.value)}
            style={[styles.option, selected && styles.selected]}
          >
            <AppText variant="caption" color={selected ? 'onPrimary' : 'text'}>
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    switch: {
      flexDirection: 'row',
      padding: spacing.xxs,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
    },
    option: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: radius.full,
    },
    selected: {
      backgroundColor: colors.primary,
    },
  });
