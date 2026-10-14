import * as catalog from '..';

describe('catalog feature public API', () => {
  it('exposes the screen, query hooks and keys', () => {
    expect(Object.keys(catalog).sort()).toEqual([
      'NewInScreen',
      'catalogKeys',
      'useProductPages',
      'useProducts',
      'useTopCategories',
    ]);
  });

  it('keeps services and the ACL private', () => {
    expect(catalog).not.toHaveProperty('catalogService');
    expect(catalog).not.toHaveProperty('toProducts');
  });
});
