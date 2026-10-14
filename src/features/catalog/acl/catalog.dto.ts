import { z } from 'zod';

export const CategoryDtoSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
});

export const ProductDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  gender: z.enum(['men', 'women', 'boys', 'girls', 'unisex']),
  category_id: z.number(),
  price: z.coerce.number(),
  currency: z.string(),
  image_path: z.string(),
});

export const CATEGORY_COLUMNS = 'id,slug,name';
export const PRODUCT_COLUMNS = 'id,name,gender,category_id,price,currency,image_path';
// Inner-joins the category so products can be filtered by its slug.
export const PRODUCT_COLUMNS_WITH_CATEGORY = `${PRODUCT_COLUMNS},category:categories!inner(slug)`;
export const NEWEST_FIRST = 'year.desc.nullslast,id.desc';

export type ProductQueryParamsDto = Record<string, string | number>;
