import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import Header from '../Header';

describe('Header', () => {
  it('shows the title without a back button by default', async () => {
    await render(<Header title="Profile" />);

    expect(screen.getByRole('header', { name: 'Profile' })).toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: 'Back' })).not.toBeOnTheScreen();
  });

  it('goes back', async () => {
    const onBackPress = jest.fn();
    await render(<Header title="Cart" onBackPress={onBackPress} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Back' }));

    expect(onBackPress).toHaveBeenCalledTimes(1);
  });
});
