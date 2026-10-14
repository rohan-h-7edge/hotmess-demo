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
  base_colour: z.string().nullable(),
  stock: z.number(),
  category: z.object({ name: z.string() }),
});

export const CATEGORY_COLUMNS = 'id,slug,name';
// The inner-joined category supplies its name and lets products be filtered by its slug.
export const PRODUCT_COLUMNS =
  'id,name,gender,category_id,price,currency,image_path,base_colour,stock,category:categories!inner(slug,name)';
export const NEWEST_FIRST = 'year.desc.nullslast,id.desc';

export type ProductQueryParamsDto = Record<string, string | number>;
