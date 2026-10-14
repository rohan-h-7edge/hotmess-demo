import * as wishlist from '..';

describe('wishlist feature public API', () => {
  it('exposes the screen', () => {
    expect(Object.keys(wishlist)).toEqual(['WishlistScreen']);
  });
});
