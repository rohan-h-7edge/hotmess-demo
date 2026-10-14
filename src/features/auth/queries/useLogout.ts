import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/features/user';
import { authService } from '../services/authService';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const signOut = useUserStore((state) => state.signOut);

  return useMutation({
    mutationFn: () => authService.logout(),
    // Sign out locally even when the server call fails, e.g. offline or an already expired token.
    onSettled: () => {
      signOut();
      queryClient.clear();
    },
  });
};
