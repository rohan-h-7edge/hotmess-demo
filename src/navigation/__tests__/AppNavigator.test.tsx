import React from 'react';
import { screen } from '@testing-library/react-native';
import { useUserStore } from '@/features/user';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import AppNavigator from '../AppNavigator';

describe('AppNavigator', () => {
  afterEach(() => useUserStore.getState().signOut());

  it('moves from the splash screen to login when signed out', async () => {
    await renderWithProviders(<AppNavigator />);

    expect(await screen.findByRole('header', { name: 'Welcome Back' })).toBeOnTheScreen();
    expect(screen.queryByRole('progressbar', { name: 'Loading' })).not.toBeOnTheScreen();
  });

  it('opens the Home tab when signed in', async () => {
    useUserStore.getState().signIn('1', 't1', 'r1');

    await renderWithProviders(<AppNavigator />);

    expect(screen.getByText('Environment Variables:')).toBeOnTheScreen();
  });
});
