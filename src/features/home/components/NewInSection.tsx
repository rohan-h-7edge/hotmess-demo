import React from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { AppText } from '@/components/typography';
import type { Product } from '@/features/catalog';
import { spacing, useTheme } from '@/theme';
import ProductCard from './ProductCard';

interface NewInSectionProps {
  products: Product[];
  isLoading: boolean;
  errorMessage?: string;
  onRetry: () => void;
  onViewAll: () => void;
}

export default function NewInSection({ products, isLoading, errorMessage, onRetry, onViewAll }: NewInSectionProps) {
  const { t } = useTranslation('home');
  const { colors } = useTheme();

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator color={colors.text} style={styles.state} />;
    }
    if (errorMessage) {
      return (
        <View style={styles.state}>
          <AppText variant="caption" color="error" accessibilityRole="alert">
            {errorMessage}
          </AppText>
          <Button title={t('actions.retry', { ns: 'common' })} variant="secondary" onPress={onRetry} />
        </View>
      );
    }
    return (
      <FlatList
        horizontal
        data={products}
        keyExtractor={(product) => product.id}
        renderItem={({ item }) => <ProductCard name={item.name} imageUrl={item.imageUrl} />}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <AppText variant="title" accessibilityRole="header">
            {t('newIn.title')}
          </AppText>
          <Pressable accessibilityRole="link" onPress={onViewAll} hitSlop={spacing.md}>
            <AppText variant="caption" color="text" style={styles.viewAll}>
              {t('newIn.viewAll')}
            </AppText>
          </Pressable>
        </View>
        <AppText variant="caption">{t('newIn.subtitle')}</AppText>
      </View>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  viewAll: {
    textDecorationLine: 'underline',
  },
  list: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  state: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    gap: spacing.md,
  },
});
