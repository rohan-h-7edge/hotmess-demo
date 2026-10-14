import * as SecureStore from 'expo-secure-store';
import type { StateStorage } from 'zustand/middleware';

// A failed write (some iOS versions reject large values) only means the session isn't kept across restarts.
export const secureStorage: StateStorage = {
  getItem: (name) => SecureStore.getItemAsync(name).catch(() => null),
  setItem: (name, value) => SecureStore.setItemAsync(name, value).catch(() => undefined),
  removeItem: (name) => SecureStore.deleteItemAsync(name).catch(() => undefined),
};
