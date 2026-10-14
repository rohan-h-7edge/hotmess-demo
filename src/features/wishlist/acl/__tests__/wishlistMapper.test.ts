import { toAddWishlistItemRequest, toWishlistItems } from '../wishlistMapper';

describe('wishlistMapper', () => {
  it('maps saved rows with their product to wishlist items', () => {
    const [item] = toWishlistItems([
      {
        product: {
          id: 15970,
          name: 'Navy Shirt',
          price: 1299,
          currency: 'INR',
          image_path: '15970.jpg',
          base_colour: null,
          stock: 3,
          category: { name: 'Shirts' },
        },
      },
    ]);

    expect(item).toEqual({
      productId: '15970',
      name: 'Navy Shirt',
      typeName: 'Shirts',
      colour: null,
      price: 1299,
      currency: 'INR',
      imageUrl: expect.stringMatching(/\/product-images\/15970\.jpg$/),
      inStock: true,
    });
  });

  it('builds the add body with backend names', () => {
    expect(toAddWishlistItemRequest('15970')).toEqual({ product_id: 15970 });
  });
});
