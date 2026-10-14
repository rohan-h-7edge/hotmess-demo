import { useInfiniteQuery } from '@tanstack/react-query';
import { catalogService } from '../services/catalogService';
import type { ProductQuery } from '../types/catalog.types';
import { catalogKeys } from './catalogKeys';

export const useProductPages = (query: ProductQuery, pageSize = 20) =>
  useInfiniteQuery({
    queryKey: catalogKeys.productPages(query, pageSize),
    queryFn: ({ pageParam }) => catalogService.getProducts({ ...query, limit: pageSize, offset: pageParam }),
    initialPageParam: 0,
    // A short page means the last product has been loaded.
    getNextPageParam: (lastPage, _allPages, lastOffset) =>
      lastPage.length < pageSize ? undefined : lastOffset + pageSize,
    select: (data) => data.pages.flat(),
  });
