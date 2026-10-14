import { useQuery } from '@tanstack/react-query';
import { cartService } from '../services/cartService';
import { cartKeys } from './cartKeys';

export const cartItemsQuery = { queryKey: cartKeys.items(), queryFn: cartService.getItems };

export const useCart = () => useQuery(cartItemsQuery);
