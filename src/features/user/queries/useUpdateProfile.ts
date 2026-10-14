import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { useUserStore } from '../store/userStore';
import type { UpdateProfileInput } from '../types/user.types';
import { userKeys } from './userKeys';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.currentUserId) ?? '';

  return useMutation({
    mutationFn: (input: UpdateProfileInput) => userService.updateProfile(input),
    onSuccess: (profile) => queryClient.setQueryData(userKeys.profile(userId), profile),
  });
};
