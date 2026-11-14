import { StyleSheet, View, type ViewProps } from "react-native";

import { useAppTheme } from "@/providers/theme-provider";
import { radius, shadows, spacing } from "@/theme";

type Props = ViewProps & {
  padded?: boolean;
};

export default function AppCard({
  children,
  style,
  padded = true,
  ...props
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      {...props}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          padding: padded ? spacing.lg : 0,
        },
        shadows.small,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: radius.xl,
    overflow: "hidden",
  },
});
