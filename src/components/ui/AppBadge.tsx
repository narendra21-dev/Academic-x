import { StyleSheet, View } from "react-native";

import { useAppTheme } from "@/providers/theme-provider";
import { radius, spacing } from "@/theme";
import AppText from "./AppText";

type Variant = "primary" | "success" | "warning" | "danger" | "neutral";

type Props = {
  label: string;
  variant?: Variant;
};

export default function AppBadge({ label, variant = "primary" }: Props) {
  const { colors } = useAppTheme();

  const variants = {
    primary: {
      background: colors.primaryLight,
      text: colors.indigo,
    },
    success: {
      background: colors.green + "18",
      text: colors.green,
    },
    warning: {
      background: colors.amber + "20",
      text: colors.amber,
    },
    danger: {
      background: colors.danger + "18",
      text: colors.danger,
    },
    neutral: {
      background: colors.input,
      text: colors.muted,
    },
  };

  const selected = variants[variant];

  return (
    <View style={[styles.badge, { backgroundColor: selected.background }]}>
      <AppText variant="caption" weight="700" color={selected.text}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
});
