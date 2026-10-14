import { act, renderHook } from '@testing-library/react-native';
import { useUserStore } from '@/features/user';
import { createQueryWrapper } from '@/test-utils/renderWithProviders';
import { authService } from '../../services/authService';
import { useLogin } from '../useLogin';
import { useRegister } from '../useRegister';

jest.mock('../../services/authService', () => ({ authService: { login: jest.fn(), register: jest.fn() } }));

describe('auth queries', () => {
  afterEach(() => useUserStore.getState().signOut());

  it('signs the user in after a successful login', async () => {
    jest.mocked(authService.login).mockResolvedValue({ userId: '1', accessToken: 'a1', refreshToken: 'r1' });
    const { result } = await renderHook(() => useLogin(), { wrapper: createQueryWrapper() });

    await act(async () => {
      await result.current.mutateAsync({ username: 'emilys', password: 'emilyspass' });
    });

    expect(useUserStore.getState()).toMatchObject({ currentUserId: '1', accessToken: 'a1', refreshToken: 'r1' });
  });

  it('returns the registered user', async () => {
    jest.mocked(authService.register).mockResolvedValue({ id: '209', username: 'anaray' });
    const { result } = await renderHook(() => useRegister(), { wrapper: createQueryWrapper() });
    const input = { firstName: 'Ana', lastName: 'Ray', email: 'a@x.co', username: 'anaray', password: 'secret123' };

    let user;
    await act(async () => {
      user = await result.current.mutateAsync(input);
    });

    expect(user).toEqual({ id: '209', username: 'anaray' });
    expect(useUserStore.getState().accessToken).toBeNull();
  });
});
