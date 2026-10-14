import { renderHook, waitFor } from '@testing-library/react-native';
import { createQueryWrapper } from '@/test-utils/renderWithProviders';
import { catalogService } from '../../services/catalogService';
import { catalogKeys } from '../catalogKeys';
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
  price: 1299,
  currency: 'INR',
  imageUrl: 'https://x/1.jpg',
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
});
