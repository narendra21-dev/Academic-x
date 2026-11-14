import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAppTheme } from "@/providers/theme-provider";
import SectionHeader from "./SectionHeader";
import type { CommunityPost } from "@/features/community/types/community";
export type { CommunityPost } from "@/features/community/types/community";


type Props = {
  posts: CommunityPost[];
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onViewAll?: () => void;
  onAuthorPress?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  showHeader?: boolean;
  showCategory?: boolean;
};

type LikeActionProps = {
  post: CommunityPost;
  onLike: (postId: string) => void;
  mutedColor: string;
  activeColor: string;
};

function LikeAction({
  post,
  onLike,
  mutedColor,
  activeColor,
}: LikeActionProps) {
  const heartScale = useRef(new Animated.Value(1)).current;
  const countScale = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    const willLike = !post.isLiked;

    heartScale.stopAnimation();

    if (willLike) {
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1.35,
          duration: 130,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(heartScale, {
          toValue: 1,
          friction: 3,
          tension: 180,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 0.75,
          duration: 90,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(heartScale, {
          toValue: 1,
          friction: 5,
          tension: 160,
          useNativeDriver: true,
        }),
      ]).start();
    }

    countScale.stopAnimation();
    countScale.setValue(0.85);

    Animated.spring(countScale, {
      toValue: 1,
      friction: 5,
      tension: 160,
      useNativeDriver: true,
    }).start();

    onLike(post.id);
  };

  return (
    <Pressable
      style={styles.actionButton}
      onPress={handleLike}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={post.isLiked ? "Unlike post" : "Like post"}
      accessibilityState={{ selected: !!post.isLiked }}
    >
      <Animated.View
        style={{
          transform: [{ scale: heartScale }],
        }}
      >
        <Ionicons
          name={post.isLiked ? "heart" : "heart-outline"}
          size={21}
          color={post.isLiked ? activeColor : mutedColor}
        />
      </Animated.View>

      <Animated.Text
        style={[
          styles.actionText,
          {
            color: mutedColor,
            transform: [{ scale: countScale }],
          },
        ]}
      >
        {post.likes}
      </Animated.Text>
    </Pressable>
  );
}

type PostContentProps = {
  post: CommunityPost;
  onLike: (postId: string) => void;
  textColor: string;
  heartColor: string;
};

