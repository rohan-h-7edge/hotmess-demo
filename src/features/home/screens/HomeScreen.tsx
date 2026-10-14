import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaScreen } from '@/components/common';
import { AppText } from '@/components/typography';
import { env } from '@/config/env';
import { spacing } from '@/theme';
import EnvironmentCard from '../components/EnvironmentCard';

export default function HomeScreen() {
  const { t } = useTranslation('home');

  return (
    <SafeAreaScreen edges={[]}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="title" style={styles.title}>
          {t('title')}
        </AppText>
        <EnvironmentCard appVariant={env.EXPO_PUBLIC_APP_VARIANT} apiUrl={env.EXPO_PUBLIC_API_URL} />
      </ScrollView>
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
  },
  title: {
    marginBottom: spacing.xl,
  },
});
