import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnimatedSection from "@/components/ui/AnimatedSection";
import PressableScale from "@/components/ui/PressableScale";
import { useAppTheme } from "@/providers/theme-provider";

import { useCommunity } from "@/features/community/providers/community-provider";
import CareerSection, {
  type CareerOpportunity,
} from "@/features/home/components/CareerSection";
import CommunityFeedSection from "@/features/home/components/CommunityFeedSection";
import HomeHeader from "@/features/home/components/HomeHeader";
import QuickActionsSection from "@/features/home/components/QuickActionsSection";
import StoriesSection from "@/features/home/components/StoriesSection";
import StoryViewer from "@/features/home/components/StoryViewer";
import TrendingCoursesSection, {
  type TrendingCourse,
} from "@/features/home/components/TrendingCoursesSection";

// Temporary sample data.
// Later, these arrays will be replaced with API responses.

// const COMMUNITY_POSTS: CommunityPost[] = [
//   {
//     id: "post-1",
//     author: "Rahul Sharma",
//     initials: "RS",
//     college: "University Student",
//     time: "2 hours ago",
//     content:
//       "Completed my React Native project! Excited to share my learning journey with everyone.",
//     likes: 24,
//     comments: 8,
//     avatarColor: "#DBEAFE",
//     verified: true,
//   },
//   {
//     id: "post-2",
//     author: "Rahul Sharma",
//     initials: "RS",
//     college: "University Student",
//     time: "2 hours ago",
//     content:
//       "Completed my React Native project! Excited to share my learning journey with everyone. Completed another feature today and learned a lot about animations, components, and state management.",
//     likes: 24,
//     comments: 8,
//     avatarColor: "#DBEAFE",
//     verified: true,
//   },
// ];

const TRENDING_COURSES: TrendingCourse[] = [
  {
    id: "course-1",
    title: "React Native Masterclass",
    category: "Development",
    instructor: "Academic-X Team",
    price: "₹499",
    originalPrice: "₹999",
    rating: "4.8",
    students: "1.2k students",
    icon: "phone-portrait-outline",
    accentColor: "#6366F1",
    backgroundColor: "#E0E7FF",
  },
  {
    id: "course-2",
    title: "UI/UX Design Basics",
    category: "Design",
    instructor: "Academic-X Team",
    price: "₹299",
    originalPrice: "₹599",
    rating: "4.7",
    students: "850 students",
    icon: "color-palette-outline",
    accentColor: "#DB2777",
    backgroundColor: "#FCE7F3",
  },
];

const CAREER_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: "job-1",
    title: "React Native Developer",
    company: "Tech Solutions",
    location: "Jaipur, Rajasthan",
    salary: "₹10k–15k/month",
    employmentType: "Internship",
    companyInitials: "TS",
    companyColor: "#6366F1",
    postedAt: "2 days ago",
  },
  {
    id: "job-2",
    title: "Frontend Developer",
    company: "Digital Labs",
    location: "Jaipur, Rajasthan",
    salary: "₹3–5 LPA",
    employmentType: "Full-time",
    companyInitials: "DL",
    companyColor: "#059669",
    postedAt: "1 day ago",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { isDark, colors } = useAppTheme();

  // const [communityPosts, setCommunityPosts] =
  //   useState<CommunityPost[]>(COMMUNITY_POSTS);

  const [storyViewerVisible, setStoryViewerVisible] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const { posts: communityPosts, toggleLike } = useCommunity();

  // const handleLikePost = (postId: string) => {
  //   setCommunityPosts((currentPosts) =>
  //     currentPosts.map((post) => {
  //       if (post.id !== postId) return post;

  //       const isLiked = !post.isLiked;

  //       return {
  //         ...post,
  //         isLiked,
  //         likes: post.likes + (isLiked ? 1 : -1),
  //       };
  //     }),
  //   );
  // };

  const openStory = (storyId: string) => {
    setActiveStoryId(storyId);
    setStoryViewerVisible(true);
  };

  const closeStoryViewer = () => {
    setStoryViewerVisible(false);
  };

  const goTo = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <AnimatedSection delay={0}>
          <HomeHeader onNotifications={() => goTo("/notifications")} />
        </AnimatedSection>

        {/* Search */}
        <AnimatedSection delay={60}>
          <PressableScale
            onPress={() => goTo("/search")}
            style={[
              styles.searchContainer,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons name="search-outline" size={21} color={colors.muted} />

            <Text style={[styles.searchPlaceholder, { color: colors.muted }]}>
              Search students, courses, jobs...
            </Text>

            <Ionicons name="options-outline" size={21} color={colors.muted} />
          </PressableScale>
        </AnimatedSection>

        {/* Campus Stories */}
        <AnimatedSection delay={120}>
          <StoriesSection
            onSeeAll={() => goTo("/community")}
            onAddStory={() => goTo("/community")}
            onStoryPress={openStory}
          />
        </AnimatedSection>

        {/* Quick Actions */}
        <AnimatedSection delay={180}>
          <QuickActionsSection
            onCommunity={() => goTo("/community")}
            onCourses={() => goTo("/courses")}
            onJobs={() => goTo("/jobs")}
          />
        </AnimatedSection>

        {/* Community Feed */}
        <AnimatedSection delay={240}>
          <CommunityFeedSection
            posts={communityPosts}
            onLike={toggleLike}
            onComment={(postid) => {
              router.push({
                pathname: "/post/[postid]",
                params: {
                  postid: String(postid),
                },
              });
            }}
            onViewAll={() => goTo("/community")}
            onAuthorPress={() => goTo("/profile")}
          />
        </AnimatedSection>

        {/* Trending Courses */}
        <AnimatedSection delay={300}>
          <TrendingCoursesSection
            courses={TRENDING_COURSES}
            onCoursePress={(courseId) => {
              console.log("Open course:", courseId);
            }}
            onSeeAll={() => goTo("/courses")}
          />
        </AnimatedSection>

        {/* Career Opportunities */}
        <AnimatedSection delay={360}>
          <CareerSection
            opportunities={CAREER_OPPORTUNITIES}
            onOpportunityPress={(opportunityId) => {
              console.log("Open opportunity:", opportunityId);
            }}
            onSeeAll={() => goTo("/jobs")}
          />
        </AnimatedSection>

        {/* Footer */}
        <AnimatedSection delay={420}>
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.muted }]}>
              Made for students, built for the future. ✨
            </Text>
          </View>
        </AnimatedSection>
      </ScrollView>

      {/* Full-screen Story Viewer */}
      <StoryViewer
        visible={storyViewerVisible}
        initialStoryId={activeStoryId}
        onClose={closeStoryViewer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 115,
    gap: 25,
  },
  searchContainer: {
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 13,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 11,
  },
});
