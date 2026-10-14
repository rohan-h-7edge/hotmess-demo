import type { ProductFilter, ProductQuery } from '../types/catalog.types';

export const catalogKeys = {
  all: ['catalog'] as const,
  topCategories: () => [...catalogKeys.all, 'categories', 'top'] as const,
  products: (filter: ProductFilter) => [...catalogKeys.all, 'products', filter] as const,
  productPages: (query: ProductQuery, pageSize: number) =>
    [...catalogKeys.all, 'products', 'pages', query, pageSize] as const,
};
