import { z } from 'zod';
import { env } from '@/config/env';
import type { Category, Product, ProductFilter, Season } from '../types/catalog.types';
import {
  CategoryDtoSchema,
  NEWEST_FIRST,
  PRODUCT_COLUMNS,
  PRODUCT_COLUMNS_WITH_CATEGORY,
  ProductDtoSchema,
  ProductQueryParamsDto,
} from './catalog.dto';

const PRODUCT_IMAGE_BUCKET = 'product-images';

const SEASON_VALUES: Record<Season, string> = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
};

export const toProductImageUrl = (imagePath: string, baseUrl = env.EXPO_PUBLIC_API_URL) =>
  `${baseUrl}/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/${imagePath}`;

export const toCategories = (raw: unknown): Category[] =>
  z
    .array(CategoryDtoSchema)
    .parse(raw)
    .map((dto) => ({ id: String(dto.id), slug: dto.slug, name: dto.name }));

export const toProducts = (raw: unknown): Product[] =>
  z
    .array(ProductDtoSchema)
    .parse(raw)
    .map((dto) => ({
      id: String(dto.id),
      name: dto.name,
      gender: dto.gender,
      categoryId: String(dto.category_id),
      price: dto.price,
      currency: dto.currency,
      imageUrl: toProductImageUrl(dto.image_path),
    }));

// A category slug matches itself and everything below it, e.g. "apparel" also matches "apparel-topwear-shirts".
export const toProductQueryParams = (filter: ProductFilter): ProductQueryParamsDto => ({
  select: filter.categorySlug ? PRODUCT_COLUMNS_WITH_CATEGORY : PRODUCT_COLUMNS,
  order: NEWEST_FIRST,
  limit: filter.limit,
  ...(filter.genders?.length ? { gender: `in.(${filter.genders.join(',')})` } : {}),
  ...(filter.season ? { season: `eq.${SEASON_VALUES[filter.season]}` } : {}),
  ...(filter.categorySlug
    ? { 'category.or': `(slug.eq.${filter.categorySlug},slug.like.${filter.categorySlug}-*)` }
    : {}),
});
