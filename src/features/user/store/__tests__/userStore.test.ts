import * as SecureStore from 'expo-secure-store';
import { SESSION_STORAGE_KEY, useUserStore } from '../userStore';

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

  it('saves the session to the secure store, without the restore flag', async () => {
    useUserStore.getState().signIn('u-1', 'a1', 'r1');

    const saved = JSON.parse((await SecureStore.getItemAsync(SESSION_STORAGE_KEY)) ?? '{}');

    expect(saved.state).toEqual({ currentUserId: 'u-1', accessToken: 'a1', refreshToken: 'r1' });
  });

  it('restores a saved session after a restart', async () => {
    useUserStore.setState({ currentUserId: null, accessToken: null, refreshToken: null, hasRestoredSession: false });
    await new Promise((resolve) => setTimeout(resolve, 0));
    await SecureStore.setItemAsync(
      SESSION_STORAGE_KEY,
      JSON.stringify({ state: { currentUserId: 'u-2', accessToken: 'a2', refreshToken: 'r2' }, version: 0 })
    );

    await useUserStore.persist.rehydrate();

    expect(useUserStore.getState()).toMatchObject({
      currentUserId: 'u-2',
      accessToken: 'a2',
      refreshToken: 'r2',
      hasRestoredSession: true,
    });
  });

  it('clears the saved session on sign out', async () => {
    useUserStore.getState().signIn('u-1', 'a1', 'r1');
    useUserStore.getState().signOut();

    const saved = JSON.parse((await SecureStore.getItemAsync(SESSION_STORAGE_KEY)) ?? '{}');

    expect(saved.state).toEqual({ currentUserId: null, accessToken: null, refreshToken: null });
  });
});
