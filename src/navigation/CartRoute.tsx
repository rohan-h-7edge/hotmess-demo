import React from 'react';
import { CartScreen } from '@/features/cart';
import { useMoveToWishlist } from '@/features/wishlist';
import type { RootStackScreenProps } from './types';

// Connects cart and wishlist here so neither feature imports the other in both directions.
export default function CartRoute(props: RootStackScreenProps<'Cart'>) {
  const moveToWishlist = useMoveToWishlist();

  return <CartScreen {...props} onMoveToWishlist={moveToWishlist} />;
}
