import { useUserStore } from '../store/userStore';

export const useAuth = () => {
  const currentUserId = useUserStore((state) => state.currentUserId);
  const accessToken = useUserStore((state) => state.accessToken);
  const signOut = useUserStore((state) => state.signOut);
  const hasRestoredSession = useUserStore((state) => state.hasRestoredSession);

  return {
    isAuthenticated: accessToken !== null,
    hasRestoredSession,
    currentUserId,
    signOut,
  };
};
