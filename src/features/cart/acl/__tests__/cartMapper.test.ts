import { toCartItems, toUpsertCartItemRequest } from '../cartMapper';

describe('cartMapper', () => {
  it('maps cart rows with their product to cart items', () => {
    const [item] = toCartItems([
      {
        quantity: 2,
        product: {
          id: 15970,
          name: 'Navy Shirt',
          price: '1299.00',
          currency: 'INR',
          image_path: '15970.jpg',
          base_colour: 'Navy Blue',
          stock: 0,
          category: { name: 'Shirts' },
        },
      },
    ]);

    expect(item).toEqual({
      productId: '15970',
      name: 'Navy Shirt',
      typeName: 'Shirts',
      colour: 'Navy Blue',
      price: 1299,
      currency: 'INR',
      imageUrl: expect.stringMatching(/\/storage\/v1\/object\/public\/product-images\/15970\.jpg$/),
      quantity: 2,
      inStock: false,
    });
  });

  it('builds the upsert body with backend names', () => {
    expect(toUpsertCartItemRequest({ productId: '15970', quantity: 3 })).toEqual({ product_id: 15970, quantity: 3 });
  });

  it('rejects rows without a product', () => {
    expect(() => toCartItems([{ quantity: 1 }])).toThrow();
  });
});
