import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { radius, spacing, ThemeColors, useTheme } from '@/theme';
import { modalOpenFeedback } from '@/utils/haptics';
import { scale } from '@/utils/scaling';
import { Button } from '../button';
import { AppText } from '../typography';

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  imageUrl?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const IMAGE_ASPECT_RATIO = 195 / 136;
const DIALOG_MAX_WIDTH = scale(307);

export default function ConfirmDialog({ visible, title, message, imageUrl, onConfirm, onCancel }: ConfirmDialogProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Modal
      testID="confirm-dialog"
      visible={visible}
      transparent
      animationType="fade"
      onShow={modalOpenFeedback}
      onRequestClose={onCancel}
    >
      <Pressable style={styles.backdrop} onPress={onCancel} accessible={false}>
        <Pressable style={styles.dialog} accessibilityViewIsModal accessible={false}>
          {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" /> : null}
          <View style={styles.copy}>
            <AppText variant="headline" accessibilityRole="header" style={styles.centered}>
              {title}
            </AppText>
            <AppText variant="caption" style={styles.centered}>
              {message}
            </AppText>
          </View>
          <View style={styles.actions}>
            <Button title={t('actions.confirm')} onPress={onConfirm} style={styles.action} />
            <Button title={t('actions.cancel')} variant="outline" onPress={onCancel} style={styles.action} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.xxl,
      backgroundColor: colors.scrim,
    },
    dialog: {
      width: '100%',
      maxWidth: DIALOG_MAX_WIDTH,
      alignItems: 'center',
      gap: spacing.lg,
      padding: spacing.xxl,
      borderRadius: radius.sm,
      backgroundColor: colors.surfaceElevated,
    },
    image: {
      width: '72%',
      aspectRatio: IMAGE_ASPECT_RATIO,
      backgroundColor: colors.surface,
    },
    copy: {
      gap: spacing.xs,
    },
    centered: {
      textAlign: 'center',
    },
    actions: {
      flexDirection: 'row',
      alignSelf: 'stretch',
      gap: spacing.md,
      marginTop: spacing.sm,
    },
    action: {
      flex: 1,
    },
  });
