import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { fireEvent, screen } from '@testing-library/react-native';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import TabNavigator from '../TabNavigator';

jest.mock('@/features/cart', () => ({
  ...jest.requireActual('@/features/cart'),
  useCart: () => ({ data: [], isPending: false, error: null, refetch: jest.fn() }),
}));
jest.mock('@/features/catalog', () => ({
  ...jest.requireActual('@/features/catalog'),
  useProducts: () => ({ data: [], isPending: false, error: null, refetch: jest.fn() }),
}));

jest.mock('expo-haptics', () => ({ selectionAsync: jest.fn() }));

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
    expect(screen.getByText('New In')).toBeOnTheScreen();
  });

  it('switches tabs with a light haptic tap', async () => {
    await renderTabs();

    await fireEvent.press(screen.getByRole('button', { name: /Profile/ }));

    expect(screen.getByRole('button', { name: 'Sign Out' })).toBeOnTheScreen();
    expect(Haptics.selectionAsync).toHaveBeenCalledTimes(1);
  });

});
