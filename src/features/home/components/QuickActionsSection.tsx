import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/providers/theme-provider";
import SectionHeader from "./SectionHeader";

type QuickAction = {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  background: string;
  iconColor: string;
  onPress: () => void;
};

type Props = {
  onCommunity: () => void;
  onCourses: () => void;
  onJobs: () => void;
};

export default function QuickActionsSection({
  onCommunity,
  onCourses,
  onJobs,
}: Props) {
  const { colors } = useAppTheme();

  const actions: QuickAction[] = [
    {
      id: "community",
      title: "Community",
      subtitle: "Connect & share",
      icon: "people-outline",
      background: colors.primaryLight,
      iconColor: colors.indigo,
      onPress: onCommunity,
    },
    {
      id: "courses",
      title: "Courses",
      subtitle: "Learn something",
      icon: "book-outline",
      background: colors.green + "18",
      iconColor: colors.green,
      onPress: onCourses,
    },
    {
      id: "jobs",
      title: "Jobs",
      subtitle: "Find opportunities",
      icon: "briefcase-outline",
      background: colors.amber + "18",
      iconColor: colors.amber,
      onPress: onJobs,
    },
  ];

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Explore Academic-X"
        subtitle="Everything you need in one place"
      />

      <View style={styles.grid}>
        {actions.map((action) => (
          <Pressable
            key={action.id}
            onPress={action.onPress}
            accessibilityRole="button"
            accessibilityLabel={`${action.title}. ${action.subtitle}`}
            style={({ pressed }) => [
              styles.actionCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                opacity: pressed ? 0.82 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: action.background },
              ]}
            >
              <Ionicons name={action.icon} size={23} color={action.iconColor} />
            </View>

            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: colors.text }]}>
                {action.title}
              </Text>

              <Text style={[styles.subtitle, { color: colors.muted }]}>
                {action.subtitle}
              </Text>
            </View>

            <Ionicons name="arrow-forward" size={15} color={colors.muted} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  grid: {
    flexDirection: "row",
    gap: 9,
  },
  actionCard: {
    flex: 1,
    minWidth: 0,
    borderRadius: 16,
    borderWidth: 1,
    padding: 11,
    minHeight: 132,
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    gap: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 9,
    fontWeight: "500",
  },
});
