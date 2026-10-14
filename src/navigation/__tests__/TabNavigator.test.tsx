import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, screen } from '@testing-library/react-native';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import TabNavigator from '../TabNavigator';

const renderTabs = () =>
  renderWithProviders(
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );

describe('TabNavigator', () => {
  it('shows the app header and all four tabs, starting on Home', async () => {
    await renderTabs();

    expect(screen.getByRole('header', { name: 'Hotmess' })).toBeOnTheScreen();
    for (const tab of ['Home', 'Wishlist', 'Editorials', 'Profile']) {
      expect(screen.getByRole('button', { name: new RegExp(tab) })).toBeOnTheScreen();
    }
    expect(screen.getByText('Environment Variables:')).toBeOnTheScreen();
  });

  it('switches tabs', async () => {
    await renderTabs();

    await fireEvent.press(screen.getByRole('button', { name: /Profile/ }));

    expect(screen.getByRole('button', { name: 'Sign Out' })).toBeOnTheScreen();
  });
});
