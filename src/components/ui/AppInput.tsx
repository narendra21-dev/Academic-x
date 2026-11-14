import React from "react";
import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";

import { useAppTheme } from "@/providers/theme-provider";
import { radius, spacing } from "@/theme";
import AppText from "./AppText";

type Props = TextInputProps & {
  label?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
};

export default function AppInput({
  label,
  error,
  leftElement,
  rightElement,
  style,
  ...props
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      {label && (
        <AppText weight="600" style={styles.label}>
          {label}
        </AppText>
      )}

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.input,
            borderColor: error ? colors.danger : colors.border,
          },
        ]}
      >
        {leftElement}

        <TextInput
          {...props}
          placeholderTextColor={colors.muted}
          style={[styles.input, { color: colors.text }, style]}
        />

        {rightElement}
      </View>

      {error && (
        <AppText color={colors.danger} variant="caption">
          {error}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    marginBottom: 2,
  },
  inputWrapper: {
    minHeight: 50,
    borderWidth: 1,
    borderRadius: radius.lg,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: spacing.md,
    minWidth: 0,
  },
});
