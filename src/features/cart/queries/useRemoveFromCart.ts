import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../services/cartService';
import type { CartItem } from '../types/cart.types';
import { cartKeys } from './cartKeys';

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => cartService.removeItem(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: cartKeys.items() });
      const previous = queryClient.getQueryData<CartItem[]>(cartKeys.items());
      queryClient.setQueryData<CartItem[]>(cartKeys.items(), (items) =>
        items?.filter((item) => item.productId !== productId)
      );
      return { previous };
    },
    onError: (_error, _productId, context) => queryClient.setQueryData(cartKeys.items(), context?.previous),
    onSettled: () => queryClient.invalidateQueries({ queryKey: cartKeys.items() }),
  });
};
