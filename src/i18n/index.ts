import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { authTranslations } from '@/features/auth/i18n';
import { catalogTranslations } from '@/features/catalog/i18n';
import { editorialsTranslations } from '@/features/editorials/i18n';
import { homeTranslations } from '@/features/home/i18n';
import { profileTranslations } from '@/features/profile/i18n';
import { splashTranslations } from '@/features/splash/i18n';
import { wishlistTranslations } from '@/features/wishlist/i18n';
import en from './locales/en.json';
import hi from './locales/hi.json';

export const resources = {
  en: {
    common: en,
    home: homeTranslations.en,
    splash: splashTranslations.en,
    auth: authTranslations.en,
    wishlist: wishlistTranslations.en,
    editorials: editorialsTranslations.en,
    profile: profileTranslations.en,
    catalog: catalogTranslations.en,
  },
  hi: {
    common: hi satisfies typeof en,
    home: homeTranslations.hi,
    splash: splashTranslations.hi,
    auth: authTranslations.hi,
    wishlist: wishlistTranslations.hi,
    editorials: editorialsTranslations.hi,
    profile: profileTranslations.hi,
    catalog: catalogTranslations.hi,
  },
};

export type Language = keyof typeof resources;

const LANGUAGE_KEY = 'app.language';

const isLanguage = (code?: string | null): code is Language => !!code && code in resources;

const deviceLanguage = getLocales()[0]?.languageCode;

i18n.use(initReactI18next).init({
  resources,
  lng: isLanguage(deviceLanguage) ? deviceLanguage : 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export const changeLanguage = async (language: Language) => {
  await i18n.changeLanguage(language);
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
};

export const restoreSavedLanguage = async () => {
  const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (isLanguage(saved)) await i18n.changeLanguage(saved);
};

export const translateKey = (key: string): string => i18n.t(key as never);

export default i18n;
