import React, { ReactNode, useRef } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaScreen } from '@/components/common';
import { Icon } from '@/components/icon';
import { spacing, useTheme } from '@/theme';
import { RevealFocusedFieldContext, revealOffset } from '../hooks/useRevealFocusedField';

interface AuthLayoutProps {
  children: ReactNode;
  onBackPress?: () => void;
}

const backIcon = require('@/assets/icons/arrow-left.svg');

// Android resizes natively (plugins/withAndroidImeInsets), so only iOS needs the avoiding view.
const avoidsKeyboard = Platform.OS === 'ios';

export default function AuthLayout({ children, onBackPress }: AuthLayoutProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const formRef = useRef<View>(null);
  const viewportHeight = useRef(0);
  const contentHeight = useRef(0);

  const revealFocusedField = () => {
    const field = TextInput.State.currentlyFocusedInput();
    const form = formRef.current;
    if (!field || !form) return;
    field.measureLayout(form, (_x, fieldY) => {
      const y = revealOffset(fieldY, contentHeight.current, viewportHeight.current, spacing.lg);
      scrollRef.current?.scrollTo({ y, animated: true });
    });
  };

  return (
    <SafeAreaScreen>
      {onBackPress ? (
        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" accessibilityLabel={t('actions.back')} hitSlop={spacing.md} onPress={onBackPress}>
            <Icon source={backIcon} color={colors.text} />
          </Pressable>
        </View>
      ) : null}
      <KeyboardAvoidingView behavior="padding" enabled={avoidsKeyboard} style={styles.fill}>
        <RevealFocusedFieldContext.Provider value={revealFocusedField}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.content}
            keyboardDismissMode="none"
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={(_width, height) => {
              contentHeight.current = height;
            }}
            onLayout={(event) => {
              viewportHeight.current = event.nativeEvent.layout.height;
              // The keyboard shrinks the viewport after the field gained focus, so reveal again.
              revealFocusedField();
            }}
          >
            <View ref={formRef} style={styles.form}>
              {children}
            </View>
          </ScrollView>
        </RevealFocusedFieldContext.Provider>
      </KeyboardAvoidingView>
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
  },
  fill: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  // Padding sits on the measured view so a field's position inside it equals its scroll offset.
  form: {
    padding: spacing.xxl,
  },
});
