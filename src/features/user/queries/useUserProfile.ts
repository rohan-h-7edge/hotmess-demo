import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { useUserStore } from '../store/userStore';
import { userKeys } from './userKeys';

export const useUserProfile = () => {
  const userId = useUserStore((state) => state.currentUserId) ?? '';

  return useQuery({
    queryKey: userKeys.profile(userId),
    queryFn: userService.getProfile,
    enabled: Boolean(userId),
  });
};
