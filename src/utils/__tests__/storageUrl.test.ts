import { publicStorageUrl } from '../storageUrl';

describe('publicStorageUrl', () => {
  it('points at a public object in a bucket', () => {
    expect(publicStorageUrl('product-images', '1.jpg', 'https://x.supabase.co')).toBe(
      'https://x.supabase.co/storage/v1/object/public/product-images/1.jpg'
    );
  });
});
