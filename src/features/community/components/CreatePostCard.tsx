import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import type { CommunityCategory } from "@/features/community/types/community";
import { useAppTheme } from "@/providers/theme-provider";
// import { COMMUNITY_FILTERS } from "./CommunityCategories";
import {
  COMMUNITY_FILTERS,
} from "./CommunityCategories";

type Props = {
  onCreate: (content: string, category: CommunityCategory) => void;
};

const POST_CATEGORIES = COMMUNITY_FILTERS.filter(
  (category): category is CommunityCategory => category !== "All",
);

export default function CreatePostCard({ onCreate }: Props) {
  const { colors } = useAppTheme();

  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<CommunityCategory>("Discussion");

  const closeComposer = () => {
    setVisible(false);
  };

  const submitPost = () => {
    const trimmedContent = content.trim();

    if (!trimmedContent) return;

    onCreate(trimmedContent, category);
    setContent("");
    setCategory("Discussion");
    closeComposer();
  };

  return (
    <>
      <PressableScale
        onPress={() => setVisible(true)}
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
          <Ionicons name="person" size={17} color={colors.indigo} />
        </View>

        <View style={styles.promptArea}>
          <Text style={[styles.prompt, { color: colors.muted }]}>
            Share something with your community...
          </Text>
        </View>

        <View
          style={[styles.createIcon, { backgroundColor: colors.primaryLight }]}
        >
          <Ionicons name="add" size={21} color={colors.indigo} />
        </View>
      </PressableScale>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={closeComposer}
        statusBarTranslucent
      >
        <View style={[styles.modalRoot, { backgroundColor: colors.overlay }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeComposer} />

          <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Create a post
                </Text>
                <Text style={[styles.modalSubtitle, { color: colors.muted }]}>
                  Share your thoughts with students.
                </Text>
              </View>

              <Pressable onPress={closeComposer} hitSlop={10}>
                <Ionicons name="close" size={24} color={colors.muted} />
              </Pressable>
            </View>

            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="What would you like to share?"
              placeholderTextColor={colors.muted}
              multiline
              maxLength={1000}
              textAlignVertical="top"
              style={[
                styles.input,
                {
                  color: colors.text,
                  backgroundColor: colors.input,
                  borderColor: colors.border,
                },
              ]}
            />

            <View style={styles.characterRow}>
              <Text style={[styles.fieldLabel, { color: colors.muted }]}>
                POST CATEGORY
              </Text>
              <Text style={[styles.characterCount, { color: colors.muted }]}>
                {content.length}/1000
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryRow}
            >
              {POST_CATEGORIES.map((item) => {
                const active = category === item;

                return (
                  <Pressable
                    key={item}
                    onPress={() => setCategory(item)}
                    style={[
                      styles.categoryChip,
                      {
                        backgroundColor: active ? colors.primary : colors.input,
                        borderColor: active ? colors.primary : colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        {
                          color: active
                            ? colors.background === "#090E1A"
                              ? "#090E1A"
                              : "#FFFFFF"
                            : colors.muted,
                        },
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <Pressable
              onPress={submitPost}
              disabled={!content.trim()}
              style={[
                styles.submitButton,
                {
                  backgroundColor: colors.indigo,
                  opacity: content.trim() ? 1 : 0.45,
                },
              ]}
            >
              <Text style={styles.submitText}>Publish post</Text>
              <Ionicons name="arrow-forward" size={17} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 68,
    borderRadius: 17,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  promptArea: {
    flex: 1,
  },
  prompt: {
    fontSize: 12,
  },
  createIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalCard: {
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 20,
    paddingBottom: 32,
    gap: 17,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: "800",
  },
  modalSubtitle: {
    fontSize: 11,
    marginTop: 4,
  },
  input: {
    minHeight: 140,
    maxHeight: 220,
    borderRadius: 15,
    borderWidth: 1,
    padding: 14,
    fontSize: 14,
    lineHeight: 21,
  },
  characterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fieldLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },
  characterCount: {
    fontSize: 10,
  },
  categoryRow: {
    gap: 8,
  },
  categoryChip: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "700",
  },
  submitButton: {
    minHeight: 48,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
});
