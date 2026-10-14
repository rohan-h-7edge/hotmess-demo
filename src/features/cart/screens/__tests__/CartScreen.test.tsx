import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { RootStackScreenProps } from '@/navigation/types';
import { useCart } from '../../queries/useCart';
import { useRemoveFromCart } from '../../queries/useRemoveFromCart';
import { useUpdateCartQuantity } from '../../queries/useUpdateCartQuantity';
import CartScreen from '../CartScreen';

jest.mock('../../queries/useCart', () => ({ useCart: jest.fn() }));
jest.mock('../../queries/useUpdateCartQuantity', () => ({ useUpdateCartQuantity: jest.fn() }));
jest.mock('../../queries/useRemoveFromCart', () => ({ useRemoveFromCart: jest.fn() }));

const item = {
  productId: '1',
  name: 'Velvet Vogue Shirt',
  typeName: 'Shirts',
  colour: 'Blue',
  price: 1290,
  currency: 'INR',
  imageUrl: 'https://img/1.jpg',
  quantity: 2,
  inStock: true,
};
const updateQuantity = { mutate: jest.fn() };
const removeFromCart = { mutate: jest.fn() };

const renderCart = async (cart: object) => {
  jest.mocked(useCart).mockReturnValue({ data: undefined, isPending: false, error: null, refetch: jest.fn(), ...cart } as never);
  jest.mocked(useUpdateCartQuantity).mockReturnValue(updateQuantity as never);
  jest.mocked(useRemoveFromCart).mockReturnValue(removeFromCart as never);
  const navigation = { goBack: jest.fn(), navigate: jest.fn() };
  const props = { navigation, route: { key: 'Cart', name: 'Cart' } } as unknown as RootStackScreenProps<'Cart'>;
  await render(<CartScreen {...props} />);
  return navigation;
};

describe('CartScreen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('shows the empty state and opens New In from Shop Now', async () => {
    const navigation = await renderCart({ data: [] });

    await fireEvent.press(screen.getByRole('button', { name: 'Shop Now' }));

    expect(screen.getByText('Your cart is empty !')).toBeOnTheScreen();
    expect(navigation.navigate).toHaveBeenCalledWith('Main', { screen: 'Home', params: { screen: 'NewIn' } });
  });

  it('lists items with line prices and a total of in-stock items', async () => {
    await renderCart({ data: [item, { ...item, productId: '2', name: 'Sold Out Tee', price: 500, quantity: 1, inStock: false }] });

    expect(screen.getByText('Velvet Vogue Shirt')).toBeOnTheScreen();
    expect(screen.getByText('OUT OF STOCK')).toBeOnTheScreen();
    expect(screen.getAllByText('₹2,580')).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'Proceed to Checkout' })).toBeEnabled();
  });

  it('changes the quantity and removes items', async () => {
    await renderCart({ data: [item] });

    await fireEvent.press(screen.getByRole('button', { name: /Quantity: 2/ }));
    await fireEvent.press(screen.getByRole('button', { name: '4' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Remove' }));

    expect(updateQuantity.mutate).toHaveBeenCalledWith({ productId: '1', quantity: 4 });
    expect(removeFromCart.mutate).toHaveBeenCalledWith('1');
  });

  it('goes back from the header', async () => {
    const navigation = await renderCart({ data: [] });

    await fireEvent.press(screen.getByRole('button', { name: 'Back' }));

    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('shows a loading error with retry', async () => {
    const refetch = jest.fn();
    await renderCart({ error: new Error('Network error'), refetch });

    await fireEvent.press(screen.getByRole('button', { name: 'Retry' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Network error');
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
