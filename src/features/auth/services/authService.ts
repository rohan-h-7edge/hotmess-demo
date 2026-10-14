import { api } from '@/services/api';
import { toAddUserRequest, toAuthSession, toAuthTokens, toLoginRequest, toRefreshRequest, toRegisteredUser } from '../acl/authMapper';
import type { AuthSession, AuthTokens, LoginInput, RegisteredUser, RegisterInput } from '../types/auth.types';

const noRefresh = { skipAuthRefresh: true };

export const authService = {
  login: async (input: LoginInput): Promise<AuthSession> =>
    toAuthSession(await api.post('/auth/login', toLoginRequest(input), noRefresh)),

  refresh: async (refreshToken: string): Promise<AuthTokens> =>
    toAuthTokens(await api.post('/auth/refresh', toRefreshRequest(refreshToken), noRefresh)),

  register: async (input: RegisterInput): Promise<RegisteredUser> =>
    toRegisteredUser(await api.post('/users/add', toAddUserRequest(input), noRefresh)),
};
