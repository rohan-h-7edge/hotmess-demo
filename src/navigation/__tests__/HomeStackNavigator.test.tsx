import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, screen } from '@testing-library/react-native';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import HomeStackNavigator from '../HomeStackNavigator';

jest.mock('@/features/cart', () => ({
  ...jest.requireActual('@/features/cart'),
  useCart: () => ({ data: [], isPending: false, error: null, refetch: jest.fn() }),
}));
jest.mock('@/features/catalog', () => {
  const actual = jest.requireActual('@/features/catalog');
  const emptyQuery = { data: [], isPending: false, error: null, refetch: jest.fn() };
  return {
    ...actual,
    useProducts: () => emptyQuery,
    useProductPages: () => ({ ...emptyQuery, hasNextPage: false, isFetchingNextPage: false, isRefetching: false }),
  };
});

describe('HomeStackNavigator', () => {
  it('starts on Home and opens New In', async () => {
    await renderWithProviders(
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    );

    await fireEvent.press(screen.getByRole('link', { name: 'View All' }));

    expect(await screen.findByText('Discover fashion’s fresh take on the ultimate wardrobe essentials')).toBeOnTheScreen();
  });
});
