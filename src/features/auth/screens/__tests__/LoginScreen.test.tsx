import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import type { RootStackScreenProps } from '@/navigation/types';
import { ApiError } from '@/services/api';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import { authService } from '../../services/authService';
import LoginScreen from '../LoginScreen';

jest.mock('../../services/authService', () => ({ authService: { login: jest.fn() } }));

const renderLogin = async (params?: { registeredUsername?: string }) => {
  const navigation = { navigate: jest.fn() };
  const props = { navigation, route: { key: 'Login', name: 'Login', params } } as unknown as RootStackScreenProps<'Login'>;
  await renderWithProviders(<LoginScreen {...props} />);
  return navigation;
};

const fillAndSubmit = async (username: string, password: string) => {
  await fireEvent.changeText(screen.getByPlaceholderText('Username'), username);
  await fireEvent.changeText(screen.getByPlaceholderText('Password'), password);
  await fireEvent.press(screen.getByRole('button', { name: 'Sign In' }));
};

describe('LoginScreen', () => {
  it('validates before calling the API', async () => {
    await renderLogin();

    await fireEvent.press(screen.getByRole('button', { name: 'Sign In' }));

    expect(screen.getByText('Username is required')).toBeOnTheScreen();
    expect(screen.getByText('Password is required')).toBeOnTheScreen();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('logs in with the entered credentials', async () => {
    jest.mocked(authService.login).mockResolvedValue({ userId: '1', accessToken: 'a1', refreshToken: 'r1' });
    await renderLogin();

    await fillAndSubmit('emilys', 'emilyspass');

    await waitFor(() => expect(authService.login).toHaveBeenCalledWith({ username: 'emilys', password: 'emilyspass' }));
  });

  it('shows the server error', async () => {
    jest.mocked(authService.login).mockRejectedValue(new ApiError('Invalid credentials', 400));
    await renderLogin();

    await fillAndSubmit('emilys', 'wrong');

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid credentials');
  });

  it('confirms a new registration', async () => {
    await renderLogin({ registeredUsername: 'anaray' });

    expect(screen.getByText('Account created for anaray. Sign in to continue.')).toBeOnTheScreen();
  });

  it('opens the register screen', async () => {
    const navigation = await renderLogin();

    await fireEvent.press(screen.getByRole('link', { name: 'Register' }));

    expect(navigation.navigate).toHaveBeenCalledWith('Register');
  });
});
