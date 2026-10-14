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
  categoryName: string;
  colour: string | null;
  price: number;
  currency: string;
  imageUrl: string;
  inStock: boolean;
}

export interface ProductQuery {
  genders?: ProductGender[];
  categorySlug?: string;
  season?: Season;
}

export interface ProductFilter extends ProductQuery {
  limit: number;
  offset?: number;
}
