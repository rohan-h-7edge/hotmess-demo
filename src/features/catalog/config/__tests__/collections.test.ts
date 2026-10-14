import { COLLECTIONS } from '../collections';

describe('COLLECTIONS', () => {
  it('defines a product query for every collection the app links to', () => {
    expect(Object.keys(COLLECTIONS).sort()).toEqual(['kids', 'living', 'newIn', 'winter', 'women']);
    expect(COLLECTIONS.kids).toEqual({ genders: ['boys', 'girls'] });
  });
});
