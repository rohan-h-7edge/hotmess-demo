import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import NewInSection from '../NewInSection';

const product = {
  id: '1',
  name: 'Glow Satin Kimono',
  gender: 'women' as const,
  categoryId: '1',
  categoryName: 'Tops',
  colour: 'Red',
  price: 999,
  currency: 'INR',
  imageUrl: 'https://img/1.jpg',
  inStock: true
};

describe('NewInSection', () => {
  it('shows the heading and the products', async () => {
    await render(<NewInSection products={[product]} isLoading={false} onRetry={jest.fn()} onViewAll={jest.fn()} />);

    expect(screen.getByRole('header', { name: 'New In' })).toBeOnTheScreen();
    expect(screen.getByText('Check Out the Freshest Additions to Our Collection!')).toBeOnTheScreen();
    expect(screen.getByText('Glow Satin Kimono')).toBeOnTheScreen();
  });

  it('shows the error and retries', async () => {
    const onRetry = jest.fn();
    await render(<NewInSection
        products={[]}
        isLoading={false}
        errorMessage="Network error"
        onRetry={onRetry}
        onViewAll={jest.fn()}
      />);

    await fireEvent.press(screen.getByRole('button', { name: 'Retry' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Network error');
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('hides the list while loading', async () => {
    await render(<NewInSection products={[product]} isLoading onRetry={jest.fn()} onViewAll={jest.fn()} />);

    expect(screen.queryByText('Glow Satin Kimono')).not.toBeOnTheScreen();
  });

  it('opens the full list from View All', async () => {
    const onViewAll = jest.fn();
    await render(<NewInSection products={[]} isLoading={false} onRetry={jest.fn()} onViewAll={onViewAll} />);

    await fireEvent.press(screen.getByRole('link', { name: 'View All' }));

    expect(onViewAll).toHaveBeenCalledTimes(1);
  });
});
