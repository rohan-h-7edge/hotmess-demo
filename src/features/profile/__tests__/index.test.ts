import * as profile from '..';

describe('profile feature public API', () => {
  it('exposes the screen', () => {
    expect(Object.keys(profile)).toEqual(['ProfileScreen']);
  });
});
