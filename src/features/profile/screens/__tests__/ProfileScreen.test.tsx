import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { TabScreenProps } from '@/navigation/types';
import ProfileScreen from '../ProfileScreen';

const mockLogout = { mutate: jest.fn(), isPending: false };
const mockChangeLanguage = jest.fn();
let mockProfile: object = {};
jest.mock('@/features/auth', () => ({ useLogout: () => mockLogout }));
jest.mock('@/features/user', () => ({ useUserProfile: () => mockProfile }));
jest.mock('@/features/cart', () => ({ useCart: () => ({ data: [{ quantity: 2 }, { quantity: 1 }] }) }));
jest.mock('@/features/wishlist', () => ({ useWishlist: () => ({ data: [{ productId: '1' }] }) }));
jest.mock('@/hooks/useLanguage', () => ({ useLanguage: () => ({ language: 'en', changeLanguage: mockChangeLanguage }) }));

const profile = { id: 'u-1', email: 'ana@x.co', firstName: 'Ana', lastName: 'Ray', username: 'anaray' };

const renderProfile = async (query: object = { data: profile, error: null, refetch: jest.fn() }) => {
  mockProfile = query;
  const navigation = { navigate: jest.fn() };
  const props = { navigation, route: { key: 'Profile', name: 'Profile' } } as unknown as TabScreenProps<'Profile'>;
  await render(<ProfileScreen {...props} />);
  return navigation;
};

describe('ProfileScreen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('shows the user and their cart and wishlist counts', async () => {
    await renderProfile();

    expect(screen.getByText('Ana Ray')).toBeOnTheScreen();
    expect(screen.getByText('@anaray')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'My Cart, 3 items' })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Wishlist, 1 item' })).toBeOnTheScreen();
  });

  it('opens cart, wishlist and edit profile', async () => {
    const navigation = await renderProfile();

    await fireEvent.press(screen.getByRole('button', { name: /My Cart/ }));
    await fireEvent.press(screen.getByRole('button', { name: /Wishlist/ }));
    await fireEvent.press(screen.getByRole('button', { name: 'Edit Profile' }));

    expect(navigation.navigate.mock.calls).toEqual([['Cart'], ['Wishlist'], ['EditProfile']]);
  });

  it('switches the app language', async () => {
    await renderProfile();

    await fireEvent.press(screen.getByRole('radio', { name: 'हिन्दी' }));

    expect(mockChangeLanguage).toHaveBeenCalledWith('hi');
  });

  it('asks before signing out', async () => {
    await renderProfile();

    await fireEvent.press(screen.getByRole('button', { name: 'Sign Out' }));
    expect(mockLogout.mutate).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByRole('button', { name: 'Confirm' }));

    expect(mockLogout.mutate).toHaveBeenCalledTimes(1);
  });

  it('shows a profile loading error with retry', async () => {
    const refetch = jest.fn();
    await renderProfile({ data: undefined, error: new Error('Network error'), refetch });

    await fireEvent.press(screen.getByRole('button', { name: 'Retry' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Network error');
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
