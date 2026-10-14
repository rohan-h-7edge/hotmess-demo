import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import CartItemCard from '../CartItemCard';

const renderCard = (props: Partial<React.ComponentProps<typeof CartItemCard>> = {}) => {
  const handlers = { onQuantityChange: jest.fn(), onRemove: jest.fn(), onMoveToWishlist: jest.fn() };
  return render(
    <CartItemCard
      name="Velvet Vogue Shirt"
      typeName="Shirts"
      colour="Blue"
      imageUrl="https://img/1.jpg"
      priceLabel="₹2,580"
      quantity={2}
      maxQuantity={10}
      inStock
      {...handlers}
      {...props}
    />
  ).then(() => handlers);
};

describe('CartItemCard', () => {
  it('shows the product, price and stock status', async () => {
    await renderCard();

    for (const text of ['Velvet Vogue Shirt', 'Shirts', 'Color: Blue', '₹2,580', 'IN STOCK']) {
      expect(screen.getByText(text)).toBeOnTheScreen();
    }
  });

  it('marks an out of stock item', async () => {
    await renderCard({ inStock: false });

    expect(screen.getByText('OUT OF STOCK')).toBeOnTheScreen();
  });

  it('reports remove and move to wishlist', async () => {
    const { onRemove, onMoveToWishlist } = await renderCard();

    await fireEvent.press(screen.getByRole('button', { name: 'Remove' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Move to Wishlist' }));

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onMoveToWishlist).toHaveBeenCalledTimes(1);
  });
});
