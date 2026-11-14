import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnimatedSection from "@/components/ui/AnimatedSection";
import PressableScale from "@/components/ui/PressableScale";
import { useAppTheme } from "@/providers/theme-provider";

import CommunityCategories, {
  type CommunityFilter,
} from "@/features/community/components/CommunityCategories";
import CommunityHeader from "@/features/community/components/CommunityHeader";
import CreatePostCard from "@/features/community/components/CreatePostCard";
import { useCommunity } from "@/features/community/providers/community-provider";
import type { CommunityCategory } from "@/features/community/types/community";
import CommunityFeedSection from "@/features/home/components/CommunityFeedSection";

export default function CommunityScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();

  const { posts, addPost, toggleLike, toggleBookmark } = useCommunity();

  const [selectedCategory, setSelectedCategory] =
    useState<CommunityFilter>("All");

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const matchesSearch =
        !query ||
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.college.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const handleCreatePost = (content: string, category: CommunityCategory) => {
    addPost({ content, category });
    setSelectedCategory("All");
    setSearchQuery("");
  };

  const openNotifications = () => {
    router.push("/notifications" as any);
  };

  const openProfile = () => {
    router.push("/profile" as any);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <AnimatedSection delay={0}>
          <CommunityHeader onNotifications={openNotifications} />
        </AnimatedSection>

        {/* Search */}
        <AnimatedSection delay={50}>
          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons name="search-outline" size={19} color={colors.muted} />

            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search discussions, students..."
              placeholderTextColor={colors.muted}
              returnKeyType="search"
              style={[styles.searchInput, { color: colors.text }]}
            />

            {searchQuery.length > 0 && (
              <PressableScale
                onPress={() => setSearchQuery("")}
                style={styles.clearSearch}
              >
                <Ionicons name="close-circle" size={19} color={colors.muted} />
              </PressableScale>
            )}
          </View>
        </AnimatedSection>

        {/* Create post */}
        <AnimatedSection delay={100}>
          <CreatePostCard onCreate={handleCreatePost} />
        </AnimatedSection>

        {/* Category filters */}
        <AnimatedSection delay={150}>
          <View style={styles.categorySection}>
            <View style={styles.sectionHeading}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Explore
              </Text>
              <Text style={[styles.sectionHint, { color: colors.muted }]}>
                Find your conversation
              </Text>
            </View>

            <CommunityCategories
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </View>
        </AnimatedSection>

        {/* Feed heading */}
        <AnimatedSection delay={200}>
          <View style={styles.feedHeading}>
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {selectedCategory === "All"
                  ? "Latest discussions"
                  : selectedCategory}
              </Text>

              <Text style={[styles.sectionHint, { color: colors.muted }]}>
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "post" : "posts"} found
              </Text>
            </View>

            <PressableScale
              onPress={openProfile}
              style={[
                styles.profileButton,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              accessibilityLabel="Open your profile"
            >
              <Ionicons name="person-outline" size={17} color={colors.text} />
            </PressableScale>
          </View>
        </AnimatedSection>

        {/* Shared community feed */}
        {filteredPosts.length > 0 ? (
          <AnimatedSection delay={240}>
            <CommunityFeedSection
              posts={filteredPosts}
              onLike={toggleLike}
              onComment={(postId) => {
                console.log("Community clicked post:", postId);

                router.push({
                  pathname: "/post/[postid]",
                  params: {
                    postid: String(postId),
                  },
                });
              }}
              onAuthorPress={openProfile}
              onBookmark={toggleBookmark}
              showHeader={false}
              showCategory
            />
          </AnimatedSection>
        ) : (
          <AnimatedSection delay={240}>
            <View
              style={[
                styles.emptyState,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.emptyIcon,
                  { backgroundColor: colors.primaryLight },
                ]}
              >
                <Ionicons
                  name="chatbubbles-outline"
                  size={27}
                  color={colors.indigo}
                />
              </View>

              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                No posts found
              </Text>

              <Text style={[styles.emptyDescription, { color: colors.muted }]}>
                {searchQuery
                  ? "Try a different search term."
                  : "There are no posts in this category yet. Start the conversation!"}
              </Text>

              {(searchQuery || selectedCategory !== "All") && (
                <PressableScale
                  onPress={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  style={[
                    styles.resetButton,
                    { backgroundColor: colors.primaryLight },
                  ]}
                >
                  <Text style={[styles.resetText, { color: colors.indigo }]}>
                    Clear filters
                  </Text>
                </PressableScale>
              )}
            </View>
          </AnimatedSection>
        )}

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.muted }]}>
            A place to learn, share and grow together. ✨
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 120,
    gap: 20,
  },
  searchContainer: {
    minHeight: 49,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    minHeight: 46,
    paddingVertical: 0,
    fontSize: 12,
  },
  clearSearch: {
    padding: 4,
  },
  categorySection: {
    gap: 13,
  },
  sectionHeading: {
    gap: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  sectionHint: {
    fontSize: 11,
    marginTop: 3,
  },
  feedHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileButton: {
    width: 37,
    height: 37,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    borderRadius: 19,
    borderWidth: 1,
    padding: 25,
    alignItems: "center",
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  emptyDescription: {
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 7,
    maxWidth: 260,
  },
  resetButton: {
    marginTop: 17,
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 12,
  },
  resetText: {
    fontSize: 11,
    fontWeight: "800",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 8,
  },
  footerText: {
    fontSize: 10,
  },
});
