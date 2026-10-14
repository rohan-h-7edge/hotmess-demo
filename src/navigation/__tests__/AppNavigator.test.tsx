import React from 'react';
import { screen } from '@testing-library/react-native';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import AppNavigator from '../AppNavigator';

describe('AppNavigator', () => {
  it('moves from the splash screen to the Home tab', async () => {
    await renderWithProviders(<AppNavigator />);

    expect(await screen.findByText('Environment Variables:')).toBeOnTheScreen();
    expect(screen.queryByRole('progressbar', { name: 'Loading' })).not.toBeOnTheScreen();
  });
});
