import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { SafeAreaScreen } from '@/components/common';
import type { RootStackScreenProps } from '@/navigation/types';
import { verticalScale } from '@/utils/scaling';
import SplashProgressBar from '../components/SplashProgressBar';

const SPLASH_DURATION_MS = 2000;
const LOGO_ASPECT_RATIO = 182 / 53;

const backgroundImage = require('@/assets/images/splash-screen.jpg');
const logoImage = require('@/assets/images/hotmess-frame.svg');

export default function SplashScreen({ navigation }: RootStackScreenProps<'Splash'>) {
  const { t } = useTranslation('splash');

  const openLogin = () => navigation.replace('Login');

  return (
    <SafeAreaScreen style={styles.screen}>
      <StatusBar style="dark" />
      <Image source={backgroundImage} style={StyleSheet.absoluteFill} contentFit="cover" />
      <View style={styles.logoLayer}>
        <Image
          source={logoImage}
          style={styles.logo}
          contentFit="contain"
          accessible
          accessibilityLabel={t('logoLabel')}
        />
      </View>
      <View style={styles.footer}>
        <SplashProgressBar
          durationMs={SPLASH_DURATION_MS}
          accessibilityLabel={t('loading')}
          onComplete={openLogin}
        />
      </View>
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'flex-end',
  },
  logoLayer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '40%',
    aspectRatio: LOGO_ASPECT_RATIO,
  },
  footer: {
    alignSelf: 'center',
    width: '68%',
    marginBottom: verticalScale(64),
  },
});
