import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { SafeAreaScreen } from '@/components/common';
import { ProductGridCard } from '@/components/product';
import { AppText } from '@/components/typography';
import { useGridItemWidth } from '@/hooks/useGridItemWidth';
import type { RootStackScreenProps } from '@/navigation/types';
import { spacing, useTheme } from '@/theme';
import { formatPrice } from '@/utils/formatPrice';
import PopularSearches from '../components/PopularSearches';
import SearchBar from '../components/SearchBar';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useProductCardActions } from '../hooks/useProductCardActions';
import { useProductPages } from '../queries/useProductPages';

const GRID_COLUMNS = 2;
const SEARCH_DELAY_MS = 300;
const POPULAR_TERMS = ['shirt', 'jeans', 'watch', 'shoe', 'jacket', 'bag'] as const;

export default function SearchScreen({ navigation }: RootStackScreenProps<'Search'>) {
  const { t, i18n } = useTranslation('catalog');
  const { colors } = useTheme();
  const itemWidth = useGridItemWidth(GRID_COLUMNS, spacing.lg, spacing.lg);
  const [query, setQuery] = useState('');
  const search = useDebouncedValue(query.trim(), SEARCH_DELAY_MS);
  const products = useProductPages({ search }, 20, search.length > 0);
  const actions = useProductCardActions();
  const priceLocale = `${i18n.language}-IN`;

  const loadMore = () => {
    if (products.hasNextPage && !products.isFetchingNextPage) products.fetchNextPage();
  };

  const renderEmptyState = () => {
    if (!search) {
      return (
        <PopularSearches
          title={t('search.popular')}
          searches={POPULAR_TERMS.map((term) => ({ term, label: t(`search.terms.${term}`) }))}
          onSelect={setQuery}
        />
      );
    }
    if (products.isPending) return <ActivityIndicator color={colors.text} style={styles.state} />;
    if (products.error) {
      return (
        <View style={styles.state}>
          <AppText variant="caption" color="error" accessibilityRole="alert" style={styles.centered}>
            {products.error.message}
          </AppText>
          <Button title={t('actions.retry', { ns: 'common' })} variant="secondary" onPress={() => products.refetch()} />
        </View>
      );
    }
    return (
      <View style={styles.state}>
        <AppText variant="headline" style={styles.centered}>
          {t('search.noResults', { query: search })}
        </AppText>
        <AppText variant="caption" style={styles.centered}>
          {t('search.noResultsHint')}
        </AppText>
      </View>
    );
  };

  return (
    <SafeAreaScreen>
      <SearchBar value={query} onChangeText={setQuery} onBackPress={() => navigation.goBack()} />
      <FlatList
        data={search ? products.data : []}
        keyExtractor={(product) => product.id}
        numColumns={GRID_COLUMNS}
        renderItem={({ item }) => (
          <ProductGridCard
            style={{ width: itemWidth }}
            name={item.name}
            typeName={item.categoryName}
            colour={item.colour}
            priceLabel={formatPrice(item.price, item.currency, priceLocale)}
            imageUrl={item.imageUrl}
            inStock={item.inStock}
            cartQuantity={actions.cartQuantity(item.id)}
            isAddingToCart={actions.isAddingToCart(item.id)}
            isWishlisted={actions.isWishlisted(item.id)}
            onWishlistPress={() => actions.toggleWishlist(item)}
            onAddToCartPress={() => actions.addToCart(item.id)}
          />
        )}
        ListEmptyComponent={renderEmptyState()}
        ListFooterComponent={
          products.isFetchingNextPage ? <ActivityIndicator color={colors.text} style={styles.state} /> : null
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: spacing.lg,
    gap: spacing.xxl,
  },
  row: {
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  state: {
    padding: spacing.xl,
    gap: spacing.sm,
  },
  centered: {
    textAlign: 'center',
  },
});
