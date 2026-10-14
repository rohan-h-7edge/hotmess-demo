import React from 'react';
import { render, screen } from '@testing-library/react-native';
import WishlistScreen from '../WishlistScreen';

describe('WishlistScreen', () => {
  it('shows the title and a coming soon note', async () => {
    await render(<WishlistScreen />);

    expect(screen.getByText('Wishlist')).toBeOnTheScreen();
    expect(screen.getByText('Coming soon.')).toBeOnTheScreen();
  });
});
