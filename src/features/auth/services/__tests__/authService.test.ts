import { api } from '@/services/api';
import { authService } from '../authService';

jest.mock('@/services/api', () => ({ api: { post: jest.fn() } }));

const sessionDto = { access_token: 'a1', refresh_token: 'r1', user: { id: 'u-1', email: 'ana@x.co' } };

describe('authService', () => {
  it('logs in with the password grant', async () => {
    jest.mocked(api.post).mockResolvedValue(sessionDto);

    await expect(authService.login({ email: 'ana@x.co', password: 'p' })).resolves.toEqual({
      userId: 'u-1',
      accessToken: 'a1',
      refreshToken: 'r1',
    });
    expect(api.post).toHaveBeenCalledWith(
      '/auth/v1/token',
      { email: 'ana@x.co', password: 'p' },
      { params: { grant_type: 'password' }, skipAuthRefresh: true }
    );
  });

  it('refreshes with the refresh token grant', async () => {
    jest.mocked(api.post).mockResolvedValue({ ...sessionDto, access_token: 'a2', refresh_token: 'r2' });

    await expect(authService.refresh('r1')).resolves.toEqual({ accessToken: 'a2', refreshToken: 'r2' });
    expect(api.post).toHaveBeenCalledWith(
      '/auth/v1/token',
      { refresh_token: 'r1' },
      { params: { grant_type: 'refresh_token' }, skipAuthRefresh: true }
    );
  });

  it('logs out of this device', async () => {
    jest.mocked(api.post).mockResolvedValue(undefined);

    await expect(authService.logout()).resolves.toBeUndefined();
    expect(api.post).toHaveBeenCalledWith('/auth/v1/logout', undefined, {
      params: { scope: 'local' },
      skipAuthRefresh: true,
    });
  });

  it('signs up a user', async () => {
    const input = { firstName: 'Ana', lastName: 'Ray', email: 'ana@x.co', username: 'anaray', password: 'secret123' };
    jest.mocked(api.post).mockResolvedValue({ id: 'u-1', email: 'ana@x.co' });

    await expect(authService.register(input)).resolves.toEqual({
      id: 'u-1',
      email: 'ana@x.co',
      needsEmailConfirmation: true,
    });
    expect(api.post).toHaveBeenCalledWith(
      '/auth/v1/signup',
      { email: 'ana@x.co', password: 'secret123', data: { first_name: 'Ana', last_name: 'Ray', username: 'anaray' } },
      { skipAuthRefresh: true }
    );
  });
});
