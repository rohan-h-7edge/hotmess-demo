import { renderHook } from '@testing-library/react-native';
import { useProductCardActions } from '../useProductCardActions';

const mockAddToCart = { mutate: jest.fn(), isPending: true, variables: '2' };
const mockAddToWishlist = { mutate: jest.fn() };
const mockRemoveFromWishlist = { mutate: jest.fn() };
jest.mock('@/features/cart', () => ({
  useCart: () => ({ data: [{ productId: '1', quantity: 3 }] }),
  useAddToCart: () => mockAddToCart,
}));
jest.mock('@/features/wishlist', () => ({
  useWishlist: () => ({ data: [{ productId: '1' }] }),
  useAddToWishlist: () => mockAddToWishlist,
  useRemoveFromWishlist: () => mockRemoveFromWishlist,
}));

const product = (id: string) => ({
  id,
  name: 'Shirt',
  gender: 'men' as const,
  categoryId: '1',
  categoryName: 'Shirts',
  colour: 'Blue',
  price: 999,
  currency: 'INR',
  imageUrl: 'https://img/1.jpg',
  inStock: true,
});

describe('useProductCardActions', () => {
  it('reports cart and wishlist state per product', async () => {
    const { result } = await renderHook(() => useProductCardActions());

    expect(result.current.cartQuantity('1')).toBe(3);
    expect(result.current.cartQuantity('9')).toBe(0);
    expect(result.current.isAddingToCart('2')).toBe(true);
    expect(result.current.isWishlisted('1')).toBe(true);
  });

  it('adds to the cart and toggles the wishlist', async () => {
    const { result } = await renderHook(() => useProductCardActions());

    result.current.addToCart('2');
    result.current.toggleWishlist(product('1'));
    result.current.toggleWishlist(product('2'));

    expect(mockAddToCart.mutate).toHaveBeenCalledWith('2');
    expect(mockRemoveFromWishlist.mutate).toHaveBeenCalledWith('1');
    expect(mockAddToWishlist.mutate).toHaveBeenCalledWith(expect.objectContaining({ productId: '2', typeName: 'Shirts' }));
  });
});
