import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaScreen } from '@/components/common';
import { spacing } from '@/theme';

interface AuthLayoutProps {
  children: ReactNode;
}

// Android resizes natively (plugins/withAndroidImeInsets), so only iOS needs the avoiding view.
const avoidsKeyboard = Platform.OS === 'ios';

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <SafeAreaScreen>
      <KeyboardAvoidingView behavior="padding" enabled={avoidsKeyboard} style={styles.fill}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
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
    padding: spacing.xxl,
  },
});
