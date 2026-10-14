import { api } from '@/services/api';
import { CATEGORY_COLUMNS } from '../acl/catalog.dto';
import { toCategories, toProductQueryParams, toProducts } from '../acl/catalogMapper';
import type { Category, Product, ProductFilter } from '../types/catalog.types';

export const catalogService = {
  getTopCategories: async (): Promise<Category[]> =>
    toCategories(
      await api.get('/rest/v1/categories', {
        params: { select: CATEGORY_COLUMNS, parent_id: 'is.null', order: 'sort_order.asc' },
      })
    ),

  getProducts: async (filter: ProductFilter): Promise<Product[]> =>
    toProducts(await api.get('/rest/v1/products', { params: toProductQueryParams(filter) })),
};
