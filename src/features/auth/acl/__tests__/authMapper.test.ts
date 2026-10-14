import {
  toAuthSession,
  toAuthTokens,
  toPasswordGrantRequest,
  toRefreshTokenGrantRequest,
  toRegisteredUser,
  toSignUpRequest,
} from '../authMapper';

const sessionDto = {
  access_token: 'a1',
  refresh_token: 'r1',
  token_type: 'bearer',
  expires_in: 3600,
  user: { id: 'u-1', email: 'ana@x.co' },
};

describe('authMapper', () => {
  it('maps a token response to a session', () => {
    expect(toAuthSession(sessionDto)).toEqual({ userId: 'u-1', accessToken: 'a1', refreshToken: 'r1' });
  });

  it('maps a refresh response to tokens', () => {
    expect(toAuthTokens(sessionDto)).toEqual({ accessToken: 'a1', refreshToken: 'r1' });
  });

  it('maps a signup that is signed in straight away', () => {
    expect(toRegisteredUser(sessionDto)).toEqual({ id: 'u-1', email: 'ana@x.co', needsEmailConfirmation: false });
  });

  it('maps a signup that still needs email confirmation', () => {
    expect(toRegisteredUser({ id: 'u-1', email: 'ana@x.co', confirmation_sent_at: '2026-10-14' })).toEqual({
      id: 'u-1',
      email: 'ana@x.co',
      needsEmailConfirmation: true,
    });
  });

  it('builds the request bodies with backend names', () => {
    expect(toPasswordGrantRequest({ email: 'ana@x.co', password: 'p' })).toEqual({ email: 'ana@x.co', password: 'p' });
    expect(toRefreshTokenGrantRequest('r1')).toEqual({ refresh_token: 'r1' });
    expect(
      toSignUpRequest({ firstName: 'Ana', lastName: 'Ray', email: 'ana@x.co', username: 'anaray', password: 'secret123' })
    ).toEqual({
      email: 'ana@x.co',
      password: 'secret123',
      data: { first_name: 'Ana', last_name: 'Ray', username: 'anaray' },
    });
  });

  it('rejects a token response without tokens', () => {
    expect(() => toAuthSession({ user: { id: 'u-1', email: 'ana@x.co' } })).toThrow();
  });
});
