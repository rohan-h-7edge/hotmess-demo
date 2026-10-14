import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/icon';
import { AppText } from '@/components/typography';
import { radius, spacing, ThemeColors, useTheme } from '@/theme';
import { modalOpenFeedback } from '@/utils/haptics';
import { moderateScale } from '@/utils/scaling';

interface QuantityPickerProps {
  quantity: number;
  max: number;
  onChange: (quantity: number) => void;
}

const chevronIcon = require('@/assets/icons/chevron-down.svg');
const CHEVRON_SIZE = moderateScale(16);

export default function QuantityPicker({ quantity, max, onChange }: QuantityPickerProps) {
  const { t } = useTranslation('cart');
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [isOpen, setIsOpen] = useState(false);
  const options = Array.from({ length: max }, (_, index) => index + 1);

  const choose = (value: number) => {
    setIsOpen(false);
    if (value !== quantity) onChange(value);
  };

  return (
    <>
      <Pressable accessibilityRole="button" onPress={() => setIsOpen(true)} style={styles.trigger}>
        <AppText variant="caption" color="text">
          {t('item.quantity', { quantity })}
        </AppText>
        <Icon source={chevronIcon} color={colors.text} size={CHEVRON_SIZE} />
      </Pressable>
      <Modal
        testID="quantity-picker"
        visible={isOpen}
        transparent
        animationType="fade"
        onShow={modalOpenFeedback}
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setIsOpen(false)} accessible={false}>
          <View style={styles.sheet}>
            <AppText variant="headline" style={styles.sheetTitle}>
              {t('item.chooseQuantity')}
            </AppText>
            {options.map((value) => (
              <Pressable
                key={value}
                accessibilityRole="button"
                accessibilityState={{ selected: value === quantity }}
                onPress={() => choose(value)}
                style={[styles.option, value === quantity && styles.selected]}
              >
                <AppText variant="body">{value}</AppText>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: spacing.sm,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.sm,
    },
    backdrop: {
      flex: 1,
      justifyContent: 'center',
      padding: spacing.xxxl,
      backgroundColor: colors.scrim,
    },
    sheet: {
      paddingVertical: spacing.md,
      borderRadius: radius.lg,
      backgroundColor: colors.surfaceElevated,
    },
    sheetTitle: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.sm,
    },
    option: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
    },
    selected: {
      backgroundColor: colors.surface,
    },
  });
