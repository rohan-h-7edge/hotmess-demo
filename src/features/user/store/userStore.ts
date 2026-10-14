import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { secureStorage } from '@/services/secureStorage';

interface UserState {
  currentUserId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  hasRestoredSession: boolean;
  signIn: (userId: string, accessToken: string, refreshToken: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  signOut: () => void;
}

export const SESSION_STORAGE_KEY = 'hotmess.session';

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUserId: null,
      accessToken: null,
      refreshToken: null,
      hasRestoredSession: false,
      signIn: (currentUserId, accessToken, refreshToken) => set({ currentUserId, accessToken, refreshToken }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      signOut: () => set({ currentUserId: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: SESSION_STORAGE_KEY,
      storage: createJSONStorage(() => secureStorage),
      partialize: ({ currentUserId, accessToken, refreshToken }) => ({ currentUserId, accessToken, refreshToken }),
      onRehydrateStorage: () => () => useUserStore.setState({ hasRestoredSession: true }),
    }
  )
);
