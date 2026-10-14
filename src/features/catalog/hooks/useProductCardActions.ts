import { useAddToCart, useCart } from '@/features/cart';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/features/wishlist';
import type { Product } from '../types/catalog.types';

export const useProductCardActions = () => {
  const cart = useCart();
  const addToCart = useAddToCart();
  const wishlist = useWishlist();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const cartQuantities = new Map(cart.data?.map((item) => [item.productId, item.quantity]));
  const wishlistedIds = new Set(wishlist.data?.map((item) => item.productId));

  const toggleWishlist = (product: Product) => {
    if (wishlistedIds.has(product.id)) {
      removeFromWishlist.mutate(product.id);
      return;
    }
    addToWishlist.mutate({
      productId: product.id,
      name: product.name,
      typeName: product.categoryName,
      colour: product.colour,
      price: product.price,
      currency: product.currency,
      imageUrl: product.imageUrl,
      inStock: product.inStock,
    });
  };

  return {
    cartQuantity: (productId: string) => cartQuantities.get(productId) ?? 0,
    isAddingToCart: (productId: string) => addToCart.isPending && addToCart.variables === productId,
    addToCart: (productId: string) => addToCart.mutate(productId),
    isWishlisted: (productId: string) => wishlistedIds.has(productId),
    toggleWishlist,
  };
};
