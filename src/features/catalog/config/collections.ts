import type { ProductQuery } from '../types/catalog.types';

export const COLLECTIONS = {
  newIn: { categorySlug: 'apparel' },
  women: { genders: ['women'], categorySlug: 'apparel' },
  kids: { genders: ['boys', 'girls'] },
  living: { categorySlug: 'home' },
  winter: { season: 'winter', categorySlug: 'apparel' },
} satisfies Record<string, ProductQuery>;

export type CollectionKey = keyof typeof COLLECTIONS;
