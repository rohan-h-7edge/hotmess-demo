import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import EmptyCart from '../EmptyCart';

describe('EmptyCart', () => {
  it('explains the empty cart and starts shopping', async () => {
    const onShopNow = jest.fn();
    await render(<EmptyCart onShopNow={onShopNow} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Shop Now' }));

    expect(screen.getByText('Your cart is empty !')).toBeOnTheScreen();
    expect(onShopNow).toHaveBeenCalledTimes(1);
  });
});
