import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../services/cartService';
import { MAX_CART_QUANTITY } from '../types/cart.types';
import { cartKeys } from './cartKeys';
import { cartItemsQuery } from './useCart';

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // The upsert sets an absolute quantity, so read the current one first.
    mutationFn: async (productId: string) => {
      const items = await queryClient.ensureQueryData(cartItemsQuery);
      const current = items.find((item) => item.productId === productId)?.quantity ?? 0;
      await cartService.setQuantity({ productId, quantity: Math.min(current + 1, MAX_CART_QUANTITY) });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: cartKeys.items() }),
  });
};
