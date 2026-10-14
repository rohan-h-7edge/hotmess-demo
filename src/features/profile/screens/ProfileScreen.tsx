import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/button';
import { SafeAreaScreen } from '@/components/common';
import { ConfirmDialog } from '@/components/dialog';
import { AppText } from '@/components/typography';
import { useLogout } from '@/features/auth';
import { useCart } from '@/features/cart';
import { useUserProfile } from '@/features/user';
import { useWishlist } from '@/features/wishlist';
import { useLanguage } from '@/hooks/useLanguage';
import type { Language } from '@/i18n';
import type { TabScreenProps } from '@/navigation/types';
import { spacing, ThemeColors, useTheme } from '@/theme';
import LanguageSwitch from '../components/LanguageSwitch';
import MenuRow from '../components/MenuRow';
import MenuSection from '../components/MenuSection';
import ProfileHeader from '../components/ProfileHeader';

const cartIcon = require('@/assets/icons/cart.png');
const heartIcon = require('@/assets/icons/heart.png');
const globeIcon = require('@/assets/icons/globe.svg');
const pencilIcon = require('@/assets/icons/pencil.svg');

const LANGUAGES: Language[] = ['en', 'hi'];

export default function ProfileScreen({ navigation }: TabScreenProps<'Profile'>) {
  const { t } = useTranslation('profile');
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const profile = useUserProfile();
  const cart = useCart();
  const wishlist = useWishlist();
  const { language, changeLanguage } = useLanguage();
  const logout = useLogout();
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  const cartCount = cart.data?.reduce((count, item) => count + item.quantity, 0) ?? 0;
  const wishlistCount = wishlist.data?.length ?? 0;
  const fullName = [profile.data?.firstName, profile.data?.lastName].filter(Boolean).join(' ');

  const signOut = () => {
    setIsSignOutOpen(false);
    logout.mutate();
  };

  const renderHeader = () => {
    if (profile.data) {
      return <ProfileHeader name={fullName} email={profile.data.email} username={profile.data.username} />;
    }
    if (profile.error) {
      return (
        <View style={styles.state}>
          <AppText variant="caption" color="error" accessibilityRole="alert">
            {profile.error.message}
          </AppText>
          <Button title={t('actions.retry', { ns: 'common' })} variant="secondary" onPress={() => profile.refetch()} />
        </View>
      );
    }
    return <ActivityIndicator color={colors.text} style={styles.state} />;
  };

  return (
    <SafeAreaScreen edges={[]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {renderHeader()}
        <MenuSection title={t('sections.shopping')}>
          <MenuRow
            icon={cartIcon}
            label={t('menu.cart')}
            value={t('itemCount', { count: cartCount })}
            onPress={() => navigation.navigate('Cart')}
          />
          <MenuRow
            icon={heartIcon}
            label={t('menu.wishlist')}
            value={t('itemCount', { count: wishlistCount })}
            onPress={() => navigation.navigate('Wishlist')}
          />
        </MenuSection>
        <MenuSection title={t('sections.settings')}>
          <MenuRow
            icon={globeIcon}
            label={t('menu.language')}
            trailing={
              <LanguageSwitch
                value={language}
                options={LANGUAGES.map((code) => ({ value: code, label: t(`languages.${code}`) }))}
                onChange={changeLanguage}
              />
            }
          />
        </MenuSection>
        <MenuSection title={t('sections.account')}>
          <MenuRow icon={pencilIcon} label={t('menu.editProfile')} onPress={() => navigation.navigate('EditProfile')} />
        </MenuSection>
        <Button
          title={t('signOut')}
          variant="outline"
          loading={logout.isPending}
          onPress={() => setIsSignOutOpen(true)}
          style={styles.signOut}
        />
      </ScrollView>
      <ConfirmDialog
        visible={isSignOutOpen}
        title={t('signOutDialog.title')}
        message={t('signOutDialog.message')}
        onConfirm={signOut}
        onCancel={() => setIsSignOutOpen(false)}
      />
    </SafeAreaScreen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    scroll: {
      backgroundColor: colors.surface,
    },
    content: {
      paddingVertical: spacing.lg,
      gap: spacing.xl,
    },
    state: {
      padding: spacing.xl,
      gap: spacing.md,
    },
    signOut: {
      marginHorizontal: spacing.lg,
    },
  });
