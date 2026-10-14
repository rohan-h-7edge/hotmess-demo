import { useQuery } from '@tanstack/react-query';
import { wishlistService } from '../services/wishlistService';
import { wishlistKeys } from './wishlistKeys';

export const useWishlist = () =>
  useQuery({
    queryKey: wishlistKeys.items(),
    queryFn: wishlistService.getItems,
  });
