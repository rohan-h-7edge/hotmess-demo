import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/icon';
import { AppText } from '@/components/typography';
import { EditorialsScreen } from '@/features/editorials';
import { ProfileScreen } from '@/features/profile';
import { WishlistScreen } from '@/features/wishlist';
import { ThemeColors, useTheme } from '@/theme';
import { selectionFeedback } from '@/utils/haptics';
import HomeStackNavigator from './HomeStackNavigator';
import { renderAppHeader } from './renderAppHeader';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_LABEL_MAX_FONT_SCALE = 1.3;

const tabPressFeedback = { tabPress: selectionFeedback };

const tabIcons = {
  Home: require('@/assets/icons/home.png'),
  Wishlist: require('@/assets/icons/heart.png'),
  Editorials: require('@/assets/icons/editorials.png'),
  Profile: require('@/assets/icons/profile.png'),
} satisfies Record<keyof TabParamList, number>;

const createScreenOptions =
  (colors: ThemeColors) =>
  ({ route }: { route: { name: keyof TabParamList } }): BottomTabNavigationOptions => ({
    header: ({ navigation }) => renderAppHeader(navigation),
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
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ title: t('home:tabTitle'), headerShown: false }}
      />
      <Tab.Screen name="Wishlist" component={WishlistScreen} options={{ title: t('wishlist:tabTitle') }} />
      <Tab.Screen name="Editorials" component={EditorialsScreen} options={{ title: t('editorials:tabTitle') }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t('profile:tabTitle') }} />
    </Tab.Navigator>
  );
}
