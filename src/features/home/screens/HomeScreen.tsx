import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaScreen } from '@/components/common';
import type { HomeStackScreenProps } from '@/navigation/types';
import { spacing } from '@/theme';
import CollectionTile from '../components/CollectionTile';
import NewInSection from '../components/NewInSection';
import PromoBanner from '../components/PromoBanner';
import { useHomeCatalog } from '../hooks/useHomeCatalog';

export default function HomeScreen({ navigation }: HomeStackScreenProps<'HomeMain'>) {
  const { t } = useTranslation('home');
  const { collections, bannerImageUrl, newIn } = useHomeCatalog();

  return (
    <SafeAreaScreen edges={[]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.tiles}>
          {collections.map((collection) => (
            <CollectionTile
              key={collection.key}
              label={t(`collections.${collection.key}`)}
              imageUrl={collection.imageUrl}
              onPress={() => navigation.navigate('ProductList', { collection: collection.key })}
            />
          ))}
        </View>
        <View style={styles.padded}>
          <PromoBanner
            title={t('banner.title')}
            tagline={t('banner.tagline')}
            ctaLabel={t('banner.cta')}
            imageUrl={bannerImageUrl}
            onPress={() => navigation.navigate('ProductList', { collection: 'winter' })}
          />
        </View>
        <NewInSection
          products={newIn.products}
          isLoading={newIn.isLoading}
          errorMessage={newIn.errorMessage}
          onRetry={newIn.retry}
          onViewAll={() => navigation.navigate('ProductList', { collection: 'newIn' })}
        />
      </ScrollView>
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: spacing.lg,
    gap: spacing.xl,
  },
  tiles: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  padded: {
    paddingHorizontal: spacing.lg,
  },
});
