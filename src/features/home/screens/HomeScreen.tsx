import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaScreen } from '@/components/common';
import { spacing } from '@/theme';
import CollectionTile from '../components/CollectionTile';
import NewInSection from '../components/NewInSection';
import PromoBanner from '../components/PromoBanner';
import { useHomeCatalog } from '../hooks/useHomeCatalog';

export default function HomeScreen() {
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
            />
          ))}
        </View>
        <View style={styles.padded}>
          <PromoBanner
            title={t('banner.title')}
            tagline={t('banner.tagline')}
            ctaLabel={t('banner.cta')}
            imageUrl={bannerImageUrl}
          />
        </View>
        <NewInSection
          products={newIn.products}
          isLoading={newIn.isLoading}
          errorMessage={newIn.errorMessage}
          onRetry={newIn.retry}
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
