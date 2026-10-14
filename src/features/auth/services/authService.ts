import { api } from '@/services/api';
import {
  toAuthSession,
  toAuthTokens,
  toPasswordGrantRequest,
  toRefreshTokenGrantRequest,
  toRegisteredUser,
  toSignUpRequest,
} from '../acl/authMapper';
import type { AuthSession, AuthTokens, LoginInput, RegisteredUser, RegisterInput } from '../types/auth.types';

const tokenGrant = (grantType: 'password' | 'refresh_token') => ({
  params: { grant_type: grantType },
  skipAuthRefresh: true,
});

export const authService = {
  login: async (input: LoginInput): Promise<AuthSession> =>
    toAuthSession(await api.post('/auth/v1/token', toPasswordGrantRequest(input), tokenGrant('password'))),

  refresh: async (refreshToken: string): Promise<AuthTokens> =>
    toAuthTokens(
      await api.post('/auth/v1/token', toRefreshTokenGrantRequest(refreshToken), tokenGrant('refresh_token'))
    ),

  logout: async (): Promise<void> => {
    await api.post('/auth/v1/logout', undefined, { params: { scope: 'local' }, skipAuthRefresh: true });
  },

  register: async (input: RegisterInput): Promise<RegisteredUser> =>
    toRegisteredUser(await api.post('/auth/v1/signup', toSignUpRequest(input), { skipAuthRefresh: true })),
};
