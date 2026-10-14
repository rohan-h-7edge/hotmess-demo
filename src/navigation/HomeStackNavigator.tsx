import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { ProductListScreen } from '@/features/catalog';
import { HomeScreen } from '@/features/home';
import { renderAppHeader } from './renderAppHeader';
import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

// The stack draws the app header so it knows when there is a screen to go back to.
const screenOptions: NativeStackNavigationOptions = {
  header: ({ navigation, back }) => renderAppHeader(navigation, back ? navigation.goBack : undefined),
};

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
    </Stack.Navigator>
  );
}
