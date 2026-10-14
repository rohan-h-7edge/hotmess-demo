import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import PromoBanner from '../PromoBanner';

describe('PromoBanner', () => {
  it('shows the copy and reports a press on the call to action', async () => {
    const onCtaPress = jest.fn();
    await render(
      <PromoBanner
        title="Winter Collection"
        tagline="Buy 1 Get 1"
        ctaLabel="Shop Now"
        imageUrl="https://img/1.jpg"
        onCtaPress={onCtaPress}
      />
    );

    await fireEvent.press(screen.getByRole('button', { name: 'Shop Now' }));

    expect(screen.getByText('Winter Collection')).toBeOnTheScreen();
    expect(screen.getByText('Buy 1 Get 1')).toBeOnTheScreen();
    expect(onCtaPress).toHaveBeenCalledTimes(1);
  });
});
