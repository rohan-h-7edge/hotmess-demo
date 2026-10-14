import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { Header, SafeAreaScreen } from '@/components/common';
import { ConfirmDialog } from '@/components/dialog';
import { AppText } from '@/components/typography';
import type { RootStackScreenProps } from '@/navigation/types';
import { spacing, ThemeColors, useTheme } from '@/theme';
import { formatPrice } from '@/utils/formatPrice';
import CartItemCard from '../components/CartItemCard';
import CheckoutBar from '../components/CheckoutBar';
import CouponRow from '../components/CouponRow';
import EmptyCart from '../components/EmptyCart';
import OrderDetails from '../components/OrderDetails';
import { useCart } from '../queries/useCart';
import { useRemoveFromCart } from '../queries/useRemoveFromCart';
import { useUpdateCartQuantity } from '../queries/useUpdateCartQuantity';
import { CartItem, MAX_CART_QUANTITY } from '../types/cart.types';
import { cartTotal } from '../utils/cartTotal';

type CartScreenProps = RootStackScreenProps<'Cart'> & {
  onMoveToWishlist?: (item: CartItem) => void;
};

export default function CartScreen({ navigation, onMoveToWishlist }: CartScreenProps) {
  const { t, i18n } = useTranslation('cart');
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const cart = useCart();
  const updateQuantity = useUpdateCartQuantity();
  const removeFromCart = useRemoveFromCart();
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);

  const items = cart.data ?? [];
  const priceLocale = `${i18n.language}-IN`;
  const currency = items[0]?.currency ?? 'INR';
  const totalLabel = formatPrice(cartTotal(items), currency, priceLocale);
  const canCheckout = items.some((item) => item.inStock);

  const confirmRemove = () => {
    if (itemToRemove) removeFromCart.mutate(itemToRemove.productId);
    setItemToRemove(null);
  };

  const shopNow = () => navigation.navigate('Main', {
      screen: 'Home',
      params: { screen: 'ProductList', params: { collection: 'newIn' } },
    });

  const renderBody = () => {
    if (cart.isPending) return <ActivityIndicator color={colors.text} style={styles.state} />;
    if (cart.error) {
      return (
        <View style={styles.state}>
          <AppText variant="caption" color="error" accessibilityRole="alert" style={styles.centered}>
            {cart.error.message}
          </AppText>
          <Button title={t('actions.retry', { ns: 'common' })} variant="secondary" onPress={() => cart.refetch()} />
        </View>
      );
    }
    if (items.length === 0) return <EmptyCart onShopNow={shopNow} />;
    return (
      <>
        <FlatList
          data={items}
          keyExtractor={(item) => item.productId}
          renderItem={({ item }) => (
            <CartItemCard
              name={item.name}
              typeName={item.typeName}
              colour={item.colour}
              imageUrl={item.imageUrl}
              priceLabel={formatPrice(item.price * item.quantity, item.currency, priceLocale)}
              quantity={item.quantity}
              maxQuantity={MAX_CART_QUANTITY}
              inStock={item.inStock}
              onQuantityChange={(quantity) => updateQuantity.mutate({ productId: item.productId, quantity })}
              onRemove={() => setItemToRemove(item)}
              onMoveToWishlist={() => onMoveToWishlist?.(item)}
            />
          )}
          ListFooterComponent={
            <View style={styles.footer}>
              <CouponRow />
              <OrderDetails totalLabel={totalLabel} />
            </View>
          }
          contentContainerStyle={styles.list}
        />
        <CheckoutBar totalLabel={totalLabel} canCheckout={canCheckout} />
      </>
    );
  };

  return (
    <SafeAreaScreen>
      <Header title={t('title')} onBackPress={() => navigation.goBack()} />
      <View style={styles.body}>{renderBody()}</View>
      <ConfirmDialog
        visible={itemToRemove !== null}
        title={t('removeDialog.title')}
        message={t('removeDialog.message')}
        imageUrl={itemToRemove?.imageUrl}
        onConfirm={confirmRemove}
        onCancel={() => setItemToRemove(null)}
      />
    </SafeAreaScreen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    list: {
      paddingVertical: spacing.md,
      gap: spacing.md,
    },
    footer: {
      gap: spacing.md,
    },
    state: {
      padding: spacing.xl,
      gap: spacing.md,
    },
    centered: {
      textAlign: 'center',
    },
  });
