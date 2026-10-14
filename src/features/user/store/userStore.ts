import { create } from 'zustand';

interface UserState {
  currentUserId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (userId: string, accessToken: string, refreshToken: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  signOut: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUserId: null,
  accessToken: null,
  refreshToken: null,
  signIn: (currentUserId, accessToken, refreshToken) => set({ currentUserId, accessToken, refreshToken }),
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  signOut: () => set({ currentUserId: null, accessToken: null, refreshToken: null }),
}));
