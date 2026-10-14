import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import ProductGridCard from '../ProductGridCard';

const renderCard = (props: Partial<React.ComponentProps<typeof ProductGridCard>> = {}) =>
  render(
    <ProductGridCard
      name="Velvet Vogue Shirt"
      typeName="Shirts"
      colour="Blue"
      priceLabel="₹1,290"
      imageUrl="https://img/1.jpg"
      inStock
      cartQuantity={0}
      isAddingToCart={false}
      {...props}
    />
  );

describe('ProductGridCard', () => {
  it('shows the product details and price', async () => {
    await renderCard();

    for (const text of ['Velvet Vogue Shirt', 'Shirts', 'Color: Blue', '₹1,290']) {
      expect(screen.getByText(text)).toBeOnTheScreen();
    }
  });

  it('hides the colour line when there is none', async () => {
    await renderCard({ colour: null });

    expect(screen.queryByText(/Color:/)).not.toBeOnTheScreen();
  });

  it('reports wishlist and add to cart presses', async () => {
    const onWishlistPress = jest.fn();
    const onAddToCartPress = jest.fn();
    await renderCard({ onWishlistPress, onAddToCartPress });

    await fireEvent.press(screen.getByRole('button', { name: 'Add to wishlist' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Add to Cart' }));

    expect(onWishlistPress).toHaveBeenCalledTimes(1);
    expect(onAddToCartPress).toHaveBeenCalledTimes(1);
  });

  it('shows how many are already in the cart', async () => {
    await renderCard({ cartQuantity: 2 });

    expect(screen.getByRole('button', { name: 'In Cart (2)' })).toBeOnTheScreen();
  });

  it('cannot be added when out of stock', async () => {
    await renderCard({ inStock: false });

    expect(screen.getByRole('button', { name: 'Out of Stock' })).toBeDisabled();
  });
});
