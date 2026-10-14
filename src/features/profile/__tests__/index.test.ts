import * as profile from '..';

describe('profile feature public API', () => {
  it('exposes the screens', () => {
    expect(Object.keys(profile).sort()).toEqual(['EditProfileScreen', 'ProfileScreen']);
  });
});
