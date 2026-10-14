import React, { ReactNode, useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaScreen } from '@/components/common';
import { spacing } from '@/theme';
import { RevealFocusedFieldContext, revealOffset } from '../hooks/useRevealFocusedField';

interface AuthLayoutProps {
  children: ReactNode;
}

// Android resizes natively (plugins/withAndroidImeInsets), so only iOS needs the avoiding view.
const avoidsKeyboard = Platform.OS === 'ios';

export default function AuthLayout({ children }: AuthLayoutProps) {
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
