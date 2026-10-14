import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaScreen } from '@/components/common';
import { AppText } from '@/components/typography';
import { spacing } from '@/theme';

export default function EditorialsScreen() {
  const { t } = useTranslation('editorials');

  return (
    <SafeAreaScreen edges={[]} style={styles.screen}>
      <AppText variant="title">{t('title')}</AppText>
      <AppText variant="caption">{t('comingSoon', { ns: 'common' })}</AppText>
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: spacing.xl,
    gap: spacing.xs,
  },
});
