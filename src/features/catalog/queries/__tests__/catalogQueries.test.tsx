import { act, renderHook, waitFor } from '@testing-library/react-native';
import { createQueryWrapper } from '@/test-utils/renderWithProviders';
import { catalogService } from '../../services/catalogService';
import { catalogKeys } from '../catalogKeys';
import { useProductPages } from '../useProductPages';
import { useProducts } from '../useProducts';
import { useTopCategories } from '../useTopCategories';

jest.mock('../../services/catalogService', () => ({
  catalogService: { getTopCategories: jest.fn(), getProducts: jest.fn() },
}));

const product = {
  id: '1',
  name: 'Navy Shirt',
  gender: 'men' as const,
  categoryId: '7',
  categoryName: 'Tops',
  colour: 'Red',
  price: 1299,
  currency: 'INR',
  imageUrl: 'https://x/1.jpg',
  inStock: true
};

describe('catalog queries', () => {
  it('builds keys under the catalog key', () => {
    expect(catalogKeys.topCategories()).toEqual(['catalog', 'categories', 'top']);
    expect(catalogKeys.products({ limit: 10 })).toEqual(['catalog', 'products', { limit: 10 }]);
  });

  it('loads the top categories', async () => {
    jest.mocked(catalogService.getTopCategories).mockResolvedValue([{ id: '1', slug: 'apparel', name: 'Apparel' }]);
    const { result } = await renderHook(() => useTopCategories(), { wrapper: createQueryWrapper() });

    await waitFor(() => expect(result.current.data).toEqual([{ id: '1', slug: 'apparel', name: 'Apparel' }]));
  });

  it('loads products for a filter', async () => {
    jest.mocked(catalogService.getProducts).mockResolvedValue([product]);
    const filter = { genders: ['women' as const], limit: 4 };
    const { result } = await renderHook(() => useProducts(filter), { wrapper: createQueryWrapper() });

    await waitFor(() => expect(result.current.data).toEqual([product]));
    expect(catalogService.getProducts).toHaveBeenCalledWith(filter);
  });

  it('pages through products until a short page and flattens them', async () => {
    const page = (start: number, count: number) =>
      Array.from({ length: count }, (_, index) => ({ ...product, id: String(start + index) }));
    jest
      .mocked(catalogService.getProducts)
      .mockResolvedValueOnce(page(0, 2))
      .mockResolvedValueOnce(page(2, 1));
    const { result } = await renderHook(() => useProductPages({ categorySlug: 'apparel' }, 2), {
      wrapper: createQueryWrapper(),
    });
    await waitFor(() => expect(result.current.data).toHaveLength(2));

    await act(async () => {
      await result.current.fetchNextPage();
    });

    await waitFor(() => expect(result.current.data?.map((item) => item.id)).toEqual(['0', '1', '2']));
    expect(result.current.hasNextPage).toBe(false);
    expect(catalogService.getProducts).toHaveBeenLastCalledWith({ categorySlug: 'apparel', limit: 2, offset: 2 });
  });

  it('does not load pages while disabled', async () => {
    jest.mocked(catalogService.getProducts).mockClear();
    const { result } = await renderHook(() => useProductPages({ search: '' }, 20, false), {
      wrapper: createQueryWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
    expect(catalogService.getProducts).not.toHaveBeenCalled();
  });
});
