import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/features/user';
import { authService } from '../services/authService';
import type { LoginInput } from '../types/auth.types';

export const useLogin = () => {
  const signIn = useUserStore((state) => state.signIn);

  return useMutation({
    mutationFn: (input: LoginInput) => authService.login(input),
    onSuccess: (session) => signIn(session.userId, session.accessToken, session.refreshToken),
  });
};
