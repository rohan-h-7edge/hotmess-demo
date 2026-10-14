import { act, renderHook, waitFor } from '@testing-library/react-native';
import { createQueryWrapper, createTestQueryClient } from '@/test-utils/renderWithProviders';
import { cartService } from '../../services/cartService';
import { cartKeys } from '../cartKeys';
import { useAddToCart } from '../useAddToCart';
import { useCart } from '../useCart';
import { useRemoveFromCart } from '../useRemoveFromCart';
import { useUpdateCartQuantity } from '../useUpdateCartQuantity';

jest.mock('../../services/cartService', () => ({
  cartService: { getItems: jest.fn(), setQuantity: jest.fn(), removeItem: jest.fn() },
}));

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

describe('cart queries', () => {
  beforeEach(() => jest.clearAllMocks());

  it('builds keys under the cart key', () => {
    expect(cartKeys.items()).toEqual(['cart', 'items']);
  });

  it('loads the cart', async () => {
    jest.mocked(cartService.getItems).mockResolvedValue([item]);
    const { result } = await renderHook(() => useCart(), { wrapper: createQueryWrapper() });

    await waitFor(() => expect(result.current.data).toEqual([item]));
  });

  it('adds one more of a product already in the cart', async () => {
    jest.mocked(cartService.getItems).mockResolvedValue([item]);
    jest.mocked(cartService.setQuantity).mockResolvedValue();
    const { result } = await renderHook(() => useAddToCart(), { wrapper: createQueryWrapper() });

    await act(async () => {
      await result.current.mutateAsync('1');
    });

    expect(cartService.setQuantity).toHaveBeenCalledWith({ productId: '1', quantity: 3 });
  });

  it('adds a new product with quantity 1 and never goes above 10', async () => {
    jest.mocked(cartService.getItems).mockResolvedValue([{ ...item, productId: '2', quantity: 10 }]);
    jest.mocked(cartService.setQuantity).mockResolvedValue();
    const { result } = await renderHook(() => useAddToCart(), { wrapper: createQueryWrapper() });

    await act(async () => {
      await result.current.mutateAsync('1');
      await result.current.mutateAsync('2');
    });

    expect(jest.mocked(cartService.setQuantity).mock.calls).toEqual([
      [{ productId: '1', quantity: 1 }],
      [{ productId: '2', quantity: 10 }],
    ]);
  });

  it('updates a quantity straight away and rolls back if saving fails', async () => {
    const queryClient = createTestQueryClient();
    queryClient.setQueryData(cartKeys.items(), [item]);
    jest.mocked(cartService.getItems).mockResolvedValue([item]);
    let rejectSave: (error: Error) => void = () => undefined;
    jest.mocked(cartService.setQuantity).mockReturnValue(new Promise((_, reject) => (rejectSave = reject)));
    const { result } = await renderHook(() => useUpdateCartQuantity(), { wrapper: createQueryWrapper(queryClient) });

    await act(async () => {
      result.current.mutate({ productId: '1', quantity: 5 });
    });
    await waitFor(() => expect(queryClient.getQueryData(cartKeys.items())).toEqual([{ ...item, quantity: 5 }]));

    await act(async () => {
      rejectSave(new Error('offline'));
    });
    await waitFor(() => expect(queryClient.getQueryData(cartKeys.items())).toEqual([item]));
  });

  it('removes an item straight away', async () => {
    const queryClient = createTestQueryClient();
    queryClient.setQueryData(cartKeys.items(), [item]);
    jest.mocked(cartService.removeItem).mockReturnValue(new Promise(() => undefined));
    const { result } = await renderHook(() => useRemoveFromCart(), { wrapper: createQueryWrapper(queryClient) });

    await act(async () => {
      result.current.mutate('1');
    });

    await waitFor(() => expect(queryClient.getQueryData(cartKeys.items())).toEqual([]));
  });
});
