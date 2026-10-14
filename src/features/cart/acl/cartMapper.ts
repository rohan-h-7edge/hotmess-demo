import { z } from 'zod';
import { PRODUCT_IMAGE_BUCKET, publicStorageUrl } from '@/utils/storageUrl';
import type { CartItem, CartQuantityChange } from '../types/cart.types';
import { CartItemDtoSchema, UpsertCartItemRequestDto } from './cart.dto';

export const toCartItems = (raw: unknown): CartItem[] =>
  z
    .array(CartItemDtoSchema)
    .parse(raw)
    .map(({ quantity, product }) => ({
      productId: String(product.id),
      name: product.name,
      typeName: product.category.name,
      colour: product.base_colour,
      price: product.price,
      currency: product.currency,
      imageUrl: publicStorageUrl(PRODUCT_IMAGE_BUCKET, product.image_path),
      quantity,
      inStock: product.stock > 0,
    }));

export const toUpsertCartItemRequest = ({ productId, quantity }: CartQuantityChange): UpsertCartItemRequestDto => ({
  product_id: Number(productId),
  quantity,
});
