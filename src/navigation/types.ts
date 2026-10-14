import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  HomeMain: undefined;
  NewIn: undefined;
};

export type TabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Wishlist: undefined;
  Editorials: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Login: { registeredEmail: string; needsEmailConfirmation: boolean } | undefined;
  Register: undefined;
  Main: NavigatorScreenParams<TabParamList>;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = NativeStackScreenProps<HomeStackParamList, T>;
