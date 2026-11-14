import {
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
  type ViewProps,
} from "react-native";

import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/theme";

type Props = ViewProps & {
  scroll?: boolean;
  contentContainerStyle?: ScrollViewProps["contentContainerStyle"];
};

export default function AppScreen({
  children,
  scroll = false,
  style,
  contentContainerStyle,
  ...props
}: Props) {
  const { colors } = useAppTheme();

  if (scroll) {
    return (
      <ScrollView
        style={[styles.screen, { backgroundColor: colors.background }, style]}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      {...props}
      style={[
        styles.screen,
        styles.content,
        { backgroundColor: colors.background },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
});
