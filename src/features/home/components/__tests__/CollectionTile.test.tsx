import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import CollectionTile from '../CollectionTile';

describe('CollectionTile', () => {
  it('shows the label with and without an image', async () => {
    await render(<CollectionTile label="Women" imageUrl="https://img/1.jpg" onPress={jest.fn()} />);
    expect(screen.getByText('Women')).toBeOnTheScreen();

    await render(<CollectionTile label="Kids" onPress={jest.fn()} />);
    expect(screen.getByText('Kids')).toBeOnTheScreen();
  });

  it('opens the collection when pressed', async () => {
    const onPress = jest.fn();
    await render(<CollectionTile label="Living" onPress={onPress} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Living' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
