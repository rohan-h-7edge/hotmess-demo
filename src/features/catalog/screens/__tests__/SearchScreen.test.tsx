import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import type { RootStackScreenProps } from '@/navigation/types';
import { useProductPages } from '../../queries/useProductPages';
import SearchScreen from '../SearchScreen';

jest.mock('../../queries/useProductPages', () => ({ useProductPages: jest.fn() }));
jest.mock('../../hooks/useProductCardActions', () => ({
  useProductCardActions: () => ({
    cartQuantity: () => 0,
    isAddingToCart: () => false,
    addToCart: jest.fn(),
    isWishlisted: () => false,
    toggleWishlist: jest.fn(),
  }),
}));

const product = {
  id: '1',
  name: 'Wildcraft Men Blue Rain Jacket',
  gender: 'men' as const,
  categoryId: '1',
  categoryName: 'Rain Jacket',
  colour: 'Blue',
  price: 1299,
  currency: 'INR',
  imageUrl: 'https://img/1.jpg',
  inStock: true,
};

const pages = (overrides: object = {}) =>
  ({
    data: undefined,
    isPending: false,
    error: null,
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: jest.fn(),
    refetch: jest.fn(),
    ...overrides,
  }) as unknown as ReturnType<typeof useProductPages>;

const renderSearch = async () => {
  const navigation = { goBack: jest.fn() };
  const props = { navigation, route: { key: 'Search', name: 'Search' } } as unknown as RootStackScreenProps<'Search'>;
  await render(<SearchScreen {...props} />);
  return navigation;
};

const typeAndWait = async (text: string) => {
  await fireEvent.changeText(screen.getByPlaceholderText('Search products'), text);
  await act(async () => {
    jest.advanceTimersByTime(300);
  });
};

describe('SearchScreen', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('shows popular searches before typing and searches a tapped one', async () => {
    jest.mocked(useProductPages).mockReturnValue(pages());
    await renderSearch();

    expect(useProductPages).toHaveBeenLastCalledWith({ search: '' }, 20, false);
    await fireEvent.press(screen.getByRole('button', { name: 'Jackets' }));
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(useProductPages).toHaveBeenLastCalledWith({ search: 'jacket' }, 20, true);
  });

  it('shows matching products once typing pauses', async () => {
    jest.mocked(useProductPages).mockReturnValue(pages({ data: [product] }));
    await renderSearch();

    await typeAndWait('  blue jacket ');

    expect(useProductPages).toHaveBeenLastCalledWith({ search: 'blue jacket' }, 20, true);
    expect(screen.getByText('Wildcraft Men Blue Rain Jacket')).toBeOnTheScreen();
    expect(screen.getByText('₹1,299')).toBeOnTheScreen();
  });

  it('says when nothing matches', async () => {
    jest.mocked(useProductPages).mockReturnValue(pages({ data: [] }));
    await renderSearch();

    await typeAndWait('zzz');

    expect(screen.getByText('No results for “zzz”')).toBeOnTheScreen();
  });

  it('goes back', async () => {
    jest.mocked(useProductPages).mockReturnValue(pages());
    const navigation = await renderSearch();

    await fireEvent.press(screen.getByRole('button', { name: 'Back' }));

    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });
});
