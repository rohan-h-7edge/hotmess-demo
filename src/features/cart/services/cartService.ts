import { api } from '@/services/api';
import { CART_COLUMNS } from '../acl/cart.dto';
import { toCartItems, toUpsertCartItemRequest } from '../acl/cartMapper';
import type { CartItem, CartQuantityChange } from '../types/cart.types';

export const cartService = {
  getItems: async (): Promise<CartItem[]> =>
    toCartItems(await api.get('/rest/v1/cart_items', { params: { select: CART_COLUMNS, order: 'created_at.asc' } })),

  setQuantity: async (change: CartQuantityChange): Promise<void> => {
    await api.post('/rest/v1/cart_items', toUpsertCartItemRequest(change), {
      params: { on_conflict: 'user_id,product_id' },
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    });
  },

  removeItem: async (productId: string): Promise<void> => {
    await api.delete('/rest/v1/cart_items', { params: { product_id: `eq.${productId}` } });
  },
};
