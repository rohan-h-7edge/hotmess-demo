import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen } from '@/features/auth';
import { SplashScreen } from '@/features/splash';
import { useAuth } from '@/features/user';
import TabNavigator from './TabNavigator';
import { useNavigationTheme } from '@/theme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = { headerShown: false };

export default function AppNavigator() {
  const navigationTheme = useNavigationTheme();
  const { isAuthenticated } = useAuth();
  const [isSplashDone, setIsSplashDone] = useState(false);

  const renderScreens = () => {
    if (!isSplashDone) {
      return <Stack.Screen name="Splash">{() => <SplashScreen onFinish={() => setIsSplashDone(true)} />}</Stack.Screen>;
    }
    if (isAuthenticated) {
      return <Stack.Screen name="Main" component={TabNavigator} />;
    }
    return (
      <>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </>
    );
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={screenOptions}>{renderScreens()}</Stack.Navigator>
    </NavigationContainer>
  );
}