function PostContent({
  post,
  onLike,
  textColor,
  heartColor,
}: PostContentProps) {
  const lastTap = useRef(0);
  const heartScale = useRef(new Animated.Value(0.4)).current;
  const heartOpacity = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    const now = Date.now();

    if (now - lastTap.current < 280) {
      lastTap.current = 0;

      heartScale.stopAnimation();
      heartOpacity.stopAnimation();

      heartScale.setValue(0.4);
      heartOpacity.setValue(0);

      Animated.parallel([
        Animated.sequence([
          Animated.spring(heartScale, {
            toValue: 1.15,
            friction: 4,
            tension: 150,
            useNativeDriver: true,
          }),
          Animated.timing(heartScale, {
            toValue: 1.4,
            duration: 180,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(heartOpacity, {
            toValue: 1,
            duration: 120,
            useNativeDriver: true,
          }),
          Animated.delay(180),
          Animated.timing(heartOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();

      // Double-tap never removes an existing like.
      if (!post.isLiked) {
        onLike(post.id);
      }

      return;
    }

    lastTap.current = now;
  };

  return (
    <>
      <Pressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel="Post content. Double tap to like."
        accessibilityHint="Double tap this post to like it"
      >
        <Text style={[styles.content, { color: textColor }]}>
          {post.content}
        </Text>
      </Pressable>

      {/* Full post-card heart overlay */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.heartBurst,
          {
            opacity: heartOpacity,
            transform: [{ scale: heartScale }],
          },
        ]}
      >
        <Ionicons name="heart" size={76} color={heartColor} />
      </Animated.View>
    </>
  );
}

export default function CommunityFeedSection({
  posts,
  onLike,
  onComment,
  onViewAll,
  onAuthorPress,
  onBookmark,
  showHeader = true,
  showCategory = false,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
     {showHeader && onViewAll && (
  <SectionHeader
    title="Community feed"
    subtitle="What's happening in your student community?"
    actionLabel="See all"
    onAction={onViewAll}
  />
)}

      {posts.map((post) => (
        console.log("Rendering post:", post.id,),
        <View
          key={post.id}
          style={[
            styles.postCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          {/* Post author */}
          <View style={styles.postHeader}>
            <Pressable
              style={styles.authorInfo}
              onPress={() => onAuthorPress?.(post.id)}
              accessibilityRole="button"
              accessibilityLabel={`View ${post.author}'s profile`}
            >
              <View
                style={[styles.avatar, { backgroundColor: post.avatarColor }]}
              >
                <Text style={styles.avatarText}>{post.initials}</Text>
              </View>

              <View style={styles.authorDetails}>
                <View style={styles.nameRow}>
                  <Text
                    style={[styles.authorName, { color: colors.text }]}
                    numberOfLines={1}
                  >
                    {post.author}
                  </Text>

                  {post.verified && (
                    <Ionicons
                      name="checkmark-circle"
                      size={14}
                      color={colors.indigo}
                    />
                  )}
                </View>

                <Text
                  style={[styles.college, { color: colors.muted }]}
                  numberOfLines={1}
                >
                  {post.college} · {post.time}
                </Text>
              </View>
            </Pressable>

            <Pressable
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="More post options"
            >
              <Ionicons
                name="ellipsis-horizontal"
                size={21}
                color={colors.muted}
              />
            </Pressable>
          </View>

          {/* Post content and double-tap animation */}
          <PostContent
            post={post}
            onLike={onLike}
            textColor={colors.text}
            heartColor={colors.danger}
          />
          {showCategory && (
  <View
    style={[
      styles.categoryBadge,
      { backgroundColor: colors.primaryLight },
    ]}
  >
    <Text style={[styles.categoryText, { color: colors.indigo }]}>
      {post.category}
    </Text>
  </View>
)}

          {/* Post actions */}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.actions}>
            <LikeAction
              post={post}
              onLike={onLike}
              mutedColor={colors.muted}
              activeColor={colors.danger}
            />

            <Pressable
              style={styles.actionButton}
              onPress={() => onComment(post.id)}
              accessibilityRole="button"
              accessibilityLabel="View comments"
            >
              <Ionicons
                name="chatbubble-outline"
                size={19}
                color={colors.muted}
              />
              <Text style={[styles.actionText, { color: colors.muted }]}>
                {post.comments}
              </Text>
            </Pressable>

{onBookmark && (
  <Pressable
    style={styles.actionButton}
    onPress={() => onBookmark(post.id)}
    accessibilityRole="button"
    accessibilityLabel={
      post.isBookmarked ? "Remove bookmark" : "Bookmark post"
    }
  >
    <Ionicons
      name={post.isBookmarked ? "bookmark" : "bookmark-outline"}
      size={19}
      color={post.isBookmarked ? colors.indigo : colors.muted}
    />
  </Pressable>
)}
            <View style={styles.spacer} />

            <Pressable
              style={styles.actionButton}
              accessibilityRole="button"
              accessibilityLabel="Share post"
            >
              <Ionicons
                name="share-social-outline"
                size={19}
                color={colors.muted}
              />
            </Pressable>

            
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  postCard: {
    position: "relative",
    borderRadius: 18,
    borderWidth: 1,
    padding: 15,
    gap: 14,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  authorInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#334155",
  },
  authorDetails: {
    flex: 1,
    gap: 3,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  authorName: {
    fontSize: 13,
    fontWeight: "800",
  },
  college: {
    fontSize: 10,
  },
  content: {
    fontSize: 13,
    lineHeight: 20,
  },
  heartBurst: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minHeight: 28,
  },
  actionText: {
    fontSize: 11,
    fontWeight: "600",
  },
  spacer: {
    flex: 1,
  },
  categoryBadge: {
  alignSelf: "flex-start",
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 8,
},
categoryText: {
  fontSize: 10,
  fontWeight: "700",
},
});
