import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/components/typography';
import type { RootStackScreenProps } from '@/navigation/types';
import { spacing } from '@/theme';
import AuthFooterLink from '../components/AuthFooterLink';
import AuthHeader from '../components/AuthHeader';
import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';
import { useForm } from '../hooks/useForm';
import { useLogin } from '../queries/useLogin';
import { LoginSchema } from '../types/auth.types';

export default function LoginScreen({ navigation, route }: RootStackScreenProps<'Login'>) {
  const { t } = useTranslation('auth');
  const form = useForm(LoginSchema, { username: '', password: '' });
  const login = useLogin();
  const registeredUsername = route.params?.registeredUsername;

  const submit = () => {
    const input = form.validate();
    if (input) login.mutate(input);
  };

  return (
    <AuthLayout>
      <AuthHeader title={t('login.title')} subtitle={t('login.subtitle')} />
      {registeredUsername ? (
        <AppText variant="caption" color="success" style={styles.notice}>
          {t('login.registered', { username: registeredUsername })}
        </AppText>
      ) : null}
      <LoginForm
        values={form.values}
        errors={form.errors}
        submitError={login.error?.message}
        isSubmitting={login.isPending}
        onChangeField={form.changeField}
        onSubmit={submit}
      />
      <AuthFooterLink
        prompt={t('login.noAccount')}
        actionLabel={t('login.goToRegister')}
        onPress={() => navigation.navigate('Register')}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  notice: {
    marginBottom: spacing.lg,
  },
});
