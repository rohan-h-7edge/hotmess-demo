import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { SafeAreaScreen } from '@/components/common';
import { AppText } from '@/components/typography';
import { spacing, useTheme } from '@/theme';
import FilterButton from '../components/FilterButton';
import ListHeader from '../components/ListHeader';
import ProductGridCard from '../components/ProductGridCard';
import { useProductPages } from '../queries/useProductPages';
import type { ProductQuery } from '../types/catalog.types';
import { formatPrice } from '../utils/formatPrice';

const NEW_IN_QUERY: ProductQuery = { categorySlug: 'apparel' };

export default function NewInScreen() {
  const { t, i18n } = useTranslation('catalog');
  const { colors } = useTheme();
  const products = useProductPages(NEW_IN_QUERY);
  const priceLocale = `${i18n.language}-IN`;

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
