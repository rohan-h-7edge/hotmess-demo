import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import PromoBanner from '../PromoBanner';

describe('PromoBanner', () => {
  it('shows the copy and reports a press on the call to action', async () => {
    const onPress = jest.fn();
    await render(
      <PromoBanner
        title="Winter Collection"
        tagline="Buy 1 Get 1"
        ctaLabel="Shop Now"
        imageUrl="https://img/1.jpg"
        onPress={onPress}
      />
    );

    await fireEvent.press(screen.getByRole('button', { name: 'Shop Now' }));

    expect(screen.getByText('Winter Collection')).toBeOnTheScreen();
    expect(screen.getByText('Buy 1 Get 1')).toBeOnTheScreen();
    expect(onPress).toHaveBeenCalledTimes(1);

    await fireEvent.press(screen.getByRole('button', { name: 'Winter Collection' }));
    expect(onPress).toHaveBeenCalledTimes(2);
  });
});
