import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import EmptyWishlist from '../EmptyWishlist';

describe('EmptyWishlist', () => {
  it('explains how to save products and starts shopping', async () => {
    const onShopNow = jest.fn();
    await render(<EmptyWishlist onShopNow={onShopNow} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Shop Now' }));

    expect(screen.getByText('Your wishlist is empty')).toBeOnTheScreen();
    expect(onShopNow).toHaveBeenCalledTimes(1);
  });
});
