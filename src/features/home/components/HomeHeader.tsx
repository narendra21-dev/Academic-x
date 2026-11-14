import { useAppTheme } from "@/providers/theme-provider";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  greeting?: string;
  subtitle?: string;
  onNotifications: () => void;
};

export default function HomeHeader({
  greeting = "Good afternoon, Student 👋",
  subtitle = "What's happening in your campus?",
  onNotifications,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={[styles.brand, { color: colors.text }]}>
          Academic
          <Text style={{ color: colors.indigo }}>-X</Text>
        </Text>

        <Text style={[styles.greeting, { color: colors.text }]}>
          {greeting}
        </Text>

        <Text style={[styles.subtitle, { color: colors.muted }]}>
          {subtitle}
        </Text>
      </View>

      <Pressable
        onPress={onNotifications}
        style={[
          styles.notificationButton,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
      >
        <Ionicons name="notifications-outline" size={23} color={colors.text} />
        <View style={[styles.notificationDot, { borderColor: colors.card }]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    flex: 1,
  },
  brand: {
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -1,
  },
  greeting: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 5,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 3,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 1,
  },
});
