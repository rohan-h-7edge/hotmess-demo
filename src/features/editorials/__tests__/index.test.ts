import * as editorials from '..';

describe('editorials feature public API', () => {
  it('exposes the screen', () => {
    expect(Object.keys(editorials)).toEqual(['EditorialsScreen']);
  });
});
