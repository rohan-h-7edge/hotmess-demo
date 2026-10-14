import { useUserStore } from '@/features/user';
import { authService } from '../services/authService';

export const refreshSession = async (): Promise<string | null> => {
  const { refreshToken, setTokens } = useUserStore.getState();
  if (!refreshToken) return null;

  const tokens = await authService.refresh(refreshToken);
  setTokens(tokens.accessToken, tokens.refreshToken);
  return tokens.accessToken;
};
