import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { ListHeader, SafeAreaScreen } from '@/components/common';
import { ProductGridCard } from '@/components/product';
import { AppText } from '@/components/typography';
import { useAddToCart, useCart } from '@/features/cart';
import type { TabScreenProps } from '@/navigation/types';
import { spacing, useTheme } from '@/theme';
import { formatPrice } from '@/utils/formatPrice';
import EmptyWishlist from '../components/EmptyWishlist';
import { useRemoveFromWishlist } from '../queries/useRemoveFromWishlist';
import { useWishlist } from '../queries/useWishlist';

export default function WishlistScreen({ navigation }: TabScreenProps<'Wishlist'>) {
  const { t, i18n } = useTranslation('wishlist');
  const { colors } = useTheme();
  const wishlist = useWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const cart = useCart();
  const addToCart = useAddToCart();

  const items = wishlist.data ?? [];
  const priceLocale = `${i18n.language}-IN`;
  const cartQuantities = new Map(cart.data?.map((item) => [item.productId, item.quantity]));

  const renderEmptyState = () => {
    if (wishlist.isPending) return <ActivityIndicator color={colors.text} style={styles.state} />;
    if (wishlist.error) {
      return (
        <View style={styles.state}>
          <AppText variant="caption" color="error" accessibilityRole="alert" style={styles.centered}>
            {wishlist.error.message}
          </AppText>
          <Button title={t('actions.retry', { ns: 'common' })} variant="secondary" onPress={() => wishlist.refetch()} />
        </View>
      );
    }
    return <EmptyWishlist onShopNow={() => navigation.navigate('Home', { screen: 'NewIn' })} />;
  };

  return (
    <SafeAreaScreen edges={[]}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductGridCard
            name={item.name}
            typeName={item.typeName}
            colour={item.colour}
            priceLabel={formatPrice(item.price, item.currency, priceLocale)}
            imageUrl={item.imageUrl}
            inStock={item.inStock}
            cartQuantity={cartQuantities.get(item.productId) ?? 0}
            isAddingToCart={addToCart.isPending && addToCart.variables === item.productId}
            isWishlisted
            onWishlistPress={() => removeFromWishlist.mutate(item.productId)}
            onAddToCartPress={() => addToCart.mutate(item.productId)}
          />
        )}
        ListHeaderComponent={<ListHeader title={t('title')} subtitle={t('count', { count: items.length })} />}
        ListEmptyComponent={renderEmptyState()}
        refreshControl={
          <RefreshControl refreshing={wishlist.isRefetching} onRefresh={() => wishlist.refetch()} tintColor={colors.text} />
        }
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
    gap: spacing.md,
  },
  centered: {
    textAlign: 'center',
  },
});
