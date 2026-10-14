import React, { ComponentProps, useState } from 'react';
import { Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/icon';
import { Input } from '@/components/input';
import { spacing, useTheme } from '@/theme';
import { moderateScale } from '@/utils/scaling';

type PasswordInputProps = Omit<ComponentProps<typeof Input>, 'secureTextEntry' | 'trailing'>;

const showIcon = require('@/assets/icons/eye.svg');
const hideIcon = require('@/assets/icons/eye-off.svg');
const ICON_SIZE = moderateScale(20);

export default function PasswordInput(inputProps: PasswordInputProps) {
  const { t } = useTranslation('auth');
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const toggle = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isVisible ? t('password.hide') : t('password.show')}
      hitSlop={spacing.md}
      onPress={() => setIsVisible((visible) => !visible)}
    >
      <Icon source={isVisible ? hideIcon : showIcon} color={colors.textSecondary} size={ICON_SIZE} />
    </Pressable>
  );

  return <Input {...inputProps} secureTextEntry={!isVisible} trailing={toggle} />;
}
