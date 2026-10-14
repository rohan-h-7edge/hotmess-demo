import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RootStackScreenProps } from '@/navigation/types';
import AuthFooterLink from '../components/AuthFooterLink';
import AuthHeader from '../components/AuthHeader';
import AuthLayout from '../components/AuthLayout';
import RegisterForm from '../components/RegisterForm';
import { useForm } from '../hooks/useForm';
import { useRegister } from '../queries/useRegister';
import { RegisterSchema } from '../types/auth.types';

const emptyRegisterForm = { firstName: '', lastName: '', email: '', username: '', password: '' };

export default function RegisterScreen({ navigation }: RootStackScreenProps<'Register'>) {
  const { t } = useTranslation('auth');
  const form = useForm(RegisterSchema, emptyRegisterForm);
  const register = useRegister();

  const submit = () => {
    const input = form.validate();
    if (!input) return;
    register.mutate(input, {
      onSuccess: (user) =>
        navigation.popTo('Login', { registeredEmail: user.email, needsEmailConfirmation: user.needsEmailConfirmation }),
    });
  };

  return (
    <AuthLayout>
      <AuthHeader title={t('register.title')} subtitle={t('register.subtitle')} />
      <RegisterForm
        values={form.values}
        errors={form.errors}
        submitError={register.error?.message}
        isSubmitting={register.isPending}
        onChangeField={form.changeField}
        onSubmit={submit}
      />
      <AuthFooterLink
        prompt={t('register.haveAccount')}
        actionLabel={t('register.goToLogin')}
        onPress={() => navigation.popTo('Login')}
      />
    </AuthLayout>
  );
}
