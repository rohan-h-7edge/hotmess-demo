import React from 'react';
import { render, screen } from '@testing-library/react-native';
import CollectionTile from '../CollectionTile';

describe('CollectionTile', () => {
  it('shows the label with and without an image', async () => {
    await render(<CollectionTile label="Women" imageUrl="https://img/1.jpg" />);
    expect(screen.getByText('Women')).toBeOnTheScreen();

    await render(<CollectionTile label="Kids" />);
    expect(screen.getByText('Kids')).toBeOnTheScreen();
  });
});
