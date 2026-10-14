import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useProductPages } from '../../queries/useProductPages';
import type { HomeStackScreenProps } from '@/navigation/types';
import type { CollectionKey } from '../../config/collections';
import ProductListScreen from '../ProductListScreen';

jest.mock('../../queries/useProductPages', () => ({ useProductPages: jest.fn() }));

const mockAddToCart = { mutate: jest.fn(), isPending: false, variables: undefined };
const mockAddToWishlist = { mutate: jest.fn() };
const mockRemoveFromWishlist = { mutate: jest.fn() };
jest.mock('@/features/wishlist', () => ({
  useWishlist: () => ({ data: [{ productId: '2' }] }),
  useAddToWishlist: () => mockAddToWishlist,
  useRemoveFromWishlist: () => mockRemoveFromWishlist,
}));
jest.mock('@/features/cart', () => ({
  useCart: () => ({ data: [{ productId: '2', quantity: 3 }] }),
  useAddToCart: () => mockAddToCart,
}));

const product = (id: string) => ({
  id,
  name: `Shirt ${id}`,
  gender: 'women' as const,
  categoryId: '1',
  categoryName: 'Shirts',
  colour: 'Blue',
  price: 1290,
  currency: 'INR',
  imageUrl: `https://img/${id}.jpg`,
  inStock: true
});

const pages = (overrides: object) =>
  ({
    data: undefined,
    isPending: false,
    error: null,
    hasNextPage: false,
    isFetchingNextPage: false,
    isRefetching: false,
    fetchNextPage: jest.fn(),
    refetch: jest.fn(),
    ...overrides,
  }) as unknown as ReturnType<typeof useProductPages>;

const renderList = (collection: CollectionKey = 'newIn') => {
  const props = {
    navigation: {},
    route: { key: 'ProductList', name: 'ProductList', params: { collection } },
  } as unknown as HomeStackScreenProps<'ProductList'>;
  return render(<ProductListScreen {...props} />);
};

describe('ProductListScreen', () => {
  it('shows the header, the products with formatted prices and the filter button', async () => {
    jest.mocked(useProductPages).mockReturnValue(pages({ data: [product('1'), product('2')], hasNextPage: true }));

    await renderList();

    expect(screen.getByRole('header', { name: 'New In' })).toBeOnTheScreen();
    expect(screen.getByText('Shirt 1')).toBeOnTheScreen();
    expect(screen.getAllByText('₹1,290')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Filter' })).toBeOnTheScreen();
    expect(screen.queryByText("You've reached the end")).not.toBeOnTheScreen();
  });

  it('loads the next page at the end of the list', async () => {
    const result = pages({ data: [product('1')], hasNextPage: true });
    jest.mocked(useProductPages).mockReturnValue(result);
    await renderList();

    await fireEvent(screen.getByTestId('product-list'), 'endReached');

    expect(result.fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('does not load more after the last page and says so', async () => {
    const result = pages({ data: [product('1')], hasNextPage: false });
    jest.mocked(useProductPages).mockReturnValue(result);
    await renderList();

    await fireEvent(screen.getByTestId('product-list'), 'endReached');

    expect(result.fetchNextPage).not.toHaveBeenCalled();
    expect(screen.getByText("You've reached the end")).toBeOnTheScreen();
  });

  it('shows the error and retries', async () => {
    const result = pages({ data: undefined, error: new Error('Network error') });
    jest.mocked(useProductPages).mockReturnValue(result);
    await renderList();

    await fireEvent.press(screen.getByRole('button', { name: 'Retry' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Network error');
    expect(result.refetch).toHaveBeenCalledTimes(1);
  });

  it('adds to the cart and shows what is already in it', async () => {
    jest.mocked(useProductPages).mockReturnValue(pages({ data: [product('1'), product('2')] }));
    await renderList();

    await fireEvent.press(screen.getByRole('button', { name: 'Add to Cart' }));

    expect(mockAddToCart.mutate).toHaveBeenCalledWith('1');
    expect(screen.getByRole('button', { name: 'In Cart (3)' })).toBeOnTheScreen();
  });

  it('saves and unsaves products with the heart', async () => {
    jest.mocked(useProductPages).mockReturnValue(pages({ data: [product('1'), product('2')] }));
    await renderList();

    await fireEvent.press(screen.getByRole('button', { name: 'Add to wishlist' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Remove from wishlist' }));

    expect(mockAddToWishlist.mutate).toHaveBeenCalledWith(expect.objectContaining({ productId: '1', typeName: 'Shirts' }));
    expect(mockRemoveFromWishlist.mutate).toHaveBeenCalledWith('2');
  });

  it('loads the collection it was opened for, with its own heading', async () => {
    jest.mocked(useProductPages).mockReturnValue(pages({ data: [] }));
    await renderList('winter');

    expect(useProductPages).toHaveBeenLastCalledWith({ season: 'winter', categorySlug: 'apparel' });
    expect(screen.getByRole('header', { name: 'Winter Collection' })).toBeOnTheScreen();
  });
});
