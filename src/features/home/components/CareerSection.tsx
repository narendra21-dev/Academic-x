import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/providers/theme-provider";
import SectionHeader from "./SectionHeader";

export type CareerOpportunity = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  employmentType: "Internship" | "Full-time" | "Part-time";
  companyInitials: string;
  companyColor: string;
  postedAt?: string;
  isRemote?: boolean;
};

type Props = {
  opportunities: CareerOpportunity[];
  onOpportunityPress: (opportunityId: string) => void;
  onSeeAll: () => void;
};

export default function CareerSection({
  opportunities,
  onOpportunityPress,
  onSeeAll,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Career opportunities"
        subtitle="Take the next step in your career"
        actionLabel="See all"
        onAction={onSeeAll}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {opportunities.map((opportunity) => (
          <Pressable
            key={opportunity.id}
            onPress={() => onOpportunityPress(opportunity.id)}
            accessibilityRole="button"
            accessibilityLabel={`${opportunity.title} at ${opportunity.company}`}
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                opacity: pressed ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
          >
            <View style={styles.topRow}>
              <View
                style={[
                  styles.companyLogo,
                  { backgroundColor: opportunity.companyColor },
                ]}
              >
                <Text style={styles.companyInitials}>
                  {opportunity.companyInitials}
                </Text>
              </View>

              <View
                style={[
                  styles.typeBadge,
                  { backgroundColor: colors.primaryLight },
                ]}
              >
                <Text style={[styles.typeText, { color: colors.indigo }]}>
                  {opportunity.employmentType}
                </Text>
              </View>
            </View>

            <View style={styles.details}>
              <Text
                style={[styles.title, { color: colors.text }]}
                numberOfLines={2}
              >
                {opportunity.title}
              </Text>

              <Text
                style={[styles.company, { color: colors.muted }]}
                numberOfLines={1}
              >
                {opportunity.company}
              </Text>

              <View style={styles.infoRow}>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={colors.muted}
                />
                <Text
                  style={[styles.infoText, { color: colors.muted }]}
                  numberOfLines={1}
                >
                  {opportunity.isRemote ? "Remote" : opportunity.location}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons
                  name="wallet-outline"
                  size={14}
                  color={colors.muted}
                />
                <Text style={[styles.salary, { color: colors.text }]}>
                  {opportunity.salary}
                </Text>
              </View>
            </View>

            <View style={[styles.footer, { borderTopColor: colors.border }]}>
              <Text style={[styles.postedAt, { color: colors.muted }]}>
                {opportunity.postedAt ?? "Recently posted"}
              </Text>

              <View style={styles.viewDetails}>
                <Text style={[styles.viewText, { color: colors.indigo }]}>
                  View details
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={13}
                  color={colors.indigo}
                />
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  list: {
    gap: 12,
    paddingVertical: 2,
  },
  card: {
    width: 255,
    borderRadius: 17,
    borderWidth: 1,
    padding: 14,
    gap: 13,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  companyLogo: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  companyInitials: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },
  typeBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    fontSize: 9,
    fontWeight: "800",
  },
  details: {
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 19,
    minHeight: 38,
  },
  company: {
    fontSize: 11,
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 10,
    flexShrink: 1,
  },
  salary: {
    fontSize: 11,
    fontWeight: "800",
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postedAt: {
    fontSize: 9,
  },
  viewDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewText: {
    fontSize: 10,
    fontWeight: "800",
  },
});
