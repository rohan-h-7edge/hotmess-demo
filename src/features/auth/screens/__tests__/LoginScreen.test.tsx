import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import type { RootStackScreenProps } from '@/navigation/types';
import { ApiError } from '@/services/api';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import { authService } from '../../services/authService';
import LoginScreen from '../LoginScreen';

jest.mock('../../services/authService', () => ({ authService: { login: jest.fn() } }));

const renderLogin = async (params?: { registeredEmail: string; needsEmailConfirmation: boolean }) => {
  const navigation = { navigate: jest.fn() };
  const props = { navigation, route: { key: 'Login', name: 'Login', params } } as unknown as RootStackScreenProps<'Login'>;
  await renderWithProviders(<LoginScreen {...props} />);
  return navigation;
};

const fillAndSubmit = async (email: string, password: string) => {
  await fireEvent.changeText(screen.getByPlaceholderText('Email'), email);
  await fireEvent.changeText(screen.getByPlaceholderText('Password'), password);
  await fireEvent.press(screen.getByRole('button', { name: 'Sign In' }));
};

describe('LoginScreen', () => {
  it('validates before calling the API', async () => {
    await renderLogin();

    await fireEvent.press(screen.getByRole('button', { name: 'Sign In' }));

    expect(screen.getByText('Enter a valid email address')).toBeOnTheScreen();
    expect(screen.getByText('Password is required')).toBeOnTheScreen();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('logs in with the entered credentials', async () => {
    jest.mocked(authService.login).mockResolvedValue({ userId: 'u-1', accessToken: 'a1', refreshToken: 'r1' });
    await renderLogin();

    await fillAndSubmit('ana@x.co', 'secret123');

    await waitFor(() => expect(authService.login).toHaveBeenCalledWith({ email: 'ana@x.co', password: 'secret123' }));
  });

  it('shows the server error', async () => {
    jest.mocked(authService.login).mockRejectedValue(new ApiError('Invalid login credentials', 400));
    await renderLogin();

    await fillAndSubmit('ana@x.co', 'wrong');

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid login credentials');
  });

  it('confirms a new registration', async () => {
    await renderLogin({ registeredEmail: 'ana@x.co', needsEmailConfirmation: false });

    expect(screen.getByText('Account created for ana@x.co. Sign in to continue.')).toBeOnTheScreen();
  });

  it('asks a new user to confirm their email first', async () => {
    await renderLogin({ registeredEmail: 'ana@x.co', needsEmailConfirmation: true });

    expect(
      screen.getByText('We sent a confirmation link to ana@x.co. Confirm your email, then sign in.')
    ).toBeOnTheScreen();
  });

  it('opens the register screen', async () => {
    const navigation = await renderLogin();

    await fireEvent.press(screen.getByRole('link', { name: 'Register' }));

    expect(navigation.navigate).toHaveBeenCalledWith('Register');
  });
});
