import { renderHook } from '@testing-library/react-native';
import { useRemoveFromCart } from '@/features/cart';
import { useAddToWishlist } from '../../queries/useAddToWishlist';
import { useMoveToWishlist } from '../useMoveToWishlist';

jest.mock('../../queries/useAddToWishlist', () => ({ useAddToWishlist: jest.fn() }));
jest.mock('@/features/cart', () => ({ useRemoveFromCart: jest.fn() }));

describe('useMoveToWishlist', () => {
  it('saves the item without its quantity, then removes it from the cart', async () => {
    const addToWishlist = { mutate: jest.fn() };
    const removeFromCart = { mutate: jest.fn() };
    jest.mocked(useAddToWishlist).mockReturnValue(addToWishlist as never);
    jest.mocked(useRemoveFromCart).mockReturnValue(removeFromCart as never);
    const cartItem = {
      productId: '1',
      name: 'Shirt',
      typeName: 'Shirts',
      colour: null,
      price: 999,
      currency: 'INR',
      imageUrl: 'https://img/1.jpg',
      inStock: true,
      quantity: 2,
    };
    const { result } = await renderHook(() => useMoveToWishlist());

    result.current(cartItem);
    const [savedItem, options] = addToWishlist.mutate.mock.calls[0];
    options.onSuccess();

    const { quantity: _quantity, ...expected } = cartItem;
    expect(savedItem).toEqual(expected);
    expect(savedItem).not.toHaveProperty('quantity');
    expect(removeFromCart.mutate).toHaveBeenCalledWith('1');
  });
});
