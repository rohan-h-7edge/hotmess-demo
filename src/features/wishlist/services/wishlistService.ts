import { api } from '@/services/api';
import { WISHLIST_COLUMNS } from '../acl/wishlist.dto';
import { toAddWishlistItemRequest, toWishlistItems } from '../acl/wishlistMapper';
import type { WishlistItem } from '../types/wishlist.types';

export const wishlistService = {
  getItems: async (): Promise<WishlistItem[]> =>
    toWishlistItems(
      await api.get('/rest/v1/wishlist_items', { params: { select: WISHLIST_COLUMNS, order: 'created_at.desc' } })
    ),

  add: async (productId: string): Promise<void> => {
    await api.post('/rest/v1/wishlist_items', toAddWishlistItemRequest(productId), {
      params: { on_conflict: 'user_id,product_id' },
      headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
    });
  },

  remove: async (productId: string): Promise<void> => {
    await api.delete('/rest/v1/wishlist_items', { params: { product_id: `eq.${productId}` } });
  },
};
