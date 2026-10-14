import * as wishlist from '..';

describe('wishlist feature public API', () => {
  it('exposes the screen, query hooks and keys', () => {
    expect(Object.keys(wishlist).sort()).toEqual([
      'WishlistScreen',
      'useAddToWishlist',
      'useMoveToWishlist',
      'useRemoveFromWishlist',
      'useWishlist',
      'wishlistKeys',
    ]);
  });

  it('keeps services and the ACL private', () => {
    expect(wishlist).not.toHaveProperty('wishlistService');
    expect(wishlist).not.toHaveProperty('toWishlistItems');
  });
});
