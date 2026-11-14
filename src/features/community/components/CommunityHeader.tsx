import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { useAppTheme } from "@/providers/theme-provider";

type Props = {
  onNotifications: () => void;
};

export default function CommunityHeader({ onNotifications }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={[styles.eyebrow, { color: colors.indigo }]}>
          STUDENT NETWORK
        </Text>

        <Text style={[styles.title, { color: colors.text }]}>Community</Text>

        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Connect, learn and grow together.
        </Text>
      </View>

      <PressableScale
        onPress={onNotifications}
        style={[
          styles.notificationButton,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
        accessibilityLabel="Open notifications"
      >
        <Ionicons name="notifications-outline" size={21} color={colors.text} />
        <View
          style={[styles.notificationDot, { backgroundColor: colors.danger }]}
        />
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
  },
  titleArea: {
    flex: 1,
    gap: 4,
  },
  eyebrow: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    letterSpacing: -0.7,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    top: 9,
    right: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
});
