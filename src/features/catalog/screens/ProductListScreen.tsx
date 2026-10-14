import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { ListHeader, SafeAreaScreen } from '@/components/common';
import { ProductGridCard } from '@/components/product';
import { AppText } from '@/components/typography';
import type { HomeStackScreenProps } from '@/navigation/types';
import { useGridItemWidth } from '@/hooks/useGridItemWidth';
import { spacing, useTheme } from '@/theme';
import { COLLECTIONS } from '../config/collections';
import FilterButton from '../components/FilterButton';
import { useProductCardActions } from '../hooks/useProductCardActions';
import { useProductPages } from '../queries/useProductPages';
import { formatPrice } from '@/utils/formatPrice';

// A fixed width keeps a lone item in the last row the same size as the others.
const GRID_COLUMNS = 2;

export default function ProductListScreen({ route }: HomeStackScreenProps<'ProductList'>) {
  const { t, i18n } = useTranslation('catalog');
  const { colors } = useTheme();
  const itemWidth = useGridItemWidth(GRID_COLUMNS, spacing.lg, spacing.lg);
  const { collection } = route.params;
  const products = useProductPages(COLLECTIONS[collection]);
  const actions = useProductCardActions();
  const priceLocale = `${i18n.language}-IN`;

  const loadMore = () => {
    if (products.hasNextPage && !products.isFetchingNextPage) products.fetchNextPage();
  };

  const renderFooter = () => {
    if (products.isFetchingNextPage) return <ActivityIndicator color={colors.text} style={styles.footer} />;
    if (products.data?.length && !products.hasNextPage) {
      return (
        <AppText variant="caption" style={[styles.footer, styles.centered]}>
          {t('end')}
        </AppText>
      );
    }
    return null;
  };

  const renderEmptyState = () => {
    if (products.isPending) return <ActivityIndicator color={colors.text} style={styles.footer} />;
    if (products.error) {
      return (
        <View style={styles.error}>
          <AppText variant="caption" color="error" accessibilityRole="alert" style={styles.centered}>
            {products.error.message}
          </AppText>
          <Button title={t('actions.retry', { ns: 'common' })} variant="secondary" onPress={() => products.refetch()} />
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaScreen edges={[]}>
      <FlatList
        testID="product-list"
        data={products.data}
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
        ListHeaderComponent={
          <ListHeader title={t(`collections.${collection}.title`)} subtitle={t(`collections.${collection}.subtitle`)} />
        }
        ListEmptyComponent={renderEmptyState()}
        ListFooterComponent={renderFooter()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={products.isRefetching && !products.isFetchingNextPage}
            onRefresh={() => products.refetch()}
            tintColor={colors.text}
          />
        }
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.row}
      />
      <View style={styles.filter}>
        <FilterButton />
      </View>
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
  footer: {
    paddingVertical: spacing.xl,
  },
  centered: {
    textAlign: 'center',
  },
  error: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  filter: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
  },
});
