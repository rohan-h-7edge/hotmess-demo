import React, { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { spacing } from '@/theme';
import type { FieldErrors } from '@/utils/validation';
import type { RegisterInput } from '../types/auth.types';
import { useRevealFocusedField } from '../hooks/useRevealFocusedField';
import FormError from './FormError';
import PasswordInput from './PasswordInput';

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
  const revealFocusedField = useRevealFocusedField();
  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  return (
    <View>
      <Input
        value={values.firstName}
        onChangeText={(text) => onChangeField('firstName', text)}
        onFocus={revealFocusedField}
        error={errors.firstName}
        placeholder={t('fields.firstName')}
        accessibilityLabel={t('fields.firstName')}
        autoComplete="given-name"
        textContentType="givenName"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => lastNameRef.current?.focus()}
      />
      <Input
        ref={lastNameRef}
        value={values.lastName}
        onChangeText={(text) => onChangeField('lastName', text)}
        onFocus={revealFocusedField}
        error={errors.lastName}
        placeholder={t('fields.lastName')}
        accessibilityLabel={t('fields.lastName')}
        autoComplete="family-name"
        textContentType="familyName"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <Input
        ref={emailRef}
        value={values.email}
        onChangeText={(text) => onChangeField('email', text)}
        onFocus={revealFocusedField}
        error={errors.email}
        placeholder={t('fields.email')}
        accessibilityLabel={t('fields.email')}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => usernameRef.current?.focus()}
      />
      <Input
        ref={usernameRef}
        value={values.username}
        onChangeText={(text) => onChangeField('username', text)}
        onFocus={revealFocusedField}
        error={errors.username}
        placeholder={t('fields.username')}
        accessibilityLabel={t('fields.username')}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="username-new"
        textContentType="username"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <PasswordInput
        ref={passwordRef}
        value={values.password}
        onChangeText={(text) => onChangeField('password', text)}
        onFocus={revealFocusedField}
        error={errors.password}
        placeholder={t('fields.password')}
        accessibilityLabel={t('fields.password')}
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
