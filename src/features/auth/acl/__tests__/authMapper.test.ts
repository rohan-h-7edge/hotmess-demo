import {
  toAddUserRequest,
  toAuthSession,
  toAuthTokens,
  toLoginRequest,
  toRefreshRequest,
  toRegisteredUser,
} from '../authMapper';

describe('authMapper', () => {
  it('maps the login response to a session', () => {
    const raw = { id: 1, username: 'emilys', email: 'e@x.co', accessToken: 'a1', refreshToken: 'r1' };

    expect(toAuthSession(raw)).toEqual({ userId: '1', accessToken: 'a1', refreshToken: 'r1' });
  });

  it('maps the refresh response to tokens', () => {
    expect(toAuthTokens({ accessToken: 'a2', refreshToken: 'r2' })).toEqual({ accessToken: 'a2', refreshToken: 'r2' });
  });

  it('maps the created user', () => {
    expect(toRegisteredUser({ id: 209, username: 'anaray', firstName: 'Ana' })).toEqual({ id: '209', username: 'anaray' });
  });

  it('builds the request bodies', () => {
    expect(toLoginRequest({ username: 'emilys', password: 'p' })).toEqual({ username: 'emilys', password: 'p' });
    expect(toRefreshRequest('r1')).toEqual({ refreshToken: 'r1' });
    const register = { firstName: 'Ana', lastName: 'Ray', email: 'a@x.co', username: 'anaray', password: 'secret123' };
    expect(toAddUserRequest(register)).toEqual(register);
  });

  it('rejects a login response without tokens', () => {
    expect(() => toAuthSession({ id: 1, username: 'emilys' })).toThrow();
  });
});
