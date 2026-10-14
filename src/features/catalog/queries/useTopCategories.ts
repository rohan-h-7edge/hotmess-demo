import { useQuery } from '@tanstack/react-query';
import { catalogService } from '../services/catalogService';
import { catalogKeys } from './catalogKeys';

export const useTopCategories = () =>
  useQuery({
    queryKey: catalogKeys.topCategories(),
    queryFn: catalogService.getTopCategories,
  });
