import * as SecureStore from 'expo-secure-store';
import { secureStorage } from '../secureStorage';

describe('secureStorage', () => {
  it('reads, writes and removes values in the secure store', async () => {
    await secureStorage.setItem('session', 'value');
    expect(await secureStorage.getItem('session')).toBe('value');

    await secureStorage.removeItem('session');
    expect(await secureStorage.getItem('session')).toBeNull();
  });

  it('treats storage failures as no saved session instead of crashing', async () => {
    jest.mocked(SecureStore.setItemAsync).mockRejectedValueOnce(new Error('value too large'));
    jest.mocked(SecureStore.getItemAsync).mockRejectedValueOnce(new Error('keystore unavailable'));

    await expect(secureStorage.setItem('session', 'value')).resolves.toBeUndefined();
    await expect(secureStorage.getItem('session')).resolves.toBeNull();
  });
});
