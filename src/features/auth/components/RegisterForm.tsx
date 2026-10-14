import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { spacing } from '@/theme';
import type { FieldErrors } from '@/utils/validation';
import type { RegisterInput } from '../types/auth.types';
import FormError from './FormError';

interface RegisterFormProps {
  values: RegisterInput;
  errors: FieldErrors<RegisterInput>;
  submitError?: string;
  isSubmitting: boolean;
  onChangeField: (field: keyof RegisterInput, value: string) => void;
  onSubmit: () => void;
}

export default function RegisterForm({
  values,
  errors,
  submitError,
  isSubmitting,
  onChangeField,
  onSubmit,
}: RegisterFormProps) {
  const { t } = useTranslation('auth');

  return (
    <View>
      <Input
        value={values.firstName}
        onChangeText={(text) => onChangeField('firstName', text)}
        error={errors.firstName}
        placeholder={t('fields.firstName')}
        accessibilityLabel={t('fields.firstName')}
        autoComplete="given-name"
        textContentType="givenName"
        returnKeyType="next"
      />
      <Input
        value={values.lastName}
        onChangeText={(text) => onChangeField('lastName', text)}
        error={errors.lastName}
        placeholder={t('fields.lastName')}
        accessibilityLabel={t('fields.lastName')}
        autoComplete="family-name"
        textContentType="familyName"
        returnKeyType="next"
      />
      <Input
        value={values.email}
        onChangeText={(text) => onChangeField('email', text)}
        error={errors.email}
        placeholder={t('fields.email')}
        accessibilityLabel={t('fields.email')}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="next"
      />
      <Input
        value={values.username}
        onChangeText={(text) => onChangeField('username', text)}
        error={errors.username}
        placeholder={t('fields.username')}
        accessibilityLabel={t('fields.username')}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="username-new"
        textContentType="username"
        returnKeyType="next"
      />
      <Input
        value={values.password}
        onChangeText={(text) => onChangeField('password', text)}
        error={errors.password}
        placeholder={t('fields.password')}
        accessibilityLabel={t('fields.password')}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="go"
        onSubmitEditing={onSubmit}
      />
      <FormError message={submitError} />
      <Button title={t('register.submit')} loading={isSubmitting} onPress={onSubmit} style={styles.submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  submit: {
    marginTop: spacing.sm,
  },
});
