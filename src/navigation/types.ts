import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { CollectionKey } from '@/features/catalog';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  HomeMain: undefined;
  ProductList: { collection: CollectionKey };
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
  Cart: undefined;
  EditProfile: undefined;
  Search: undefined;
  Main: NavigatorScreenParams<TabParamList>;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = NativeStackScreenProps<HomeStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;
