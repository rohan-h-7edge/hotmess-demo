import { api } from '@/services/api';
import { cartService } from '../cartService';

jest.mock('@/services/api', () => ({ api: { get: jest.fn(), post: jest.fn(), delete: jest.fn() } }));

describe('cartService', () => {
  it('reads the cart with each product, oldest first', async () => {
    jest.mocked(api.get).mockResolvedValue([]);

    await expect(cartService.getItems()).resolves.toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/rest/v1/cart_items', {
      params: {
        select:
          'quantity,product:products(id,name,price,currency,image_path,base_colour,stock,category:categories(name))',
        order: 'created_at.asc',
      },
    });
  });

  it('upserts a quantity', async () => {
    jest.mocked(api.post).mockResolvedValue(undefined);

    await cartService.setQuantity({ productId: '7', quantity: 2 });

    expect(api.post).toHaveBeenCalledWith(
      '/rest/v1/cart_items',
      { product_id: 7, quantity: 2 },
      { params: { on_conflict: 'user_id,product_id' }, headers: { Prefer: 'resolution=merge-duplicates,return=minimal' } }
    );
  });

  it('removes an item', async () => {
    jest.mocked(api.delete).mockResolvedValue(undefined);

    await cartService.removeItem('7');

    expect(api.delete).toHaveBeenCalledWith('/rest/v1/cart_items', { params: { product_id: 'eq.7' } });
  });
});
