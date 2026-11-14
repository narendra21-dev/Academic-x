import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

import type { CommunityCategory } from "@/features/community/types/community";
import { useAppTheme } from "@/providers/theme-provider";

export type CommunityFilter = "All" | CommunityCategory;

export const COMMUNITY_FILTERS: CommunityFilter[] = [
  "All",
  "Discussion",
  "Question",
  "Project",
  "Event",
  "Campus Life",
];

type Props = {
  selected: CommunityFilter;
  onSelect: (category: CommunityFilter) => void;
};

export default function CommunityCategories({ selected, onSelect }: Props) {
  const { colors } = useAppTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {COMMUNITY_FILTERS.map((category) => {
        const active = selected === category;

        return (
          <Pressable
            key={category}
            onPress={() => onSelect(category)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={[
              styles.chip,
              {
                backgroundColor: active ? colors.primary : colors.card,
                borderColor: active ? colors.primary : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                {
                  color: active
                    ? colors.background === "#090E1A"
                      ? "#090E1A"
                      : "#FFFFFF"
                    : colors.muted,
                },
                active && {
                  color:
                    colors.background === "#090E1A" ? "#090E1A" : "#FFFFFF",
                },
              ]}
            >
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingRight: 18,
  },
  chip: {
    minHeight: 36,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "700",
  },
});
