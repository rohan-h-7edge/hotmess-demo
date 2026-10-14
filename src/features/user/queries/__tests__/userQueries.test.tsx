import { act, renderHook, waitFor } from '@testing-library/react-native';
import { createQueryWrapper, createTestQueryClient } from '@/test-utils/renderWithProviders';
import { userService } from '../../services/userService';
import { useUserStore } from '../../store/userStore';
import { useUpdateProfile } from '../useUpdateProfile';
import { useUserProfile } from '../useUserProfile';
import { userKeys } from '../userKeys';

jest.mock('../../services/userService', () => ({
  userService: { getProfile: jest.fn(), updateProfile: jest.fn() },
}));

const profile = { id: 'u-1', email: 'ana@x.co', firstName: 'Ana', lastName: 'Ray', username: 'anaray' };

describe('user queries', () => {
  afterEach(() => useUserStore.getState().signOut());

  it('builds profile keys under the users key', () => {
    expect(userKeys.profile('u-1')).toEqual(['users', 'profile', 'u-1']);
  });

  it('loads the signed-in user', async () => {
    useUserStore.getState().signIn('u-1', 'a1', 'r1');
    jest.mocked(userService.getProfile).mockResolvedValue(profile);
    const { result } = await renderHook(() => useUserProfile(), { wrapper: createQueryWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(profile));
  });

  it('does not fetch while signed out', async () => {
    jest.mocked(userService.getProfile).mockClear();
    const { result } = await renderHook(() => useUserProfile(), { wrapper: createQueryWrapper() });

    expect(result.current.fetchStatus).toBe('idle');
    expect(userService.getProfile).not.toHaveBeenCalled();
  });

  it('writes the updated profile to the cache', async () => {
    useUserStore.getState().signIn('u-1', 'a1', 'r1');
    jest.mocked(userService.updateProfile).mockResolvedValue(profile);
    const queryClient = createTestQueryClient();
    const { result } = await renderHook(() => useUpdateProfile(), { wrapper: createQueryWrapper(queryClient) });

    await act(async () => {
      await result.current.mutateAsync({ firstName: 'Ana', lastName: 'Ray', username: 'anaray' });
    });

    expect(queryClient.getQueryData(userKeys.profile('u-1'))).toEqual(profile);
  });
});
