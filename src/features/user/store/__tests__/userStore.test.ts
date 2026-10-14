import { useUserStore } from '../userStore';

describe('userStore', () => {
  it('signs in and out', () => {
    useUserStore.getState().signIn('1', 't1', 'r1');
    expect(useUserStore.getState()).toMatchObject({ currentUserId: '1', accessToken: 't1', refreshToken: 'r1' });

    useUserStore.getState().signOut();
    expect(useUserStore.getState()).toMatchObject({ currentUserId: null, accessToken: null, refreshToken: null });
  });

  it('replaces the tokens after a refresh and keeps the user', () => {
    useUserStore.getState().signIn('1', 't1', 'r1');

    useUserStore.getState().setTokens('t2', 'r2');

    expect(useUserStore.getState()).toMatchObject({ currentUserId: '1', accessToken: 't2', refreshToken: 'r2' });
  });
});
