import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  it('shows the product name', async () => {
    await render(<ProductCard name="Glow Satin Kimono" imageUrl="https://img/1.jpg" />);

    expect(screen.getByText('Glow Satin Kimono')).toBeOnTheScreen();
  });
});
