import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { ListHeader, SafeAreaScreen } from '@/components/common';
import { ProductGridCard } from '@/components/product';
import { useAddToCart, useCart } from '@/features/cart';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/features/wishlist';
import { AppText } from '@/components/typography';
import { spacing, useTheme } from '@/theme';
import FilterButton from '../components/FilterButton';
import { useProductPages } from '../queries/useProductPages';
import type { Product, ProductQuery } from '../types/catalog.types';
import { formatPrice } from '@/utils/formatPrice';

const NEW_IN_QUERY: ProductQuery = { categorySlug: 'apparel' };

export default function NewInScreen() {
  const { t, i18n } = useTranslation('catalog');
  const { colors } = useTheme();
  const products = useProductPages(NEW_IN_QUERY);
  const cart = useCart();
  const addToCart = useAddToCart();
  const wishlist = useWishlist();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const priceLocale = `${i18n.language}-IN`;
  const cartQuantities = new Map(cart.data?.map((item) => [item.productId, item.quantity]));
  const wishlistedIds = new Set(wishlist.data?.map((item) => item.productId));

  const toggleWishlist = (product: Product) => {
    if (wishlistedIds.has(product.id)) {
      removeFromWishlist.mutate(product.id);
      return;
    }
    addToWishlist.mutate({
      productId: product.id,
      name: product.name,
      typeName: product.categoryName,
      colour: product.colour,
      price: product.price,
      currency: product.currency,
      imageUrl: product.imageUrl,
      inStock: product.inStock,
    });
  };

  const loadMore = () => {
    if (products.hasNextPage && !products.isFetchingNextPage) products.fetchNextPage();
  };

  const renderFooter = () => {
    if (products.isFetchingNextPage) return <ActivityIndicator color={colors.text} style={styles.footer} />;
    if (products.data?.length && !products.hasNextPage) {
      return (
        <AppText variant="caption" style={[styles.footer, styles.centered]}>
          {t('newIn.end')}
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
        testID="new-in-list"
        data={products.data}
        keyExtractor={(product) => product.id}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductGridCard
            name={item.name}
            typeName={item.categoryName}
            colour={item.colour}
            priceLabel={formatPrice(item.price, item.currency, priceLocale)}
            imageUrl={item.imageUrl}
            inStock={item.inStock}
            cartQuantity={cartQuantities.get(item.id) ?? 0}
            isAddingToCart={addToCart.isPending && addToCart.variables === item.id}
            isWishlisted={wishlistedIds.has(item.id)}
            onWishlistPress={() => toggleWishlist(item)}
            onAddToCartPress={() => addToCart.mutate(item.id)}
          />
        )}
        ListHeaderComponent={<ListHeader title={t('newIn.title')} subtitle={t('newIn.subtitle')} />}
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
