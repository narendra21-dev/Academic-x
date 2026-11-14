import type { ReactNode } from "react";
import { useMemo, useRef, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Animated,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { useAppTheme } from "@/providers/theme-provider";

import {
  jobCategories,
  mockJobs,
  type Job,
  type JobCategory,
  type JobType,
} from "@/features/jobs/data/jobs";

type JobFilter = "All" | JobType;
type MainTab = "Discover" | "Saved" | "Applied";

export default function JobsScreen() {
  const { colors } = useAppTheme();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>("All");
  const [selectedType, setSelectedType] = useState<JobFilter>("All");
  const [activeTab, setActiveTab] = useState<MainTab>("Discover");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const styles = useMemo(() => createStyles(colors), [colors]);

  const featuredJob = mockJobs.find((job) => job.featured);

  const visibleJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesSearch = [
        job.title,
        job.company,
        job.category,
        job.location,
        ...job.skills,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || job.category === selectedCategory;

      const matchesType = selectedType === "All" || job.type === selectedType;

      const matchesTab =
        activeTab === "Discover" ||
        (activeTab === "Saved" && savedJobs.includes(job.id)) ||
        (activeTab === "Applied" && appliedJobs.includes(job.id));

      return matchesSearch && matchesCategory && matchesType && matchesTab;
    });
  }, [
    search,
    selectedCategory,
    selectedType,
    activeTab,
    savedJobs,
    appliedJobs,
  ]);

  const toggleSaved = (jobId: string) => {
    setSavedJobs((current) =>
      current.includes(jobId)
        ? current.filter((id) => id !== jobId)
        : [...current, jobId],
    );
  };

  const applyToJob = (job: Job) => {
    if (appliedJobs.includes(job.id)) {
      Alert.alert(
        "Already applied",
        "This job is already in your applications.",
      );
      return;
    }

    Alert.alert(
      "Apply for this opportunity?",
      `You're about to apply for ${job.title} at ${job.company}.\n\nThis is a UI preview. Actual applications will be connected later.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            setAppliedJobs((current) => [...current, job.id]);
            Alert.alert(
              "Application added",
              "Your application has been added to My Applications (demo).",
            );
          },
        },
      ],
    );
  };

  const openJob = (job: Job) => {
    Alert.alert(
      job.title,
      `${job.company}\n\n${job.description}\n\n` +
        `Type: ${job.type}\n` +
        `Location: ${job.location}\n` +
        `Salary: ${job.salary}\n` +
        `Experience: ${job.experience}\n\n` +
        `Skills: ${job.skills.join(", ")}`,
      [
        { text: "Close", style: "cancel" },
        {
          text: appliedJobs.includes(job.id) ? "Applied" : "Apply now",
          onPress: () => {
            if (!appliedJobs.includes(job.id)) {
              applyToJob(job);
            }
          },
        },
      ],
    );
  };

  const selectMainTab = (tab: MainTab) => {
    setActiveTab(tab);
    setSelectedCategory("All");
    setSelectedType("All");
  };

  const renderJobCard = (job: Job, index: number) => {
    const isSaved = savedJobs.includes(job.id);
    const isApplied = appliedJobs.includes(job.id);

    return (
      <AnimatedSection key={job.id} delay={Math.min(index * 65, 260)}>
        <View style={styles.jobCard}>
          <View style={styles.jobCardTop}>
            <View
              style={[
                styles.companyLogo,
                { backgroundColor: `${job.color}18` },
              ]}
            >
              <Text style={[styles.companyInitials, { color: job.color }]}>
                {job.companyInitials}
              </Text>
            </View>

            <View style={styles.jobCompanyInfo}>
              <Text style={styles.companyName}>{job.company}</Text>
              <Text style={styles.postedText}>{job.posted}</Text>
            </View>

            <AnimatedIconButton
              icon={isSaved ? "bookmark" : "bookmark-outline"}
              active={isSaved}
              color={colors.indigo}
              onPress={() => toggleSaved(job.id)}
            />
          </View>

          <Pressable
            onPress={() => openJob(job)}
            style={({ pressed }) => [styles.jobBody, pressed && styles.pressed]}
          >
            <Text style={styles.jobTitle}>{job.title}</Text>

            <View style={styles.jobMetaRow}>
              <MetaItem
                icon="location-outline"
                text={job.location}
                color={colors.muted}
              />
              <MetaItem
                icon="briefcase-outline"
                text={job.experience}
                color={colors.muted}
              />
            </View>

            <View style={styles.skillsRow}>
              {job.skills.map((skill) => (
                <View key={skill} style={styles.skillChip}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>

            <View style={styles.jobCardBottom}>
              <View>
                <Text style={styles.salaryLabel}>SALARY / STIPEND</Text>
                <Text style={styles.salaryText}>{job.salary}</Text>
              </View>

              <View style={styles.applyButton}>
                <Text style={styles.applyButtonText}>
                  {isApplied ? "Applied" : "View job"}
                </Text>
                <Ionicons
                  name={isApplied ? "checkmark" : "arrow-up-right-box"}
                  size={15}
                  color={colors.indigo}
                />
              </View>
            </View>
          </Pressable>
        </View>
      </AnimatedSection>
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
            <View style={styles.headerText}>
              <Text style={styles.eyebrow}>YOUR NEXT OPPORTUNITY</Text>
              <Text style={styles.headerTitle}>Career Hub</Text>
              <Text style={styles.headerSubtitle}>
                Discover opportunities. Build your future.
              </Text>
            </View>

            <Pressable
              style={styles.headerIcon}
              onPress={() =>
                Alert.alert(
                  "Career notifications",
                  "Job alerts and notification preferences will be available here.",
                )
              }
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={colors.text}
              />
              <View style={styles.notificationDot} />
            </Pressable>
          </View>
        </AnimatedSection>

        {/* Search */}
        <AnimatedSection delay={60}>
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={20} color={colors.muted} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Job title, company or skill..."
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

        {/* Main navigation */}
        <AnimatedSection delay={100}>
          <View style={styles.mainTabs}>
            {(["Discover", "Saved", "Applied"] as MainTab[]).map((tab) => {
              const active = activeTab === tab;

              const count =
                tab === "Saved"
                  ? savedJobs.length
                  : tab === "Applied"
                    ? appliedJobs.length
                    : undefined;

              return (
                <AnimatedPressable
                  key={tab}
                  onPress={() => selectMainTab(tab)}
                  style={[styles.mainTab, active && styles.mainTabActive]}
                >
                  <Text
                    style={[
                      styles.mainTabText,
                      active && styles.mainTabTextActive,
                    ]}
                  >
                    {tab}
                    {count !== undefined ? ` (${count})` : ""}
                  </Text>
                </AnimatedPressable>
              );
            })}
          </View>
        </AnimatedSection>

        {/* Featured opportunity */}
        {activeTab === "Discover" &&
          featuredJob &&
          !search &&
          selectedCategory === "All" &&
          selectedType === "All" && (
            <AnimatedSection delay={140}>
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>Featured opportunity</Text>
                <View style={styles.featuredBadge}>
                  <Ionicons name="sparkles" size={12} color="#F59E0B" />
                  <Text style={styles.featuredBadgeText}>Featured</Text>
                </View>
              </View>

              <AnimatedPressable
                onPress={() => openJob(featuredJob)}
                style={styles.featuredCard}
              >
                <View style={styles.featuredTop}>
                  <View style={styles.featuredPill}>
                    <Ionicons name="flash" size={13} color="#FFFFFF" />
                    <Text style={styles.featuredPillText}>STUDENT PICK</Text>
                  </View>

                  <Ionicons
                    name="arrow-up-right-box"
                    size={24}
                    color="#FFFFFF"
                  />
                </View>

                <View style={styles.featuredCompanyRow}>
                  <View style={styles.featuredCompanyLogo}>
                    <Text style={styles.featuredCompanyInitials}>TS</Text>
                  </View>
                  <View>
                    <Text style={styles.featuredCompanyName}>
                      {featuredJob.company}
                    </Text>
                    <Text style={styles.featuredCompanyCaption}>
                      Internship opportunity
                    </Text>
                  </View>
                </View>

                <Text style={styles.featuredTitle}>{featuredJob.title}</Text>

                <Text style={styles.featuredDescription}>
                  Get hands-on experience and grow your development skills.
                </Text>

                <View style={styles.featuredInfoRow}>
                  <View style={styles.featuredInfoItem}>
                    <Ionicons
                      name="location-outline"
                      size={14}
                      color="#E0E7FF"
                    />
                    <Text style={styles.featuredInfoText}>
                      {featuredJob.location}
                    </Text>
                  </View>

                  <View style={styles.featuredInfoItem}>
                    <Ionicons name="wallet-outline" size={14} color="#E0E7FF" />
                    <Text style={styles.featuredInfoText}>
                      {featuredJob.salary}
                    </Text>
                  </View>
                </View>

                <View style={styles.featuredBottom}>
                  <Text style={styles.featuredFooterText}>
                    {featuredJob.experience} • {featuredJob.type}
                  </Text>
                  <View style={styles.featuredExplore}>
                    <Text style={styles.featuredExploreText}>Explore</Text>
                    <Ionicons name="arrow-forward" size={15} color="#4338CA" />
                  </View>
                </View>
              </AnimatedPressable>
            </AnimatedSection>
          )}

        {/* Categories */}
        {activeTab === "Discover" && (
          <AnimatedSection delay={190}>
            <View style={styles.sectionHeading}>
              <Text style={styles.sectionTitle}>Explore by category</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesRow}
            >
              <AnimatedPressable
                onPress={() => setSelectedCategory("All")}
                style={[
                  styles.categoryCard,
                  selectedCategory === "All" && styles.categoryCardActive,
                ]}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    selectedCategory === "All" && styles.categoryIconActive,
                  ]}
                >
                  <Ionicons
                    name="apps-outline"
                    size={21}
                    color={
                      selectedCategory === "All" ? "#FFFFFF" : colors.indigo
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.categoryLabel,
                    selectedCategory === "All" && styles.categoryLabelActive,
                  ]}
                >
                  All
                </Text>
              </AnimatedPressable>

              {jobCategories.map((category) => {
                const active = selectedCategory === category.label;

                return (
                  <AnimatedPressable
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

                    <Text
                      style={[
                        styles.categoryLabel,
                        active && styles.categoryLabelActive,
                      ]}
                    >
                      {category.label}
                    </Text>
                  </AnimatedPressable>
                );
              })}
            </ScrollView>
          </AnimatedSection>
        )}

        {/* Job type filters */}
        {activeTab === "Discover" && (
          <AnimatedSection delay={230}>
            <View style={styles.filterHeading}>
              <Text style={styles.sectionTitle}>Job type</Text>
            </View>

            <View style={styles.filtersRow}>
              {(
                ["All", "Internship", "Full-time", "Part-time"] as JobFilter[]
              ).map((filter) => {
                const active = selectedType === filter;

                return (
                  <AnimatedPressable
                    key={filter}
                    onPress={() => setSelectedType(filter)}
                    style={[
                      styles.filterChip,
                      active && styles.filterChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        active && styles.filterTextActive,
                      ]}
                    >
                      {filter}
                    </Text>
                  </AnimatedPressable>
                );
              })}
            </View>
          </AnimatedSection>
        )}

        {/* Job list */}
        <AnimatedSection delay={270}>
          <View style={styles.listHeading}>
            <View>
              <Text style={styles.sectionTitle}>
                {activeTab === "Saved"
                  ? "Saved opportunities"
                  : activeTab === "Applied"
                    ? "My applications"
                    : "Recommended for you"}
              </Text>
              <Text style={styles.sectionSubtitle}>
                {visibleJobs.length} opportunities found
              </Text>
            </View>

            {activeTab === "Discover" && (
              <Pressable
                onPress={() => {
                  setSelectedCategory("All");
                  setSelectedType("All");
                  setSearch("");
                }}
              >
                <Text style={styles.clearText}>Reset</Text>
              </Pressable>
            )}
          </View>

          {visibleJobs.length > 0 ? (
            <View style={styles.jobsList}>
              {visibleJobs.map(renderJobCard)}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name={
                    activeTab === "Saved"
                      ? "bookmark-outline"
                      : activeTab === "Applied"
                        ? "document-text-outline"
                        : "search-outline"
                  }
                  size={30}
                  color={colors.indigo}
                />
              </View>

              <Text style={styles.emptyTitle}>
                {activeTab === "Saved"
                  ? "No saved jobs yet"
                  : activeTab === "Applied"
                    ? "No applications yet"
                    : "No opportunities found"}
              </Text>

              <Text style={styles.emptyDescription}>
                {activeTab === "Saved"
                  ? "Bookmark jobs that interest you and find them here."
                  : activeTab === "Applied"
                    ? "Your applied opportunities will appear here."
                    : "Try changing your search or filters."}
              </Text>

              <Pressable
                onPress={() => {
                  setSearch("");
                  setSelectedCategory("All");
                  setSelectedType("All");
                  setActiveTab("Discover");
                }}
                style={styles.emptyAction}
              >
                <Text style={styles.emptyActionText}>
                  Explore opportunities
                </Text>
              </Pressable>
            </View>
          )}
        </AnimatedSection>

        {/* Career footer */}
        <AnimatedSection delay={320}>
          <View style={styles.careerFooter}>
            <Ionicons name="rocket-outline" size={24} color={colors.indigo} />
            <View style={styles.careerFooterText}>
              <Text style={styles.careerFooterTitle}>
                Your career starts here
              </Text>
              <Text style={styles.careerFooterSubtitle}>
                Keep learning, keep growing, and stay curious.
              </Text>
            </View>
          </View>
        </AnimatedSection>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Opportunities for the next generation. ✨
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* Reusable animated pressable */

function AnimatedPressable({
  children,
  onPress,
  style,
}: {
  children: ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      speed: 28,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ scale }],
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() => animate(0.97)}
        onPressOut={() => animate(1)}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

/* Animated bookmark */

function AnimatedIconButton({
  icon,
  active,
  color,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  active: boolean;
  color: string;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.3,
        useNativeDriver: true,
        speed: 35,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 25,
      }),
    ]).start();

    onPress();
  };

  return (
    <Pressable onPress={handlePress} hitSlop={10} style={iconButtonStyle}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Ionicons name={icon} size={21} color={active ? color : color} />
      </Animated.View>
    </Pressable>
  );
}

/* Small reusable metadata item */

function MetaItem({
  icon,
  text,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  color: string;
}) {
  return (
    <View style={metaItemStyle}>
      <Ionicons name={icon} size={14} color={color} />
      <Text style={[metaTextStyle, { color }]}>{text}</Text>
    </View>
  );
}

const iconButtonStyle = {
  width: 38,
  height: 38,
  borderRadius: 13,
  alignItems: "center" as const,
  justifyContent: "center" as const,
};

const metaItemStyle = {
  flexDirection: "row" as const,
  alignItems: "center" as const,
  gap: 5,
};

const metaTextStyle = {
  fontSize: 11,
  fontWeight: "500" as const,
};

/* Screen styles */

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
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 21,
    },
    headerText: {
      flex: 1,
      gap: 4,
    },
    eyebrow: {
      fontSize: 10,
      fontWeight: "800",
      color: colors.indigo,
      letterSpacing: 1.2,
    },
    headerTitle: {
      color: colors.text,
      fontSize: 28,
      fontWeight: "800",
      letterSpacing: -0.8,
    },
    headerSubtitle: {
      color: colors.muted,
      fontSize: 12,
      marginTop: 2,
    },
    headerIcon: {
      width: 46,
      height: 46,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
    },
    notificationDot: {
      position: "absolute",
      top: 10,
      right: 11,
      width: 7,
      height: 7,
      borderRadius: 5,
      backgroundColor: "#EF4444",
    },
    searchBox: {
      height: 53,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 15,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 17,
      marginBottom: 18,
    },
    searchInput: {
      flex: 1,
      color: colors.text,
      fontSize: 13,
      paddingVertical: 0,
    },
    mainTabs: {
      flexDirection: "row",
      backgroundColor: colors.input,
      borderRadius: 15,
      padding: 4,
      marginBottom: 25,
      gap: 3,
    },
    mainTab: {
      flex: 1,
      minHeight: 39,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      paddingHorizontal: 5,
    },
    mainTabActive: {
      backgroundColor: colors.card,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 5,
      elevation: 2,
    },
    mainTabText: {
      color: colors.muted,
      fontSize: 12,
      fontWeight: "600",
    },
    mainTabTextActive: {
      color: colors.indigo,
      fontWeight: "800",
    },
    sectionHeading: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14,
      marginTop: 5,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "800",
      letterSpacing: -0.4,
    },
    featuredBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: "#F59E0B18",
    },
    featuredBadgeText: {
      color: "#F59E0B",
      fontSize: 10,
      fontWeight: "800",
    },
    featuredCard: {
      backgroundColor: "#4338CA",
      borderRadius: 24,
      padding: 18,
      marginBottom: 27,
      overflow: "hidden",
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
      backgroundColor: "rgba(255,255,255,0.16)",
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
    featuredPillText: {
      color: "#FFFFFF",
      fontSize: 9,
      fontWeight: "800",
      letterSpacing: 0.6,
    },
    featuredCompanyRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      marginTop: 20,
      marginBottom: 15,
    },
    featuredCompanyLogo: {
      width: 42,
      height: 42,
      borderRadius: 13,
      backgroundColor: "rgba(255,255,255,0.18)",
      alignItems: "center",
      justifyContent: "center",
    },
    featuredCompanyInitials: {
      color: "#FFFFFF",
      fontWeight: "800",
      fontSize: 14,
    },
    featuredCompanyName: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 13,
    },
    featuredCompanyCaption: {
      color: "#C7D2FE",
      fontSize: 10,
      marginTop: 3,
    },
    featuredTitle: {
      color: "#FFFFFF",
      fontSize: 22,
      fontWeight: "800",
      letterSpacing: -0.5,
    },
    featuredDescription: {
      color: "#E0E7FF",
      fontSize: 12,
      lineHeight: 19,
      marginTop: 6,
    },
    featuredInfoRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 13,
      marginTop: 18,
    },
    featuredInfoItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    featuredInfoText: {
      color: "#E0E7FF",
      fontSize: 10,
      fontWeight: "600",
    },
    featuredBottom: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 19,
      paddingTop: 14,
      borderTopWidth: 1,
      borderTopColor: "rgba(255,255,255,0.18)",
    },
    featuredFooterText: {
      color: "#E0E7FF",
      fontSize: 11,
      fontWeight: "600",
    },
    featuredExplore: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 13,
      paddingVertical: 10,
      borderRadius: 12,
    },
    featuredExploreText: {
      color: "#4338CA",
      fontSize: 11,
      fontWeight: "800",
    },
    categoriesRow: {
      gap: 10,
      paddingBottom: 22,
    },
    categoryCard: {
      width: 96,
      minHeight: 98,
      borderRadius: 17,
      padding: 10,
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
      backgroundColor: colors.primaryLight,
      alignItems: "center",
      justifyContent: "center",
    },
    categoryIconActive: {
      backgroundColor: "rgba(255,255,255,0.18)",
    },
    categoryLabel: {
      color: colors.text,
      fontSize: 10,
      fontWeight: "700",
      textAlign: "center",
    },
    categoryLabelActive: {
      color: "#FFFFFF",
    },
    filterHeading: {
      marginBottom: 12,
    },
    filtersRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 23,
    },
    filterChip: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      borderRadius: 30,
      paddingHorizontal: 13,
      paddingVertical: 9,
    },
    filterChipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterText: {
      color: colors.muted,
      fontSize: 11,
      fontWeight: "700",
    },
    filterTextActive: {
      color: colors.background,
    },
    listHeading: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14,
    },
    sectionSubtitle: {
      color: colors.muted,
      fontSize: 11,
      marginTop: 4,
    },
    clearText: {
      color: colors.indigo,
      fontSize: 12,
      fontWeight: "700",
    },
    jobsList: {
      gap: 13,
    },
    jobCard: {
      borderRadius: 20,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
    },
    jobCardTop: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    companyLogo: {
      width: 45,
      height: 45,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    companyInitials: {
      fontSize: 14,
      fontWeight: "900",
    },
    jobCompanyInfo: {
      flex: 1,
      marginLeft: 11,
      gap: 4,
    },
    companyName: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "800",
    },
    postedText: {
      color: colors.muted,
      fontSize: 10,
    },
    jobBody: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 13,
    },
    jobTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "800",
      letterSpacing: -0.3,
    },
    jobMetaRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 13,
      marginTop: 10,
    },
    skillsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 7,
      marginTop: 13,
    },
    skillChip: {
      backgroundColor: colors.input,
      paddingHorizontal: 9,
      paddingVertical: 6,
      borderRadius: 8,
    },
    skillText: {
      color: colors.muted,
      fontSize: 10,
      fontWeight: "600",
    },
    jobCardBottom: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 15,
      paddingTop: 13,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    salaryLabel: {
      color: colors.muted,
      fontSize: 9,
      fontWeight: "700",
      letterSpacing: 0.6,
    },
    salaryText: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "800",
      marginTop: 4,
    },
    applyButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 11,
      paddingVertical: 9,
      borderRadius: 11,
      backgroundColor: colors.primaryLight,
    },
    applyButtonText: {
      color: colors.indigo,
      fontSize: 11,
      fontWeight: "800",
    },
    pressed: {
      opacity: 0.8,
    },
    emptyState: {
      minHeight: 230,
      backgroundColor: colors.card,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      padding: 22,
      gap: 10,
    },
    emptyIcon: {
      width: 58,
      height: 58,
      borderRadius: 19,
      backgroundColor: colors.primaryLight,
      alignItems: "center",
      justifyContent: "center",
    },
    emptyTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "800",
    },
    emptyDescription: {
      color: colors.muted,
      fontSize: 12,
      textAlign: "center",
      lineHeight: 19,
    },
    emptyAction: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginTop: 5,
    },
    emptyActionText: {
      color: colors.background,
      fontSize: 11,
      fontWeight: "800",
    },
    careerFooter: {
      marginTop: 25,
      padding: 16,
      borderRadius: 19,
      backgroundColor: colors.primaryLight,
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
    },
    careerFooterText: {
      flex: 1,
      gap: 4,
    },
    careerFooterTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "800",
    },
    careerFooterSubtitle: {
      color: colors.muted,
      fontSize: 11,
      lineHeight: 17,
    },
    footer: {
      alignItems: "center",
      marginTop: 26,
    },
    footerText: {
      color: colors.muted,
      fontSize: 11,
    },
  });
}
