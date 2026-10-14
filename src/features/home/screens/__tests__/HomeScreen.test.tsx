import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { HomeStackScreenProps } from '@/navigation/types';
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
        { id: '1', name: 'Glow Satin Kimono', gender: 'women', categoryId: '1',
  categoryName: 'Tops',
  colour: 'Red', price: 1, currency: 'INR', imageUrl: 'u' },
      ],
      isLoading: false,
      errorMessage: undefined,
      retry: jest.fn(),
    },
  }),
}));

const renderHome = async () => {
  const navigation = { navigate: jest.fn() };
  const props = { navigation, route: { key: 'HomeMain', name: 'HomeMain' } } as unknown as HomeStackScreenProps<'HomeMain'>;
  await render(<HomeScreen {...props} />);
  return navigation;
};

describe('HomeScreen', () => {
  it('shows the collections, the winter banner and new arrivals', async () => {
    await renderHome();

    for (const label of ['Women', 'Kids', 'Living', 'Winter Collection', 'Glow Satin Kimono']) {
      expect(screen.getByText(label)).toBeOnTheScreen();
    }
    expect(screen.getByRole('button', { name: 'Shop Now' })).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: 'New In' })).toBeOnTheScreen();
  });

  it('opens New In from View All', async () => {
    const navigation = await renderHome();

    await fireEvent.press(screen.getByRole('link', { name: 'View All' }));

    expect(navigation.navigate).toHaveBeenCalledWith('NewIn');
  });
});
