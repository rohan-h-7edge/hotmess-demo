import { z } from 'zod';
import { PRODUCT_IMAGE_BUCKET, publicStorageUrl } from '@/utils/storageUrl';
import type { WishlistItem } from '../types/wishlist.types';
import { AddWishlistItemRequestDto, WishlistItemDtoSchema } from './wishlist.dto';

export const toWishlistItems = (raw: unknown): WishlistItem[] =>
  z
    .array(WishlistItemDtoSchema)
    .parse(raw)
    .map(({ product }) => ({
      productId: String(product.id),
      name: product.name,
      typeName: product.category.name,
      colour: product.base_colour,
      price: product.price,
      currency: product.currency,
      imageUrl: publicStorageUrl(PRODUCT_IMAGE_BUCKET, product.image_path),
      inStock: product.stock > 0,
    }));

export const toAddWishlistItemRequest = (productId: string): AddWishlistItemRequestDto => ({
  product_id: Number(productId),
});
