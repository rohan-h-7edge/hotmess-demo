import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistService } from '../services/wishlistService';
import type { WishlistItem } from '../types/wishlist.types';
import { wishlistKeys } from './wishlistKeys';

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => wishlistService.remove(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: wishlistKeys.items() });
      const previous = queryClient.getQueryData<WishlistItem[]>(wishlistKeys.items());
      queryClient.setQueryData<WishlistItem[]>(wishlistKeys.items(), (items) =>
        items?.filter((item) => item.productId !== productId)
      );
      return { previous };
    },
    onError: (_error, _productId, context) => queryClient.setQueryData(wishlistKeys.items(), context?.previous),
    onSettled: () => queryClient.invalidateQueries({ queryKey: wishlistKeys.items() }),
  });
};
