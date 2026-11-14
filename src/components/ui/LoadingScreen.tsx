import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/theme";
import AppText from "./AppText";

type Props = {
  message?: string;
};

export default function LoadingScreen({
  message = "Loading Academic-X...",
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.indigo} />

      <AppText color={colors.muted}>{message}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
  },
});
