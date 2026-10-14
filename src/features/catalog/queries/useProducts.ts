import { useQuery } from '@tanstack/react-query';
import { catalogService } from '../services/catalogService';
import type { ProductFilter } from '../types/catalog.types';
import { catalogKeys } from './catalogKeys';

export const useProducts = (filter: ProductFilter) =>
  useQuery({
    queryKey: catalogKeys.products(filter),
    queryFn: () => catalogService.getProducts(filter),
  });
