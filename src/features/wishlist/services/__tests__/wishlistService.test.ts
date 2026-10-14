import { api } from '@/services/api';
import { wishlistService } from '../wishlistService';

jest.mock('@/services/api', () => ({ api: { get: jest.fn(), post: jest.fn(), delete: jest.fn() } }));

describe('wishlistService', () => {
  it('reads saved products, newest first', async () => {
    jest.mocked(api.get).mockResolvedValue([]);

    await expect(wishlistService.getItems()).resolves.toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/rest/v1/wishlist_items', {
      params: {
        select: 'product:products(id,name,price,currency,image_path,base_colour,stock,category:categories(name))',
        order: 'created_at.desc',
      },
    });
  });

  it('adds a product, ignoring one that is already saved', async () => {
    await wishlistService.add('7');

    expect(api.post).toHaveBeenCalledWith(
      '/rest/v1/wishlist_items',
      { product_id: 7 },
      { params: { on_conflict: 'user_id,product_id' }, headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' } }
    );
  });

  it('removes a product', async () => {
    await wishlistService.remove('7');

    expect(api.delete).toHaveBeenCalledWith('/rest/v1/wishlist_items', { params: { product_id: 'eq.7' } });
  });
});
