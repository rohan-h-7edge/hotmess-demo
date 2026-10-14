import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import AppHeader from '../AppHeader';

describe('AppHeader', () => {
  it('shows the logo and reports search and bag presses', async () => {
    const onSearchPress = jest.fn();
    const onBagPress = jest.fn();
    await render(<AppHeader onSearchPress={onSearchPress} onBagPress={onBagPress} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Search' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Shopping bag' }));

    expect(screen.getByRole('header', { name: 'Hotmess' })).toBeOnTheScreen();
    expect(onSearchPress).toHaveBeenCalledTimes(1);
    expect(onBagPress).toHaveBeenCalledTimes(1);
  });

  it('shows a back button only when it can go back', async () => {
    const onBackPress = jest.fn();
    await render(<AppHeader onBackPress={onBackPress} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Back' }));

    expect(onBackPress).toHaveBeenCalledTimes(1);
  });

  it('has no back button by default', async () => {
    await render(<AppHeader />);

    expect(screen.queryByRole('button', { name: 'Back' })).not.toBeOnTheScreen();
  });
});
