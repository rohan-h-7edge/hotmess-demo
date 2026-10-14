import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing, ThemeColors, useTheme } from '@/theme';
import { moderateScale } from '@/utils/scaling';
import { Icon } from '../icon';

interface AppHeaderProps {
  onSearchPress?: () => void;
  onBagPress?: () => void;
}

const logoImage = require('@/assets/images/hotmess-logo.svg');
const searchIcon = require('@/assets/icons/search.svg');
const bagIcon = require('@/assets/icons/bag.svg');
const LOGO_ASPECT_RATIO = 182 / 29;

export default function AppHeader({ onSearchPress, onBagPress }: AppHeaderProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const styles = createStyles(colors);

  return (
    <View style={[styles.statusBarArea, { paddingTop: top }]}>
      <View style={styles.bar}>
        <Image
          source={logoImage}
          style={styles.logo}
          contentFit="contain"
          accessible
          accessibilityRole="header"
          accessibilityLabel={t('header.logo')}
        />
        <View style={styles.actions}>
          <HeaderButton icon={searchIcon} label={t('header.search')} color={colors.onChrome} onPress={onSearchPress} />
          <HeaderButton icon={bagIcon} label={t('header.bag')} color={colors.onChrome} onPress={onBagPress} />
        </View>
      </View>
    </View>
  );
}

interface HeaderButtonProps {
  icon: ImageSource | number;
  label: string;
  color: string;
  onPress?: () => void;
}

function HeaderButton({ icon, label, color, onPress }: HeaderButtonProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} hitSlop={spacing.md} onPress={onPress}>
      <Icon source={icon} color={color} />
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    statusBarArea: {
      backgroundColor: colors.background,
    },
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.xxl,
      paddingVertical: spacing.xxl,
      backgroundColor: colors.chrome,
    },
    logo: {
      height: moderateScale(22),
      aspectRatio: LOGO_ASPECT_RATIO,
    },
    actions: {
      flexDirection: 'row',
      gap: spacing.xxl,
    },
  });
