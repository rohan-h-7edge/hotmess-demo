import { act, renderHook, waitFor } from '@testing-library/react-native';
import { createQueryWrapper, createTestQueryClient } from '@/test-utils/renderWithProviders';
import { wishlistService } from '../../services/wishlistService';
import { useAddToWishlist } from '../useAddToWishlist';
import { useRemoveFromWishlist } from '../useRemoveFromWishlist';
import { useWishlist } from '../useWishlist';
import { wishlistKeys } from '../wishlistKeys';

jest.mock('../../services/wishlistService', () => ({
  wishlistService: { getItems: jest.fn(), add: jest.fn(), remove: jest.fn() },
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

describe('wishlist queries', () => {
  beforeEach(() => jest.clearAllMocks());

  it('builds keys under the wishlist key', () => {
    expect(wishlistKeys.items()).toEqual(['wishlist', 'items']);
  });

  it('loads the wishlist', async () => {
    jest.mocked(wishlistService.getItems).mockResolvedValue([item]);
    const { result } = await renderHook(() => useWishlist(), { wrapper: createQueryWrapper() });

    await waitFor(() => expect(result.current.data).toEqual([item]));
  });

  it('shows an added item straight away and rolls back if saving fails', async () => {
    const queryClient = createTestQueryClient();
    queryClient.setQueryData(wishlistKeys.items(), []);
    jest.mocked(wishlistService.getItems).mockResolvedValue([]);
    let rejectSave: (error: Error) => void = () => undefined;
    jest.mocked(wishlistService.add).mockReturnValue(new Promise((_, reject) => (rejectSave = reject)));
    const { result } = await renderHook(() => useAddToWishlist(), { wrapper: createQueryWrapper(queryClient) });

    await act(async () => {
      result.current.mutate(item);
    });
    await waitFor(() => expect(queryClient.getQueryData(wishlistKeys.items())).toEqual([item]));
    expect(wishlistService.add).toHaveBeenCalledWith('1');

    await act(async () => {
      rejectSave(new Error('offline'));
    });
    await waitFor(() => expect(queryClient.getQueryData(wishlistKeys.items())).toEqual([]));
  });

  it('does not duplicate an item that is already saved', async () => {
    const queryClient = createTestQueryClient();
    queryClient.setQueryData(wishlistKeys.items(), [item]);
    jest.mocked(wishlistService.add).mockReturnValue(new Promise(() => undefined));
    const { result } = await renderHook(() => useAddToWishlist(), { wrapper: createQueryWrapper(queryClient) });

    await act(async () => {
      result.current.mutate(item);
    });

    expect(queryClient.getQueryData(wishlistKeys.items())).toEqual([item]);
  });

  it('removes an item straight away', async () => {
    const queryClient = createTestQueryClient();
    queryClient.setQueryData(wishlistKeys.items(), [item]);
    jest.mocked(wishlistService.remove).mockReturnValue(new Promise(() => undefined));
    const { result } = await renderHook(() => useRemoveFromWishlist(), { wrapper: createQueryWrapper(queryClient) });

    await act(async () => {
      result.current.mutate('1');
    });

    await waitFor(() => expect(queryClient.getQueryData(wishlistKeys.items())).toEqual([]));
  });
});
