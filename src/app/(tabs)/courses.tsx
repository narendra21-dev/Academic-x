import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { useAppTheme } from "@/providers/theme-provider";
import type { ReactNode } from "react";


import {
  courseCategories,
  mockCourses,
  type Course,
  type CourseCategory,
} from "@/features/courses/data/courses";

export default function CoursesScreen() {
  const { colors } = useAppTheme();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CourseCategory>("All");
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Free" | "Paid">(
    "All",
  );
  const [savedCourses, setSavedCourses] = useState<string[]>([]);

  const styles = useMemo(() => createStyles(colors), [colors]);

  const featuredCourse = mockCourses.find((course) => course.isFeatured);

  const filteredCourses = useMemo(() => {
    return mockCourses.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase());

      const matchesPrice =
        selectedFilter === "All" ||
        (selectedFilter === "Free" && course.isFree) ||
        (selectedFilter === "Paid" && !course.isFree);

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [search, selectedCategory, selectedFilter]);

  const toggleSaved = (courseId: string) => {
    setSavedCourses((current) =>
      current.includes(courseId)
        ? current.filter((id) => id !== courseId)
        : [...current, courseId],
    );
  };

  const openCourse = (course: Course) => {
    Alert.alert(
      course.title,
      `${course.description}\n\nInstructor: ${course.instructor}\nDuration: ${course.duration}\nLessons: ${course.lessons}\nLevel: ${course.level}`,
      [
        { text: "Close", style: "cancel" },
        {
          text: course.isFree ? "Start learning" : "View course",
          onPress: () =>
            Alert.alert(
              "Coming soon",
              "The course detail and enrollment experience will be built next.",
            ),
        },
      ],
    );
  };

  const renderCourseCard = (course: Course) => {
    const isSaved = savedCourses.includes(course.id);

    return (
      <Pressable
        key={course.id}
        onPress={() => openCourse(course)}
        style={({ pressed }) => [styles.courseCard, pressed && styles.pressed]}
      >
        <View
          style={[
            styles.courseArtwork,
            { backgroundColor: `${course.color}18` },
          ]}
        >
          <View
            style={[
              styles.courseIconCircle,
              { backgroundColor: `${course.color}22` },
            ]}
          >
            <Ionicons
              name={course.icon as keyof typeof Ionicons.glyphMap}
              size={28}
              color={course.color}
            />
          </View>

          <View style={styles.artworkTopRow}>
            <View style={styles.categoryBadge}>
              <View
                style={[styles.categoryDot, { backgroundColor: course.color }]}
              />
              <AppLabel color={colors.text}>{course.category}</AppLabel>
            </View>

            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                toggleSaved(course.id);
              }}
              hitSlop={10}
              style={styles.bookmarkButton}
            >
              <Ionicons
                name={isSaved ? "bookmark" : "bookmark-outline"}
                size={19}
                color={isSaved ? colors.indigo : colors.text}
              />
            </Pressable>
          </View>

          <View style={styles.artworkDecoration}>
            <Ionicons
              name={course.icon as keyof typeof Ionicons.glyphMap}
              size={76}
              color={`${course.color}35`}
            />
          </View>
        </View>

        <View style={styles.courseInfo}>
          <View style={styles.courseMetaRow}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={13} color="#F59E0B" />
              <AppLabel color={colors.text}>
                {course.rating.toFixed(1)}
              </AppLabel>
              <AppLabel color={colors.muted}>
                ({course.students} students)
              </AppLabel>
            </View>

            <AppLabel color={colors.muted}>{course.duration}</AppLabel>
          </View>

          <AppTitle>{course.title}</AppTitle>

          <AppLabel color={colors.muted}>By {course.instructor}</AppLabel>

          <View style={styles.courseBottomRow}>
            <View style={styles.priceRow}>
              {course.isFree ? (
                <AppTitle color="#10B981">Free</AppTitle>
              ) : (
                <>
                  <AppTitle>₹{course.price}</AppTitle>
                  <AppLabel color={colors.muted} strike>
                    ₹{course.originalPrice}
                  </AppLabel>
                </>
              )}
            </View>

            <View style={styles.levelBadge}>
              <AppLabel color={colors.muted}>{course.level}</AppLabel>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <AnimatedSection delay={0}>
          <View style={styles.header}>
            <View>
              <AppLabel color={colors.muted}>LEARN SOMETHING NEW</AppLabel>
              <AppTitle size={27}>Explore Courses</AppTitle>
              <AppLabel color={colors.muted}>
                Build skills. Shape your future.
              </AppLabel>
            </View>

            <Pressable
              style={styles.headerIconButton}
              onPress={() =>
                Alert.alert(
                  "My learning",
                  "Your enrolled courses will appear here.",
                )
              }
            >
              <Ionicons name="book-outline" size={22} color={colors.text} />
            </Pressable>
          </View>
        </AnimatedSection>

        {/* Search */}
        <AnimatedSection delay={60}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color={colors.muted} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search courses, skills, instructors..."
              placeholderTextColor={colors.muted}
              style={styles.searchInput}
              returnKeyType="search"
            />
            {search.length > 0 && (
              <Pressable onPress={() => setSearch("")}>
                <Ionicons name="close-circle" size={19} color={colors.muted} />
              </Pressable>
            )}
          </View>
        </AnimatedSection>

        {/* Featured course */}
        {featuredCourse && !search && selectedCategory === "All" && (
          <AnimatedSection delay={120}>
            <View style={styles.sectionHeader}>
              <AppTitle size={19}>Featured course</AppTitle>
              <View style={styles.featuredTag}>
                <Ionicons name="sparkles" size={12} color="#F59E0B" />
                <AppLabel color="#F59E0B">Editor's pick</AppLabel>
              </View>
            </View>

            <Pressable
              onPress={() => openCourse(featuredCourse)}
              style={({ pressed }) => [
                styles.featuredCard,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.featuredTop}>
                <View style={styles.featuredPill}>
                  <Ionicons name="trending-up" size={13} color="#FFFFFF" />
                  <AppLabel color="#FFFFFF">POPULAR THIS WEEK</AppLabel>
                </View>

                <Ionicons name="arrow-up-right-box" size={23} color="#FFFFFF" />
              </View>

              <View style={styles.featuredArtwork}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={86}
                  color="rgba(255,255,255,0.20)"
                />
                <View style={styles.featuredFloatingIcon}>
                  <Ionicons name="code-slash" size={23} color="#FFFFFF" />
                </View>
              </View>

              <AppLabel color="#E0E7FF">DEVELOPMENT • BEGINNER</AppLabel>

              <AppTitle color="#FFFFFF" size={23}>
                React Native Masterclass
              </AppTitle>

              <AppLabel color="#E0E7FF">
                Build real-world mobile apps from scratch.
              </AppLabel>

              <View style={styles.featuredBottom}>
                <View>
                  <View style={styles.featuredRating}>
                    <Ionicons name="star" size={14} color="#FDE68A" />
                    <AppLabel color="#FFFFFF">4.8</AppLabel>
                    <AppLabel color="#E0E7FF"> • 1.2k students</AppLabel>
                  </View>
                  <AppTitle color="#FFFFFF" size={21}>
                    ₹499{" "}
                    <AppLabel color="#C7D2FE" strike>
                      ₹999
                    </AppLabel>
                  </AppTitle>
                </View>

                <View style={styles.featuredButton}>
                  <AppLabel color="#4338CA">Explore</AppLabel>
                  <Ionicons name="arrow-forward" size={15} color="#4338CA" />
                </View>
              </View>
            </Pressable>
          </AnimatedSection>
        )}

        {/* Categories */}
        <AnimatedSection delay={180}>
          <View style={styles.sectionHeader}>
            <AppTitle size={19}>Browse categories</AppTitle>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            <Pressable
              onPress={() => setSelectedCategory("All")}
              style={[
                styles.categoryCard,
                selectedCategory === "All" && styles.categoryCardActive,
              ]}
            >
              <View
                style={[
                  styles.categoryIcon,
                  {
                    backgroundColor:
                      selectedCategory === "All"
                        ? "rgba(255,255,255,0.18)"
                        : colors.primaryLight,
                  },
                ]}
              >
                <Ionicons
                  name="apps-outline"
                  size={21}
                  color={selectedCategory === "All" ? "#FFFFFF" : colors.indigo}
                />
              </View>
              <AppLabel
                color={selectedCategory === "All" ? "#FFFFFF" : colors.text}
              >
                All
              </AppLabel>
            </Pressable>

            {courseCategories.map((category) => {
              const active = selectedCategory === category.label;

              return (
                <Pressable
                  key={category.label}
                  onPress={() => setSelectedCategory(category.label)}
                  style={[
                    styles.categoryCard,
                    active && styles.categoryCardActive,
                  ]}
                >
                  <View
                    style={[
                      styles.categoryIcon,
                      {
                        backgroundColor: active
                          ? "rgba(255,255,255,0.18)"
                          : `${category.color}18`,
                      },
                    ]}
                  >
                    <Ionicons
                      name={category.icon as keyof typeof Ionicons.glyphMap}
                      size={21}
                      color={active ? "#FFFFFF" : category.color}
                    />
                  </View>
                  <AppLabel color={active ? "#FFFFFF" : colors.text}>
                    {category.label}
                  </AppLabel>
                </Pressable>
              );
            })}
          </ScrollView>
        </AnimatedSection>

        {/* Course discovery */}
        <AnimatedSection delay={240}>
          <View style={styles.sectionHeader}>
            <View>
              <AppTitle size={19}>Discover courses</AppTitle>
              <AppLabel color={colors.muted}>
                Find the right course for your goals
              </AppLabel>
            </View>

            <AppLabel color={colors.indigo}>
              {filteredCourses.length} courses
            </AppLabel>
          </View>

          <View style={styles.filterRow}>
            {(["All", "Free", "Paid"] as const).map((filter) => {
              const active = selectedFilter === filter;

              return (
                <Pressable
                  key={filter}
                  onPress={() => setSelectedFilter(filter)}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                >
                  <AppLabel color={active ? "#FFFFFF" : colors.muted}>
                    {filter === "All" ? "All courses" : filter}
                  </AppLabel>
                </Pressable>
              );
            })}
          </View>

          {filteredCourses.length > 0 ? (
            <View style={styles.courseList}>
              {filteredCourses.map(renderCourseCard)}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={34} color={colors.muted} />
              <AppTitle size={17}>No courses found</AppTitle>
              <AppLabel color={colors.muted}>
                Try another search or category.
              </AppLabel>
              <Pressable
                onPress={() => {
                  setSearch("");
                  setSelectedCategory("All");
                  setSelectedFilter("All");
                }}
              >
                <AppLabel color={colors.indigo}>Clear filters</AppLabel>
              </Pressable>
            </View>
          )}
        </AnimatedSection>

        {/* My learning preview */}
        <AnimatedSection delay={300}>
          <View style={styles.learningCard}>
            <View style={styles.learningIcon}>
              <Ionicons name="school-outline" size={25} color={colors.indigo} />
            </View>

            <View style={styles.learningText}>
              <AppTitle size={17}>Your learning journey</AppTitle>
              <AppLabel color={colors.muted}>
                Enroll in a course to track your progress and continue learning.
              </AppLabel>
            </View>

            <Ionicons
              name="arrow-forward-circle-outline"
              size={25}
              color={colors.indigo}
            />
          </View>
        </AnimatedSection>

        <View style={styles.footer}>
          <AppLabel color={colors.muted}>
            Learn today. Lead tomorrow. ✨
          </AppLabel>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* Small local text helpers */

function AppTitle({
  children,
  size = 16,
  color,
}: {
  children: React.ReactNode;
  size?: number;
  color?: string;
}) {
  const { colors } = useAppTheme();

  return (
    <View>
      <Text
        style={{
          color: color ?? colors.text,
          fontSize: size,
          fontWeight: "800",
          letterSpacing: -0.5,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

function AppLabel({
  children,
  color,
  strike = false,
}: {
  children: React.ReactNode;
  color?: string;
  strike?: boolean;
}) {
  const { colors } = useAppTheme();

  return (
    <Text
      style={{
        color: color ?? colors.text,
        fontSize: 12,
        fontWeight: "500",
        textDecorationLine: strike ? "line-through" : "none",
      }}
    >
      {children}
    </Text>
  );
}

function createStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 35,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 22,
    },
    headerIconButton: {
      width: 46,
      height: 46,
      borderRadius: 16,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    searchContainer: {
      height: 54,
      borderRadius: 17,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 15,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 25,
    },
    searchInput: {
      flex: 1,
      color: colors.text,
      fontSize: 13,
      paddingVertical: 0,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
      marginTop: 8,
    },
    featuredTag: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: "#F59E0B18",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 20,
    },
    featuredCard: {
      backgroundColor: "#4338CA",
      borderRadius: 25,
      padding: 19,
      overflow: "hidden",
      marginBottom: 27,
    },
    featuredTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    featuredPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
    featuredArtwork: {
      height: 95,
      alignItems: "flex-end",
      justifyContent: "center",
      paddingRight: 17,
    },
    featuredFloatingIcon: {
      position: "absolute",
      right: 65,
      top: 29,
      width: 43,
      height: 43,
      borderRadius: 15,
      backgroundColor: "#6366F1",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.25)",
    },
    featuredBottom: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginTop: 17,
    },
    featuredRating: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginBottom: 7,
    },
    featuredButton: {
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 14,
      paddingVertical: 11,
      borderRadius: 13,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    categoriesContainer: {
      gap: 10,
      paddingBottom: 23,
    },
    categoryCard: {
      minWidth: 94,
      height: 100,
      borderRadius: 18,
      padding: 11,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    categoryCardActive: {
      backgroundColor: colors.indigo,
      borderColor: colors.indigo,
    },
    categoryIcon: {
      width: 39,
      height: 39,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    filterRow: {
      flexDirection: "row",
      gap: 9,
      marginBottom: 15,
    },
    filterChip: {
      paddingHorizontal: 16,
      paddingVertical: 9,
      borderRadius: 30,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    filterChipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    courseList: {
      gap: 15,
    },
    courseCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 21,
      overflow: "hidden",
    },
    courseArtwork: {
      height: 135,
      padding: 13,
      justifyContent: "space-between",
      overflow: "hidden",
    },
    courseIconCircle: {
      width: 53,
      height: 53,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
    },
    artworkTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    categoryBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.card,
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
    categoryDot: {
      width: 7,
      height: 7,
      borderRadius: 5,
    },
    bookmarkButton: {
      width: 35,
      height: 35,
      borderRadius: 12,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
    },
    artworkDecoration: {
      position: "absolute",
      right: 18,
      bottom: -12,
    },
    courseInfo: {
      padding: 15,
    },
    courseMetaRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    courseBottomRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 14,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    priceRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    levelBadge: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 10,
      backgroundColor: colors.input,
    },
    pressed: {
      opacity: 0.88,
      transform: [{ scale: 0.99 }],
    },
    emptyState: {
      minHeight: 190,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      padding: 20,
    },
    learningCard: {
      marginTop: 25,
      padding: 16,
      borderRadius: 20,
      backgroundColor: colors.primaryLight,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    learningIcon: {
      width: 47,
      height: 47,
      borderRadius: 15,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
    },
    learningText: {
      flex: 1,
      gap: 4,
    },
    footer: {
      alignItems: "center",
      marginTop: 27,
    },
  });
}
