import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

jest.mock('../../hooks/useHomeCatalog', () => ({
  useHomeCatalog: () => ({
    collections: [
      { key: 'women', imageUrl: 'https://img/w.jpg' },
      { key: 'kids', imageUrl: undefined },
      { key: 'living', imageUrl: 'https://img/l.jpg' },
    ],
    bannerImageUrl: 'https://img/b.jpg',
    newIn: {
      products: [
        { id: '1', name: 'Glow Satin Kimono', gender: 'women', categoryId: '1', price: 1, currency: 'INR', imageUrl: 'u' },
      ],
      isLoading: false,
      errorMessage: undefined,
      retry: jest.fn(),
    },
  }),
}));

describe('HomeScreen', () => {
  it('shows the collections, the winter banner and new arrivals', async () => {
    await render(<HomeScreen />);

    for (const label of ['Women', 'Kids', 'Living', 'Winter Collection', 'Glow Satin Kimono']) {
      expect(screen.getByText(label)).toBeOnTheScreen();
    }
    expect(screen.getByRole('button', { name: 'Shop Now' })).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: 'New In' })).toBeOnTheScreen();
  });
});
