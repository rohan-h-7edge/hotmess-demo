import React from 'react';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { AppHeader } from '@/components/common';

export const renderAppHeader = (navigation: NavigationProp<ParamListBase>, onBackPress?: () => void) => (
  <AppHeader
    onBackPress={onBackPress}
    onSearchPress={() => navigation.navigate('Search')}
    onBagPress={() => navigation.navigate('Cart')}
  />
);
