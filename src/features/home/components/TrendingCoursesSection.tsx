import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/providers/theme-provider";
import SectionHeader from "./SectionHeader";

export type TrendingCourse = {
  id: string;
  title: string;
  category: string;
  instructor: string;
  price: string;
  originalPrice?: string;
  rating: string;
  students?: string;
  icon: keyof typeof Ionicons.glyphMap;
  accentColor: string;
  backgroundColor: string;
};

type Props = {
  courses: TrendingCourse[];
  onCoursePress: (courseId: string) => void;
  onSeeAll: () => void;
};

export default function TrendingCoursesSection({
  courses,
  onCoursePress,
  onSeeAll,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Trending courses"
        subtitle="Learn new skills and grow your career"
        actionLabel="See all"
        onAction={onSeeAll}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {courses.map((course) => (
          <Pressable
            key={course.id}
            onPress={() => onCoursePress(course.id)}
            accessibilityRole="button"
            accessibilityLabel={`${course.title}, ${course.price}`}
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
            {/* Course visual */}
            <View
              style={[
                styles.cover,
                { backgroundColor: course.backgroundColor },
              ]}
            >
              <View
                style={[styles.categoryBadge, { backgroundColor: colors.card }]}
              >
                <Text
                  style={[styles.categoryText, { color: course.accentColor }]}
                >
                  {course.category}
                </Text>
              </View>

              <Ionicons
                name={course.icon}
                size={43}
                color={course.accentColor}
              />

              <View style={styles.coverDecoration}>
                <Ionicons
                  name="sparkles"
                  size={17}
                  color={course.accentColor}
                />
              </View>
            </View>

            {/* Course details */}
            <View style={styles.details}>
              <Text
                style={[styles.title, { color: colors.text }]}
                numberOfLines={2}
              >
                {course.title}
              </Text>

              <Text
                style={[styles.instructor, { color: colors.muted }]}
                numberOfLines={1}
              >
                By {course.instructor}
              </Text>

              <View style={styles.ratingRow}>
                <Ionicons name="star" size={13} color={colors.amber} />

                <Text style={[styles.rating, { color: colors.text }]}>
                  {course.rating}
                </Text>

                {course.students ? (
                  <Text
                    style={[styles.students, { color: colors.muted }]}
                    numberOfLines={1}
                  >
                    ({course.students})
                  </Text>
                ) : null}
              </View>

              <View
                style={[
                  styles.priceDivider,
                  { backgroundColor: colors.border },
                ]}
              />

              <View style={styles.priceRow}>
                <Text style={[styles.price, { color: colors.text }]}>
                  {course.price}
                </Text>

                {course.originalPrice ? (
                  <Text style={[styles.originalPrice, { color: colors.muted }]}>
                    {course.originalPrice}
                  </Text>
                ) : null}
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
    width: 205,
    borderRadius: 17,
    borderWidth: 1,
    overflow: "hidden",
  },
  cover: {
    height: 116,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  categoryBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: "800",
  },
  coverDecoration: {
    position: "absolute",
    right: 12,
    bottom: 10,
  },
  details: {
    padding: 12,
    gap: 7,
  },
  title: {
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 18,
    minHeight: 36,
  },
  instructor: {
    fontSize: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rating: {
    fontSize: 10,
    fontWeight: "700",
  },
  students: {
    fontSize: 9,
    flexShrink: 1,
  },
  priceDivider: {
    height: StyleSheet.hairlineWidth,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "900",
  },
  originalPrice: {
    fontSize: 10,
    textDecorationLine: "line-through",
  },
});
