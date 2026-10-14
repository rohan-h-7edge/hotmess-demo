import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewInScreen } from '@/features/catalog';
import { HomeScreen } from '@/features/home';
import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const screenOptions = { headerShown: false };

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="NewIn" component={NewInScreen} />
    </Stack.Navigator>
  );
}
