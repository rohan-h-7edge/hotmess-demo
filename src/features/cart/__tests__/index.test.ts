import * as cart from '..';

describe('cart feature public API', () => {
  it('exposes the screen, query hooks and keys', () => {
    expect(Object.keys(cart).sort()).toEqual(['CartScreen', 'cartKeys', 'useAddToCart', 'useCart']);
  });

  it('keeps services and the ACL private', () => {
    expect(cart).not.toHaveProperty('cartService');
    expect(cart).not.toHaveProperty('toCartItems');
  });
});
