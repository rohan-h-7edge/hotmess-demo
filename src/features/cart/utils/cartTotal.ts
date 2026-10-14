import type { CartItem } from '../types/cart.types';

// Out-of-stock items stay in the cart but cannot be bought, so they don't count.
export const cartTotal = (items: CartItem[]) =>
  items.filter((item) => item.inStock).reduce((total, item) => total + item.price * item.quantity, 0);
