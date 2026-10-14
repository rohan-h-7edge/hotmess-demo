import { CartItem, useRemoveFromCart } from '@/features/cart';
import { useAddToWishlist } from '../queries/useAddToWishlist';

export const useMoveToWishlist = () => {
  const addToWishlist = useAddToWishlist();
  const removeFromCart = useRemoveFromCart();

  return ({ quantity: _quantity, ...item }: CartItem) =>
    addToWishlist.mutate(item, { onSuccess: () => removeFromCart.mutate(item.productId) });
};
