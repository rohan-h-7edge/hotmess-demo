import { z } from 'zod';

export const WishlistItemDtoSchema = z.object({
  product: z.object({
    id: z.number(),
    name: z.string(),
    price: z.coerce.number(),
    currency: z.string(),
    image_path: z.string(),
    base_colour: z.string().nullable(),
    stock: z.number(),
    category: z.object({ name: z.string() }),
  }),
});

export const WISHLIST_COLUMNS =
  'product:products(id,name,price,currency,image_path,base_colour,stock,category:categories(name))';

export interface AddWishlistItemRequestDto {
  product_id: number;
}
