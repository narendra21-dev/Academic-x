import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PressableScale from "@/components/ui/PressableScale";
import { useCommunity } from "@/features/community/providers/community-provider";
import { useAppTheme } from "@/providers/theme-provider";

export default function PostCommentsScreen() {
  const router = useRouter();
  const { postid } = useLocalSearchParams<{
    postid: string;
  }>();
  const { colors, isDark } = useAppTheme();
  const { posts, commentsByPost, addComment } = useCommunity();
  const [draft, setDraft] = useState("");

  const post = posts.find((item) => item.id === postid);
  const comments = postid ? (commentsByPost[postid] ?? []) : [];

  //   const post = posts.find((item) => item.id === postId);
  //   console.log("Route postId:", postId);
  //   console.log(
  //     "Available post IDs:",
  //     posts.map((post) => post.id),
  //   );
  //   const comments = postId ? (commentsByPost[postId] ?? []) : [];

  const handleSend = () => {
    // if (!postId || !draft.trim()) return;

    // addComment(postId, draft);

    if (!postid) return;

    addComment(postid, draft.trim());
    setDraft("");
  };

  if (!post) {
    return (
      <SafeAreaView
        style={[styles.screen, { backgroundColor: colors.background }]}
      >
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

        <View style={styles.topBar}>
          <PressableScale
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </PressableScale>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Discussion
          </Text>
        </View>

        <View style={styles.centerMessage}>
          <Ionicons
            name="document-text-outline"
            size={34}
            color={colors.muted}
          />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Post not found
          </Text>
          <Text style={[styles.emptyDescription, { color: colors.muted }]}>
            This post may have been removed.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
          <PressableScale
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </PressableScale>

          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Discussion
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
              {comments.length} new{" "}
              {comments.length === 1 ? "comment" : "comments"}
            </Text>
          </View>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={
            Platform.OS === "ios" ? "interactive" : "on-drag"
          }
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.postCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.authorRow}>
              <View
                style={[styles.avatar, { backgroundColor: post.avatarColor }]}
              >
                <Text style={styles.avatarText}>{post.initials}</Text>
              </View>

              <View style={styles.authorInfo}>
                <View style={styles.nameRow}>
                  <Text style={[styles.authorName, { color: colors.text }]}>
                    {post.author}
                  </Text>
                  {post.verified && (
                    <Ionicons
                      name="checkmark-circle"
                      size={15}
                      color={colors.indigo}
                    />
                  )}
                </View>
                <Text style={[styles.authorMeta, { color: colors.muted }]}>
                  {post.college} · {post.time}
                </Text>
              </View>
            </View>

            <Text style={[styles.postContent, { color: colors.text }]}>
              {post.content}
            </Text>

            <View style={[styles.postStats, { borderTopColor: colors.border }]}>
              <Text style={[styles.statText, { color: colors.muted }]}>
                {post.likes} likes
              </Text>
              <Text style={[styles.statText, { color: colors.muted }]}>
                {post.comments} comments
              </Text>
            </View>
          </View>

          <View style={styles.commentsHeading}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Comments
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>
              Join the conversation
            </Text>
          </View>

          {comments.length === 0 ? (
            <View style={styles.emptyComments}>
              <View
                style={[
                  styles.emptyIcon,
                  { backgroundColor: colors.primaryLight },
                ]}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={25}
                  color={colors.indigo}
                />
              </View>

              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                No new comments yet
              </Text>
              <Text style={[styles.emptyDescription, { color: colors.muted }]}>
                Add a comment to continue this conversation.
              </Text>
            </View>
          ) : (
            <View style={styles.commentList}>
              {comments.map((comment) => (
                <View key={comment.id} style={styles.commentRow}>
                  <View
                    style={[
                      styles.commentAvatar,
                      { backgroundColor: comment.avatarColor },
                    ]}
                  >
                    <Text style={styles.avatarText}>{comment.initials}</Text>
                  </View>

                  <View
                    style={[
                      styles.commentBubble,
                      {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <View style={styles.commentMeta}>
                      <Text
                        style={[styles.commentAuthor, { color: colors.text }]}
                      >
                        {comment.author}
                      </Text>
                      <Text
                        style={[styles.commentTime, { color: colors.muted }]}
                      >
                        {comment.time}
                      </Text>
                    </View>

                    <Text
                      style={[styles.commentContent, { color: colors.text }]}
                    >
                      {comment.content}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <View
          style={[
            styles.composer,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colors.input,
                borderColor: colors.border,
                justifyContent: draft.trim() ? "space-between" : "flex-start",
              },
            ]}
          >
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Write a thoughtful comment..."
              placeholderTextColor={colors.muted}
              multiline
              maxLength={500}
              style={[styles.input, { color: colors.text }]}
              textAlignVertical="center"
            />

            <Pressable
              onPress={handleSend}
              disabled={!draft.trim()}
              accessibilityRole="button"
              accessibilityLabel="Send comment"
              style={[
                styles.sendButton,
                {
                  backgroundColor: draft.trim() ? colors.indigo : colors.border,
                },
              ]}
            >
              <Ionicons name="arrow-up" size={19} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  topBar: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
  },
  headerSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 28,
  },
  postCard: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "800",
  },
  authorInfo: {
    flex: 1,
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
  authorMeta: {
    fontSize: 10,
    marginTop: 3,
  },
  postContent: {
    fontSize: 13,
    lineHeight: 21,
    marginTop: 15,
  },
  postStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 15,
    paddingTop: 12,
  },
  statText: {
    fontSize: 11,
    fontWeight: "600",
  },
  commentsHeading: {
    marginTop: 26,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
  },
  sectionSubtitle: {
    fontSize: 11,
    marginTop: 4,
  },
  emptyComments: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 42,
  },
  emptyIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 6,
  },
  commentList: {
    gap: 16,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  commentAvatar: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  commentBubble: {
    flex: 1,
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
  },
  commentMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  commentAuthor: {
    fontSize: 12,
    fontWeight: "800",
  },
  commentTime: {
    fontSize: 10,
  },
  commentContent: {
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
  },
  composer: {
    // paddingHorizontal: 16,
    // paddingTop: 12,
    // paddingBottom: Platform.OS === "ios" ? 12 : 10,
    // borderTopWidth: StyleSheet.hairlineWidth,

    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  inputContainer: {
    minHeight: 48,
    maxHeight: 116,
    borderWidth: 1,
    borderRadius: 17,
    paddingLeft: 14,
    paddingRight: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 100,
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  centerMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
});
