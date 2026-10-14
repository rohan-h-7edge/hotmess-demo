import { api } from '@/services/api';
import { catalogService } from '../catalogService';

jest.mock('@/services/api', () => ({ api: { get: jest.fn() } }));

describe('catalogService', () => {
  it('fetches the top-level categories in order', async () => {
    jest.mocked(api.get).mockResolvedValue([{ id: 1, slug: 'apparel', name: 'Apparel' }]);

    await expect(catalogService.getTopCategories()).resolves.toEqual([{ id: '1', slug: 'apparel', name: 'Apparel' }]);
    expect(api.get).toHaveBeenCalledWith('/rest/v1/categories', {
      params: { select: 'id,slug,name', parent_id: 'is.null', order: 'sort_order.asc' },
    });
  });

  it('fetches products with the filter turned into query params', async () => {
    jest.mocked(api.get).mockResolvedValue([]);

    await expect(catalogService.getProducts({ genders: ['women'], limit: 10 })).resolves.toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/rest/v1/products', {
      params: {
        select:
          'id,name,gender,category_id,price,currency,image_path,base_colour,category:categories!inner(slug,name)',
        order: 'year.desc.nullslast,id.desc',
        limit: 10,
        gender: 'in.(women)',
      },
    });
  });
});
