import { useUserStore } from '@/features/user';
import { authService } from '../../services/authService';
import { refreshSession } from '../refreshSession';

jest.mock('../../services/authService', () => ({ authService: { refresh: jest.fn() } }));

describe('refreshSession', () => {
  afterEach(() => {
    useUserStore.getState().signOut();
    jest.clearAllMocks();
  });

  it('stores and returns the new access token', async () => {
    useUserStore.getState().signIn('1', 'a1', 'r1');
    jest.mocked(authService.refresh).mockResolvedValue({ accessToken: 'a2', refreshToken: 'r2' });

    await expect(refreshSession()).resolves.toBe('a2');
    expect(authService.refresh).toHaveBeenCalledWith('r1');
    expect(useUserStore.getState()).toMatchObject({ currentUserId: '1', accessToken: 'a2', refreshToken: 'r2' });
  });

  it('does nothing without a refresh token', async () => {
    await expect(refreshSession()).resolves.toBeNull();
    expect(authService.refresh).not.toHaveBeenCalled();
  });
});
