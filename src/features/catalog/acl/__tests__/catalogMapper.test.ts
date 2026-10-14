import { toCategories, toProductImageUrl, toProductQueryParams, toProducts } from '../catalogMapper';

describe('catalogMapper', () => {
  it('maps categories to frontend models', () => {
    expect(toCategories([{ id: 1, slug: 'apparel', name: 'Apparel' }])).toEqual([
      { id: '1', slug: 'apparel', name: 'Apparel' },
    ]);
  });

  it('maps products and builds the public image URL', () => {
    const [product] = toProducts([
      {
        id: 15970,
        name: 'Navy Shirt',
        gender: 'men',
        category_id: 7,
        price: '1299.00',
        currency: 'INR',
        image_path: '15970.jpg',
      },
    ]);

    expect(product).toEqual({
      id: '15970',
      name: 'Navy Shirt',
      gender: 'men',
      categoryId: '7',
      price: 1299,
      currency: 'INR',
      imageUrl: toProductImageUrl('15970.jpg'),
    });
  });

  it('builds image URLs under the public product-images bucket', () => {
    expect(toProductImageUrl('1.jpg', 'https://x.supabase.co')).toBe(
      'https://x.supabase.co/storage/v1/object/public/product-images/1.jpg'
    );
  });

  it('rejects rows with an unknown gender', () => {
    expect(() =>
      toProducts([{ id: 1, name: 'A', gender: 'robots', category_id: 1, price: 1, currency: 'INR', image_path: '1.jpg' }])
    ).toThrow();
  });

  it('builds newest-first product params with only the filters given', () => {
    expect(toProductQueryParams({ limit: 10 })).toEqual({
      select: 'id,name,gender,category_id,price,currency,image_path',
      order: 'year.desc.nullslast,id.desc',
      limit: 10,
    });
  });

  it('filters by genders, season and a category with everything below it', () => {
    expect(
      toProductQueryParams({ genders: ['boys', 'girls'], season: 'winter', categorySlug: 'apparel', limit: 1 })
    ).toEqual({
      select: 'id,name,gender,category_id,price,currency,image_path,category:categories!inner(slug)',
      order: 'year.desc.nullslast,id.desc',
      limit: 1,
      gender: 'in.(boys,girls)',
      season: 'eq.Winter',
      'category.or': '(slug.eq.apparel,slug.like.apparel-*)',
    });
  });
});
