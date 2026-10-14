import { CollectionKey, ProductFilter, useProducts } from '@/features/catalog';

const COLLECTION_FILTERS = {
  women: { genders: ['women'], categorySlug: 'apparel-topwear', limit: 1 },
  kids: { genders: ['boys', 'girls'], categorySlug: 'apparel', limit: 1 },
  living: { categorySlug: 'home', limit: 1 },
} satisfies Record<string, ProductFilter>;

const BANNER_FILTER: ProductFilter = { genders: ['women'], categorySlug: 'apparel-topwear', season: 'winter', limit: 1 };
const NEW_IN_FILTER: ProductFilter = { categorySlug: 'apparel', limit: 10 };

type HomeCollectionKey = keyof typeof COLLECTION_FILTERS & CollectionKey;

export const useHomeCatalog = () => {
  const women = useProducts(COLLECTION_FILTERS.women);
  const kids = useProducts(COLLECTION_FILTERS.kids);
  const living = useProducts(COLLECTION_FILTERS.living);
  const banner = useProducts(BANNER_FILTER);
  const newIn = useProducts(NEW_IN_FILTER);

  const collections: { key: HomeCollectionKey; imageUrl?: string }[] = [
    { key: 'women', imageUrl: women.data?.[0]?.imageUrl },
    { key: 'kids', imageUrl: kids.data?.[0]?.imageUrl },
    { key: 'living', imageUrl: living.data?.[0]?.imageUrl },
  ];

  return {
    collections,
    bannerImageUrl: banner.data?.[0]?.imageUrl,
    newIn: {
      products: newIn.data ?? [],
      isLoading: newIn.isPending,
      errorMessage: newIn.error?.message,
      retry: () => newIn.refetch(),
    },
  };
};
