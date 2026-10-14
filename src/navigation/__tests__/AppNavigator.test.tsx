import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react-native';
import { useUserStore } from '@/features/user';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import AppNavigator from '../AppNavigator';

jest.mock('@/features/wishlist', () => ({
  ...jest.requireActual('@/features/wishlist'),
  useWishlist: () => ({ data: [], isPending: false, isRefetching: false, error: null, refetch: jest.fn() }),
}));
jest.mock('@/features/cart', () => ({
  ...jest.requireActual('@/features/cart'),
  useCart: () => ({ data: [], isPending: false, error: null, refetch: jest.fn() }),
}));
jest.mock('@/features/catalog', () => ({
  ...jest.requireActual('@/features/catalog'),
  useProducts: () => ({ data: [], isPending: false, error: null, refetch: jest.fn() }),
}));

describe('AppNavigator', () => {
  afterEach(() => useUserStore.getState().signOut());

  it('moves from the splash screen to login when signed out', async () => {
    await renderWithProviders(<AppNavigator />);

    expect(await screen.findByRole('header', { name: 'Welcome Back' })).toBeOnTheScreen();
    expect(screen.queryByRole('progressbar', { name: 'Loading' })).not.toBeOnTheScreen();
  });

  it('moves from the splash screen to Home when signed in', async () => {
    useUserStore.getState().signIn('u-1', 'a1', 'r1');

    await renderWithProviders(<AppNavigator />);

    expect(await screen.findByText('New In')).toBeOnTheScreen();
  });

  it('goes straight to login after signing out, without the splash', async () => {
    useUserStore.getState().signIn('u-1', 'a1', 'r1');
    await renderWithProviders(<AppNavigator />);
    await screen.findByText('New In');

    await act(async () => {
      useUserStore.getState().signOut();
    });

    expect(screen.getByRole('header', { name: 'Welcome Back' })).toBeOnTheScreen();
    expect(screen.queryByRole('progressbar', { name: 'Loading' })).not.toBeOnTheScreen();
  });

  it('opens the cart from the header bag icon', async () => {
    useUserStore.getState().signIn('u-1', 'a1', 'r1');
    await renderWithProviders(<AppNavigator />);
    await screen.findByText('New In');

    await fireEvent.press(screen.getByRole('button', { name: 'Shopping bag' }));

    expect(await screen.findByRole('header', { name: 'Cart' })).toBeOnTheScreen();
  });

  it('opens search from the header', async () => {
    useUserStore.getState().signIn('u-1', 'a1', 'r1');
    await renderWithProviders(<AppNavigator />);
    await screen.findByText('New In');

    await fireEvent.press(screen.getByRole('button', { name: 'Search' }));

    expect(await screen.findByPlaceholderText('Search products')).toBeOnTheScreen();
  });
});
