import type { ProductFilter } from '../types/catalog.types';

export const catalogKeys = {
  all: ['catalog'] as const,
  topCategories: () => [...catalogKeys.all, 'categories', 'top'] as const,
  products: (filter: ProductFilter) => [...catalogKeys.all, 'products', filter] as const,
};
