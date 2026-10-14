import { cartTotal } from '../cartTotal';

const item = {
  productId: '1',
  name: 'Velvet Vogue Shirt',
  typeName: 'Shirts',
  colour: 'Blue',
  price: 1290,
  currency: 'INR',
  imageUrl: 'https://img/1.jpg',
  quantity: 2,
  inStock: true,
};

describe('cartTotal', () => {
  it('adds price times quantity for items in stock only', () => {
    expect(cartTotal([item, { ...item, productId: '2', price: 500, quantity: 1, inStock: false }])).toBe(2580);
    expect(cartTotal([])).toBe(0);
  });
});
