import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { lightColors } from '@/theme';
import Button from '../Button';

describe('Button', () => {
  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(<Button title="Save" onPress={onPress} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Save' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('uses a white background with dark text for the inverse variant', async () => {
    await render(<Button title="Shop Now" variant="inverse" />);

    expect(screen.getByRole('button', { name: 'Shop Now' })).toHaveStyle({ backgroundColor: lightColors.onMedia });
    expect(screen.getByText('Shop Now')).toHaveStyle({ color: lightColors.chrome });
  });

  it('shows a spinner and ignores presses while loading', async () => {
    const onPress = jest.fn();
    await render(<Button title="Save" loading onPress={onPress} />);

    await fireEvent.press(screen.getByRole('button'));

    expect(screen.queryByText('Save')).toBeNull();
    expect(onPress).not.toHaveBeenCalled();
  });
});
