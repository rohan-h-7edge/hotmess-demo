export type ProductGender = 'men' | 'women' | 'boys' | 'girls' | 'unisex';

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  gender: ProductGender;
  categoryId: string;
  price: number;
  currency: string;
  imageUrl: string;
}

export interface ProductFilter {
  genders?: ProductGender[];
  categorySlug?: string;
  season?: Season;
  limit: number;
}
