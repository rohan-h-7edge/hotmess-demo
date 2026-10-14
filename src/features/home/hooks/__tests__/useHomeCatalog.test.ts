import { renderHook } from '@testing-library/react-native';
import { ProductFilter, useProducts } from '@/features/catalog';
import { useHomeCatalog } from '../useHomeCatalog';

jest.mock('@/features/catalog', () => ({ useProducts: jest.fn() }));

const product = (id: string) => ({
  id,
  name: `Product ${id}`,
  gender: 'women' as const,
  categoryId: '1',
  categoryName: 'Tops',
  colour: 'Red',
  price: 999,
  currency: 'INR',
  imageUrl: `https://img/${id}.jpg`,
  inStock: true
});

const queryResult = (overrides: object) => ({ data: undefined, isPending: false, error: null, refetch: jest.fn(), ...overrides });

describe('useHomeCatalog', () => {
  it('uses the first product of each filter as a cover and lists new arrivals', async () => {
    jest.mocked(useProducts).mockImplementation((filter: ProductFilter) => {
      if (filter.limit === 10) return queryResult({ data: [product('n1'), product('n2')] }) as never;
      if (filter.season === 'winter') return queryResult({ data: [product('banner')] }) as never;
      return queryResult({ data: [product(filter.categorySlug === 'home' ? 'living' : filter.genders![0])] }) as never;
    });

    const { result } = await renderHook(() => useHomeCatalog());

    expect(result.current.collections).toEqual([
      { key: 'women', imageUrl: 'https://img/women.jpg' },
      { key: 'kids', imageUrl: 'https://img/boys.jpg' },
      { key: 'living', imageUrl: 'https://img/living.jpg' },
    ]);
    expect(result.current.bannerImageUrl).toBe('https://img/banner.jpg');
    expect(result.current.newIn.products.map((item) => item.id)).toEqual(['n1', 'n2']);
  });

  it('reports loading and errors for new arrivals and retries', async () => {
    const refetch = jest.fn();
    jest.mocked(useProducts).mockReturnValue(
      queryResult({ isPending: false, error: new Error('Network error'), refetch }) as never
    );

    const { result } = await renderHook(() => useHomeCatalog());
    result.current.newIn.retry();

    expect(result.current.newIn).toMatchObject({ products: [], isLoading: false, errorMessage: 'Network error' });
    expect(result.current.collections.every((collection) => collection.imageUrl === undefined)).toBe(true);
    expect(refetch).toHaveBeenCalled();
  });
});
