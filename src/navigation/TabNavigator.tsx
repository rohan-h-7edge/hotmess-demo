import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import { AppHeader } from '@/components/common';
import { Icon } from '@/components/icon';
import { AppText } from '@/components/typography';
import { EditorialsScreen } from '@/features/editorials';
import { HomeScreen } from '@/features/home';
import { ProfileScreen } from '@/features/profile';
import { WishlistScreen } from '@/features/wishlist';
import { ThemeColors, useTheme } from '@/theme';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_LABEL_MAX_FONT_SCALE = 1.3;

const tabPressFeedback = {
  tabPress: () => {
    Haptics.selectionAsync();
  },
};

const tabIcons = {
  Home: require('@/assets/icons/home.svg'),
  Wishlist: require('@/assets/icons/heart.svg'),
  Editorials: require('@/assets/icons/editorials.svg'),
  Profile: require('@/assets/icons/profile.svg'),
} satisfies Record<keyof TabParamList, number>;

const createScreenOptions =
  (colors: ThemeColors) =>
  ({ route }: { route: { name: keyof TabParamList } }): BottomTabNavigationOptions => ({
    header: () => <AppHeader />,
    tabBarStyle: { backgroundColor: colors.chrome, borderTopWidth: 0 },
    tabBarActiveTintColor: colors.onChrome,
    tabBarInactiveTintColor: colors.onChromeMuted,
    tabBarIcon: ({ color }) => <Icon source={tabIcons[route.name]} color={color} />,
    tabBarLabel: ({ focused, children }) => (
      <AppText
        variant="caption"
        color={focused ? 'onChrome' : 'onChromeMuted'}
        maxFontSizeMultiplier={TAB_LABEL_MAX_FONT_SCALE}
      >
        {children}
      </AppText>
    ),
  });

export default function TabNavigator() {
  const { t } = useTranslation(['home', 'wishlist', 'editorials', 'profile']);
  const { colors } = useTheme();

  return (
    <Tab.Navigator screenOptions={createScreenOptions(colors)} screenListeners={tabPressFeedback}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('home:tabTitle') }} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} options={{ title: t('wishlist:tabTitle') }} />
      <Tab.Screen name="Editorials" component={EditorialsScreen} options={{ title: t('editorials:tabTitle') }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t('profile:tabTitle') }} />
    </Tab.Navigator>
  );
}
