import { z } from 'zod';

export const CartItemDtoSchema = z.object({
  quantity: z.number(),
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

export const CART_COLUMNS =
  'quantity,product:products(id,name,price,currency,image_path,base_colour,stock,category:categories(name))';

export interface UpsertCartItemRequestDto {
  product_id: number;
  quantity: number;
}
