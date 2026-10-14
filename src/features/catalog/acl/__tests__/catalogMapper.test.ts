import { toCategories, toProductQueryParams, toProducts, toSearchParams } from '../catalogMapper';

const SELECT =
  'id,name,gender,category_id,price,currency,image_path,base_colour,stock,category:categories!inner(slug,name)';

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
        base_colour: 'Navy Blue',
        stock: 0,
        category: { name: 'Shirts', slug: 'apparel-topwear-shirts' },
      },
    ]);

    expect(product).toEqual({
      id: '15970',
      name: 'Navy Shirt',
      gender: 'men',
      categoryId: '7',
      categoryName: 'Shirts',
      colour: 'Navy Blue',
      price: 1299,
      currency: 'INR',
      imageUrl: expect.stringMatching(/\/product-images\/15970\.jpg$/),
      inStock: false,
    });
  });

  it('rejects rows with an unknown gender', () => {
    expect(() =>
      toProducts([
        { id: 1, name: 'A', gender: 'robots', category_id: 1, price: 1, currency: 'INR', image_path: '1.jpg', base_colour: null, stock: 1, category: { name: 'A' } },
      ])
    ).toThrow();
  });

  it('builds newest-first product params with only the filters given', () => {
    expect(toProductQueryParams({ limit: 10 })).toEqual({
      select: SELECT,
      order: 'year.desc.nullslast,id.desc',
      limit: 10,
    });
  });

  it('adds an offset for later pages', () => {
    expect(toProductQueryParams({ limit: 20, offset: 40 })).toMatchObject({ limit: 20, offset: 40 });
  });

  it('filters by genders, season and a category with everything below it', () => {
    expect(
      toProductQueryParams({ genders: ['boys', 'girls'], season: 'winter', categorySlug: 'apparel', limit: 1 })
    ).toEqual({
      select: SELECT,
      order: 'year.desc.nullslast,id.desc',
      limit: 1,
      gender: 'in.(boys,girls)',
      season: 'eq.Winter',
      'category.or': '(slug.eq.apparel,slug.like.apparel-*)',
    });
  });

  it('matches every search word in the product name', () => {
    expect(toSearchParams('Jacket')).toEqual({ name: 'ilike.*jacket*' });
    expect(toSearchParams('  blue   jacket ')).toEqual({ and: '(name.ilike.*blue*,name.ilike.*jacket*)' });
  });

  it('drops characters that would break the query and ignores empty searches', () => {
    expect(toSearchParams('t-shirt, (red)*')).toEqual({ and: '(name.ilike.*t-shirt*,name.ilike.*red*)' });
    expect(toSearchParams(' ,() ')).toEqual({});
    expect(toSearchParams(undefined)).toEqual({});
  });

  it('adds the search to product params', () => {
    expect(toProductQueryParams({ search: 'watch', limit: 20 })).toMatchObject({ name: 'ilike.*watch*', limit: 20 });
  });
});
