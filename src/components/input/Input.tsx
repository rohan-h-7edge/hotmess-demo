import React, { ReactNode, Ref } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { radius, spacing, ThemeColors, typography, useTheme } from '@/theme';
import { AppText } from '../typography';

interface InputProps extends Omit<TextInputProps, 'style'> {
  ref?: Ref<TextInput>;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  errorTestID?: string;
  trailing?: ReactNode;
}

export default function Input({ error, errorTestID, trailing, ...inputProps }: InputProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={[styles.field, error ? styles.fieldError : undefined]}>
        <TextInput style={styles.input} placeholderTextColor={colors.textSecondary} {...inputProps} />
        {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
      </View>
      {error ? (
        <AppText testID={errorTestID} variant="caption" color="error" style={styles.errorText}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.md,
    },
    field: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
    },
    fieldError: {
      borderColor: colors.error,
    },
    input: {
      ...typography.body,
      flex: 1,
      color: colors.text,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    },
    trailing: {
      paddingRight: spacing.md,
    },
    errorText: {
      marginTop: spacing.xs,
    },
  });
