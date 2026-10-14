import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/typography';
import { radius, spacing, ThemeColors, useTheme } from '@/theme';

interface PopularSearch {
  term: string;
  label: string;
}

interface PopularSearchesProps {
  title: string;
  searches: PopularSearch[];
  onSelect: (term: string) => void;
}

export default function PopularSearches({ title, searches, onSelect }: PopularSearchesProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <AppText variant="headline" accessibilityRole="header">
        {title}
      </AppText>
      <View style={styles.chips}>
        {searches.map((search) => (
          <Pressable key={search.term} accessibilityRole="button" onPress={() => onSelect(search.term)} style={styles.chip}>
            <AppText variant="caption" color="text">
              {search.label}
            </AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      padding: spacing.lg,
      gap: spacing.md,
    },
    chips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    chip: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
    },
  });
