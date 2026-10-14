import { api } from '@/services/api';
import { authService } from '../authService';

jest.mock('@/services/api', () => ({ api: { post: jest.fn() } }));

const noRefresh = { skipAuthRefresh: true };

describe('authService', () => {
  it('logs in and maps the session', async () => {
    jest.mocked(api.post).mockResolvedValue({ id: 1, accessToken: 'a1', refreshToken: 'r1' });

    await expect(authService.login({ username: 'emilys', password: 'p' })).resolves.toEqual({
      userId: '1',
      accessToken: 'a1',
      refreshToken: 'r1',
    });
    expect(api.post).toHaveBeenCalledWith('/auth/login', { username: 'emilys', password: 'p' }, noRefresh);
  });

  it('refreshes the tokens', async () => {
    jest.mocked(api.post).mockResolvedValue({ accessToken: 'a2', refreshToken: 'r2' });

    await expect(authService.refresh('r1')).resolves.toEqual({ accessToken: 'a2', refreshToken: 'r2' });
    expect(api.post).toHaveBeenCalledWith('/auth/refresh', { refreshToken: 'r1' }, noRefresh);
  });

  it('registers a user', async () => {
    const input = { firstName: 'Ana', lastName: 'Ray', email: 'a@x.co', username: 'anaray', password: 'secret123' };
    jest.mocked(api.post).mockResolvedValue({ id: 209, username: 'anaray' });

    await expect(authService.register(input)).resolves.toEqual({ id: '209', username: 'anaray' });
    expect(api.post).toHaveBeenCalledWith('/users/add', input, noRefresh);
  });
});
