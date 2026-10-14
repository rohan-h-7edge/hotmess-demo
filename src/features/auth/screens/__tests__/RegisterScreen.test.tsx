import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import type { RootStackScreenProps } from '@/navigation/types';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import { authService } from '../../services/authService';
import RegisterScreen from '../RegisterScreen';

jest.mock('../../services/authService', () => ({ authService: { register: jest.fn() } }));

const renderRegister = async () => {
  const navigation = { popTo: jest.fn() };
  const props = { navigation, route: { key: 'Register', name: 'Register' } } as unknown as RootStackScreenProps<'Register'>;
  await renderWithProviders(<RegisterScreen {...props} />);
  return navigation;
};

describe('RegisterScreen', () => {
  it('validates before calling the API', async () => {
    await renderRegister();

    await fireEvent.press(screen.getByRole('button', { name: 'Register' }));

    expect(screen.getByText('First name is required')).toBeOnTheScreen();
    expect(screen.getByText('Enter a valid email address')).toBeOnTheScreen();
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('registers and returns to login with the new username', async () => {
    jest.mocked(authService.register).mockResolvedValue({ id: '209', username: 'anaray' });
    const navigation = await renderRegister();

    await fireEvent.changeText(screen.getByPlaceholderText('First name'), 'Ana');
    await fireEvent.changeText(screen.getByPlaceholderText('Last name'), 'Ray');
    await fireEvent.changeText(screen.getByPlaceholderText('Email'), 'a@x.co');
    await fireEvent.changeText(screen.getByPlaceholderText('Username'), 'anaray');
    await fireEvent.changeText(screen.getByPlaceholderText('Password'), 'secret123');
    await fireEvent.press(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => expect(navigation.popTo).toHaveBeenCalledWith('Login', { registeredUsername: 'anaray' }));
  });

  it('goes back to login', async () => {
    const navigation = await renderRegister();

    await fireEvent.press(screen.getByRole('link', { name: 'Sign In' }));

    expect(navigation.popTo).toHaveBeenCalledWith('Login');
  });
});
