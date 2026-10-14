import { env } from '@/config/env';

export const publicStorageUrl = (bucket: string, path: string, baseUrl = env.EXPO_PUBLIC_API_URL) =>
  `${baseUrl}/storage/v1/object/public/${bucket}/${path}`;

export const PRODUCT_IMAGE_BUCKET = 'product-images';
