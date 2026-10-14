import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/typography';
import { radius, spacing, ThemeColors, useTheme } from '@/theme';
import { moderateScale } from '@/utils/scaling';

interface ProfileHeaderProps {
  name: string;
  email: string;
  username?: string;
}

const AVATAR_SIZE = moderateScale(64);

const initialsOf = (name: string, email: string) => {
  const letters = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('');
  return (letters || email[0] || '?').slice(0, 2).toUpperCase();
};

export default function ProfileHeader({ name, email, username }: ProfileHeaderProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.header}>
      <View style={styles.avatar} accessible={false}>
        <AppText variant="subtitle" color="onChrome">
          {initialsOf(name, email)}
        </AppText>
      </View>
      <View style={styles.details}>
        {name ? <AppText variant="headline">{name}</AppText> : null}
        {username ? <AppText variant="caption">@{username}</AppText> : null}
        <AppText variant="caption">{email}</AppText>
      </View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg,
      padding: spacing.lg,
      backgroundColor: colors.surfaceElevated,
    },
    avatar: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      backgroundColor: colors.chrome,
    },
    details: {
      flex: 1,
      gap: spacing.xxs,
    },
  });
