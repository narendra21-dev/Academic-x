
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
} from "react-native";

import AppText from "./AppText";
import { useAppTheme } from "@/providers/theme-provider";
import { radius, spacing } from "@/theme";

type Props = Omit<PressableProps, "children"> & {
  title: string;
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
};

export default function AppButton({
  title,
  variant = "primary",
  loading = false,
  disabled,
  style,
  ...props
}: Props) {
  const { colors } = useAppTheme();

  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";

  const backgroundColor = isPrimary
    ? colors.indigo
    : isSecondary
      ? colors.primaryLight
      : "transparent";

  const textColor = isPrimary
    ? "#FFFFFF"
    : isSecondary
      ? colors.indigo
      : colors.text;

  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      style={(state) => [
        styles.button,
        {
          backgroundColor,
          borderColor: colors.border,
          opacity: disabled
            ? 0.5
            : state.pressed
              ? 0.82
              : 1,
        },
        variant === "outline" && styles.outline,
        typeof style === "function" ? style(state) : style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <AppText color={textColor} weight="700">
          {title}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  outline: {
    backgroundColor: "transparent",
  },
});
