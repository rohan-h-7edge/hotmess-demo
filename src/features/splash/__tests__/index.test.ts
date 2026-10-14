import * as splash from '..';

describe('splash feature public API', () => {
  it('exposes the screen', () => {
    expect(Object.keys(splash)).toEqual(['SplashScreen']);
  });
});
