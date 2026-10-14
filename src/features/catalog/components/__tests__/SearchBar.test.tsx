import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('reports typing, clearing and going back', async () => {
    const onChangeText = jest.fn();
    const onBackPress = jest.fn();
    await render(<SearchBar value="jack" onChangeText={onChangeText} onBackPress={onBackPress} />);

    await fireEvent.changeText(screen.getByPlaceholderText('Search products'), 'jacket');
    await fireEvent.press(screen.getByRole('button', { name: 'Clear search' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Back' }));

    expect(onChangeText.mock.calls).toEqual([['jacket'], ['']]);
    expect(onBackPress).toHaveBeenCalledTimes(1);
  });

  it('hides the clear button when empty', async () => {
    await render(<SearchBar value="" onChangeText={jest.fn()} onBackPress={jest.fn()} />);

    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeOnTheScreen();
  });
});
