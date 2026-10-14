import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { spacing } from '@/theme';
import type { FieldErrors } from '@/utils/validation';
import type { LoginInput } from '../types/auth.types';
import FormError from './FormError';

interface LoginFormProps {
  values: LoginInput;
  errors: FieldErrors<LoginInput>;
  submitError?: string;
  isSubmitting: boolean;
  onChangeField: (field: keyof LoginInput, value: string) => void;
  onSubmit: () => void;
}

export default function LoginForm({ values, errors, submitError, isSubmitting, onChangeField, onSubmit }: LoginFormProps) {
  const { t } = useTranslation('auth');

  return (
    <View>
      <Input
        value={values.username}
        onChangeText={(text) => onChangeField('username', text)}
        error={errors.username}
        placeholder={t('fields.username')}
        accessibilityLabel={t('fields.username')}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="username"
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
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={onSubmit}
      />
      <FormError message={submitError} />
      <Button title={t('login.submit')} loading={isSubmitting} onPress={onSubmit} style={styles.submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  submit: {
    marginTop: spacing.sm,
  },
});
