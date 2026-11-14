import { StyleSheet, View } from "react-native";

import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/theme";
import AppButton from "./AppButton";
import AppText from "./AppText";

type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retrying?: boolean;
};

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
  retrying = false,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <AppText color={colors.danger} variant="title">
        !
      </AppText>

      <AppText variant="heading" weight="700">
        {title}
      </AppText>

      <AppText color={colors.muted} style={styles.message}>
        {message}
      </AppText>

      {onRetry && (
        <AppButton title="Try again" onPress={onRetry} loading={retrying} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing["3xl"],
    gap: spacing.md,
  },
  message: {
    textAlign: "center",
    lineHeight: 21,
    marginBottom: spacing.md,
  },
});
