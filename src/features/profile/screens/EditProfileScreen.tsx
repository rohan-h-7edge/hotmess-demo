import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { Header, SafeAreaScreen } from '@/components/common';
import { Input } from '@/components/input';
import { AppText } from '@/components/typography';
import { UpdateProfileSchema, UserProfile, useUpdateProfile, useUserProfile } from '@/features/user';
import { useForm } from '@/hooks/useForm';
import type { RootStackScreenProps } from '@/navigation/types';
import { spacing, useTheme } from '@/theme';

export default function EditProfileScreen({ navigation }: RootStackScreenProps<'EditProfile'>) {
  const { t } = useTranslation('profile');
  const { colors } = useTheme();
  const profile = useUserProfile();

  return (
    <SafeAreaScreen>
      <Header title={t('edit.title')} onBackPress={() => navigation.goBack()} />
      {profile.data ? (
        <EditProfileForm profile={profile.data} onSaved={() => navigation.goBack()} />
      ) : (
        <ActivityIndicator color={colors.text} style={styles.loading} />
      )}
    </SafeAreaScreen>
  );
}

// Mounted once the profile has loaded, so the form starts with the saved values.
function EditProfileForm({ profile, onSaved }: { profile: UserProfile; onSaved: () => void }) {
  const { t } = useTranslation('profile');
  const form = useForm(UpdateProfileSchema, {
    firstName: profile.firstName,
    lastName: profile.lastName,
    username: profile.username,
  });
  const updateProfile = useUpdateProfile();

  const save = () => {
    const input = form.validate();
    if (input) updateProfile.mutate(input, { onSuccess: onSaved });
  };

  return (
    <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
      <Input
        value={form.values.firstName}
        onChangeText={(text) => form.changeField('firstName', text)}
        error={form.errors.firstName}
        placeholder={t('fields.firstName')}
        accessibilityLabel={t('fields.firstName')}
        autoComplete="given-name"
      />
      <Input
        value={form.values.lastName}
        onChangeText={(text) => form.changeField('lastName', text)}
        error={form.errors.lastName}
        placeholder={t('fields.lastName')}
        accessibilityLabel={t('fields.lastName')}
        autoComplete="family-name"
      />
      <Input
        value={form.values.username}
        onChangeText={(text) => form.changeField('username', text)}
        error={form.errors.username}
        placeholder={t('fields.username')}
        accessibilityLabel={t('fields.username')}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View>
        <Input value={profile.email} onChangeText={() => undefined} editable={false} accessibilityLabel={t('fields.email')} />
        <AppText variant="caption">{t('edit.email')}</AppText>
      </View>
      {updateProfile.error ? (
        <AppText variant="caption" color="error" accessibilityRole="alert">
          {updateProfile.error.message}
        </AppText>
      ) : null}
      <Button title={t('edit.save')} loading={updateProfile.isPending} onPress={save} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    padding: spacing.xl,
  },
  form: {
    padding: spacing.xl,
    gap: spacing.sm,
  },
});
