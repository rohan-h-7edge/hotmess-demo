import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { TabScreenProps } from '@/navigation/types';
import { useRemoveFromWishlist } from '../../queries/useRemoveFromWishlist';
import { useWishlist } from '../../queries/useWishlist';
import WishlistScreen from '../WishlistScreen';

jest.mock('../../queries/useWishlist', () => ({ useWishlist: jest.fn() }));
jest.mock('../../queries/useRemoveFromWishlist', () => ({ useRemoveFromWishlist: jest.fn() }));
const mockAddToCart = { mutate: jest.fn(), isPending: false, variables: undefined };
jest.mock('@/features/cart', () => ({
  useCart: () => ({ data: [{ productId: '2', quantity: 1 }] }),
  useAddToCart: () => mockAddToCart,
}));

const item = {
  productId: '1',
  name: 'Velvet Vogue Shirt',
  typeName: 'Shirts',
  colour: 'Blue',
  price: 1290,
  currency: 'INR',
  imageUrl: 'https://img/1.jpg',
  inStock: true,
};
const removeFromWishlist = { mutate: jest.fn() };

const renderWishlist = async (wishlist: object) => {
  jest
    .mocked(useWishlist)
    .mockReturnValue({ data: undefined, isPending: false, isRefetching: false, error: null, refetch: jest.fn(), ...wishlist } as never);
  jest.mocked(useRemoveFromWishlist).mockReturnValue(removeFromWishlist as never);
  const navigation = { navigate: jest.fn() };
  const props = { navigation, route: { key: 'Wishlist', name: 'Wishlist' } } as unknown as TabScreenProps<'Wishlist'>;
  await render(<WishlistScreen {...props} />);
  return navigation;
};

describe('WishlistScreen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('shows the empty state and opens New In', async () => {
    const navigation = await renderWishlist({ data: [] });

    await fireEvent.press(screen.getByRole('button', { name: 'Shop Now' }));

    expect(screen.getByText('0 saved items')).toBeOnTheScreen();
    expect(navigation.navigate).toHaveBeenCalledWith('Home', { screen: 'NewIn' });
  });

  it('lists saved products with their price and cart state', async () => {
    await renderWishlist({ data: [item, { ...item, productId: '2', name: 'Rain Jacket' }] });

    expect(screen.getByRole('header', { name: 'Wishlist' })).toBeOnTheScreen();
    expect(screen.getByText('2 saved items')).toBeOnTheScreen();
    expect(screen.getByText('Velvet Vogue Shirt')).toBeOnTheScreen();
    expect(screen.getAllByText('₹1,290')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'In Cart (1)' })).toBeOnTheScreen();
  });

  it('removes from the wishlist with the heart and adds to the cart', async () => {
    await renderWishlist({ data: [item] });

    await fireEvent.press(screen.getByRole('button', { name: 'Remove from wishlist' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Add to Cart' }));

    expect(removeFromWishlist.mutate).toHaveBeenCalledWith('1');
    expect(mockAddToCart.mutate).toHaveBeenCalledWith('1');
  });

  it('shows a loading error with retry', async () => {
    const refetch = jest.fn();
    await renderWishlist({ error: new Error('Network error'), refetch });

    await fireEvent.press(screen.getByRole('button', { name: 'Retry' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Network error');
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
