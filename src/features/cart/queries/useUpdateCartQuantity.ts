import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../services/cartService';
import type { CartItem, CartQuantityChange } from '../types/cart.types';
import { cartKeys } from './cartKeys';

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (change: CartQuantityChange) => cartService.setQuantity(change),
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: cartKeys.items() });
      const previous = queryClient.getQueryData<CartItem[]>(cartKeys.items());
      queryClient.setQueryData<CartItem[]>(cartKeys.items(), (items) =>
        items?.map((item) => (item.productId === productId ? { ...item, quantity } : item))
      );
      return { previous };
    },
    onError: (_error, _change, context) => queryClient.setQueryData(cartKeys.items(), context?.previous),
    onSettled: () => queryClient.invalidateQueries({ queryKey: cartKeys.items() }),
  });
};
