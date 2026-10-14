import { z } from 'zod';
import { PRODUCT_IMAGE_BUCKET, publicStorageUrl } from '@/utils/storageUrl';
import type { Category, Product, ProductFilter, Season } from '../types/catalog.types';
import {
  CategoryDtoSchema,
  NEWEST_FIRST,
  PRODUCT_COLUMNS,
  ProductDtoSchema,
  ProductQueryParamsDto,
} from './catalog.dto';

const SEASON_VALUES: Record<Season, string> = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
};

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
      categoryName: dto.category.name,
      colour: dto.base_colour,
      price: dto.price,
      currency: dto.currency,
      imageUrl: publicStorageUrl(PRODUCT_IMAGE_BUCKET, dto.image_path),
      inStock: dto.stock > 0,
    }));

// Each word must appear somewhere in the name; anything but letters, digits and hyphens is dropped
// because commas and parentheses are PostgREST syntax.
export const toSearchParams = (search: string | undefined): ProductQueryParamsDto => {
  const words = (search ?? '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 5);
  if (words.length === 0) return {};
  if (words.length === 1) return { name: `ilike.*${words[0]}*` };
  return { and: `(${words.map((word) => `name.ilike.*${word}*`).join(',')})` };
};

// A category slug matches itself and everything below it, e.g. "apparel" also matches "apparel-topwear-shirts".
export const toProductQueryParams = (filter: ProductFilter): ProductQueryParamsDto => ({
  select: PRODUCT_COLUMNS,
  order: NEWEST_FIRST,
  limit: filter.limit,
  ...(filter.offset ? { offset: filter.offset } : {}),
  ...(filter.genders?.length ? { gender: `in.(${filter.genders.join(',')})` } : {}),
  ...(filter.season ? { season: `eq.${SEASON_VALUES[filter.season]}` } : {}),
  ...toSearchParams(filter.search),
  ...(filter.categorySlug
    ? { 'category.or': `(slug.eq.${filter.categorySlug},slug.like.${filter.categorySlug}-*)` }
    : {}),
});
