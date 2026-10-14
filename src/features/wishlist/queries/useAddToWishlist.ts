import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistService } from '../services/wishlistService';
import type { WishlistItem } from '../types/wishlist.types';
import { wishlistKeys } from './wishlistKeys';

// Takes the whole item so the heart and the Wishlist tab update before the server answers.
export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: WishlistItem) => wishlistService.add(item.productId),
    onMutate: async (item) => {
      await queryClient.cancelQueries({ queryKey: wishlistKeys.items() });
      const previous = queryClient.getQueryData<WishlistItem[]>(wishlistKeys.items());
      queryClient.setQueryData<WishlistItem[]>(wishlistKeys.items(), (items = []) =>
        items.some((saved) => saved.productId === item.productId) ? items : [item, ...items]
      );
      return { previous };
    },
    onError: (_error, _item, context) => queryClient.setQueryData(wishlistKeys.items(), context?.previous),
    onSettled: () => queryClient.invalidateQueries({ queryKey: wishlistKeys.items() }),
  });
};
