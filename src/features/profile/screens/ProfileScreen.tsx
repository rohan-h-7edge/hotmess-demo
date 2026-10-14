import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { SafeAreaScreen } from '@/components/common';
import { AppText } from '@/components/typography';
import { useLogout } from '@/features/auth';
import { spacing } from '@/theme';

export default function ProfileScreen() {
  const { t } = useTranslation('profile');
  const logout = useLogout();

  return (
    <SafeAreaScreen edges={[]} style={styles.screen}>
      <AppText variant="title">{t('title')}</AppText>
      <Button
        title={t('signOut')}
        variant="secondary"
        loading={logout.isPending}
        onPress={() => logout.mutate()}
        style={styles.signOut}
      />
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: spacing.xl,
  },
  signOut: {
    marginTop: spacing.xl,
  },
});
