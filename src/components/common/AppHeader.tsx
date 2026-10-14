import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing, ThemeColors, useTheme } from '@/theme';
import { moderateScale } from '@/utils/scaling';
import { Icon } from '../icon';

interface AppHeaderProps {
  onBackPress?: () => void;
  onSearchPress?: () => void;
  onBagPress?: () => void;
}

const logoImage = require('@/assets/images/hotmess-logo.png');
const backIcon = require('@/assets/icons/arrow-left.svg');
const searchIcon = require('@/assets/icons/search.png');
const cartIcon = require('@/assets/icons/cart.png');
const LOGO_ASPECT_RATIO = 118 / 22;
const ACTION_ICON_SIZE = moderateScale(32);

export default function AppHeader({ onBackPress, onSearchPress, onBagPress }: AppHeaderProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const styles = createStyles(colors);

  return (
    <View style={[styles.statusBarArea, { paddingTop: top }]}>
      <View style={styles.bar}>
        <View style={styles.brand}>
          {onBackPress ? (
            <HeaderButton icon={backIcon} label={t('actions.back')} color={colors.onChrome} onPress={onBackPress} />
          ) : null}
          <Image
            source={logoImage}
            style={styles.logo}
            contentFit="contain"
            accessible
            accessibilityRole="header"
            accessibilityLabel={t('header.logo')}
          />
        </View>
        <View style={styles.actions}>
          <HeaderButton
            icon={searchIcon}
            label={t('header.search')}
            color={colors.onChrome}
            size={ACTION_ICON_SIZE}
            onPress={onSearchPress}
          />
          <HeaderButton
            icon={cartIcon}
            label={t('header.bag')}
            color={colors.onChrome}
            size={ACTION_ICON_SIZE}
            onPress={onBagPress}
          />
        </View>
      </View>
    </View>
  );
}

interface HeaderButtonProps {
  icon: ImageSource | number;
  label: string;
  color: string;
  size?: number;
  onPress?: () => void;
}

function HeaderButton({ icon, label, color, size, onPress }: HeaderButtonProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} hitSlop={spacing.md} onPress={onPress}>
      <Icon source={icon} color={color} size={size} />
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
    brand: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg,
    },
    actions: {
      flexDirection: 'row',
      gap: spacing.xxl,
    },
  });
