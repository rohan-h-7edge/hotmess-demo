import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useProductPages } from '../../queries/useProductPages';
import NewInScreen from '../NewInScreen';

jest.mock('../../queries/useProductPages', () => ({ useProductPages: jest.fn() }));

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

describe('NewInScreen', () => {
  it('shows the header, the products with formatted prices and the filter button', async () => {
    jest.mocked(useProductPages).mockReturnValue(pages({ data: [product('1'), product('2')], hasNextPage: true }));

    await render(<NewInScreen />);

    expect(screen.getByRole('header', { name: 'New In' })).toBeOnTheScreen();
    expect(screen.getByText('Shirt 1')).toBeOnTheScreen();
    expect(screen.getAllByText('₹1,290')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Filter' })).toBeOnTheScreen();
    expect(screen.queryByText("You've reached the end")).not.toBeOnTheScreen();
  });

  it('loads the next page at the end of the list', async () => {
    const result = pages({ data: [product('1')], hasNextPage: true });
    jest.mocked(useProductPages).mockReturnValue(result);
    await render(<NewInScreen />);

    await fireEvent(screen.getByTestId('new-in-list'), 'endReached');

    expect(result.fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('does not load more after the last page and says so', async () => {
    const result = pages({ data: [product('1')], hasNextPage: false });
    jest.mocked(useProductPages).mockReturnValue(result);
    await render(<NewInScreen />);

    await fireEvent(screen.getByTestId('new-in-list'), 'endReached');

    expect(result.fetchNextPage).not.toHaveBeenCalled();
    expect(screen.getByText("You've reached the end")).toBeOnTheScreen();
  });

  it('shows the error and retries', async () => {
    const result = pages({ data: undefined, error: new Error('Network error') });
    jest.mocked(useProductPages).mockReturnValue(result);
    await render(<NewInScreen />);

    await fireEvent.press(screen.getByRole('button', { name: 'Retry' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Network error');
    expect(result.refetch).toHaveBeenCalledTimes(1);
  });
});
