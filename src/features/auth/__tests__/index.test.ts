import * as auth from '..';

describe('auth feature public API', () => {
  it('exposes screens, mutations, session refresh and form schemas', () => {
    expect(Object.keys(auth).sort()).toEqual([
      'LoginSchema',
      'LoginScreen',
      'RegisterSchema',
      'RegisterScreen',
      'refreshSession',
      'useLogin',
      'useLogout',
      'useRegister',
    ]);
  });

  it('keeps services and the ACL private', () => {
    expect(auth).not.toHaveProperty('authService');
    expect(auth).not.toHaveProperty('toAuthSession');
  });
});
