import { useAppTheme } from "@/providers/theme-provider";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SectionHeader from "./SectionHeader";

const STORIES = [
  { id: "rahul", name: "Rahul", initial: "R", color: "#DBEAFE" },
  { id: "priya", name: "Priya", initial: "P", color: "#FCE7F3" },
  { id: "aman", name: "Aman", initial: "A", color: "#FEF3C7" },
  { id: "neha", name: "Neha", initial: "N", color: "#D1FAE5" },
  { id: "karan", name: "Karan", initial: "K", color: "#EDE9FE" },
];

type Props = {
  onSeeAll: () => void;
  onAddStory: () => void;
  onStoryPress: (storyId: string) => void;
};

function StoryItem({
  story,
  viewed,
  mutedColor,
  accentColor,
  onPress,
}: {
  story: (typeof STORIES)[number];
  viewed: boolean;
  mutedColor: string;
  accentColor: string;
  onPress: () => void;
}) {
  const pulse = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (viewed) {
      pulse.stopAnimation();
      pulse.setValue(1);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.045,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [viewed, pulse]);

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.91,
        useNativeDriver: true,
        speed: 35,
        bounciness: 4,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 25,
        bounciness: 8,
      }),
    ]).start();

    onPress();
  };

  return (
    <Pressable
      style={styles.storyItem}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${story.name}'s story${viewed ? ", viewed" : ", not viewed"}`}
    >
      <Animated.View
        style={[
          styles.storyRing,
          {
            borderColor: viewed ? mutedColor : accentColor,
            transform: [{ scale: pulse }],
          },
        ]}
      >
        <View style={[styles.storyCircle, { backgroundColor: story.color }]}>
          <Text style={styles.initial}>{story.initial}</Text>
        </View>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale }] }}>
        <Text
          style={[styles.storyName, { color: viewed ? mutedColor : undefined }]}
          numberOfLines={1}
        >
          {story.name}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export default function StoriesSection({
  onSeeAll,
  onAddStory,
  onStoryPress,
}: Props) {
  const { colors } = useAppTheme();
  const [viewedStories, setViewedStories] = useState<string[]>([]);
  const addScale = useRef(new Animated.Value(1)).current;

  const handleStoryPress = (storyId: string) => {
    setViewedStories((current) =>
      current.includes(storyId) ? current : [...current, storyId],
    );

    onStoryPress(storyId);
  };

  const handleAddPress = () => {
    Animated.sequence([
      Animated.spring(addScale, {
        toValue: 0.9,
        useNativeDriver: true,
        speed: 35,
        bounciness: 4,
      }),
      Animated.spring(addScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 25,
        bounciness: 8,
      }),
    ]).start();

    onAddStory();
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Campus stories"
        subtitle="See what's happening around you"
        actionLabel="See all"
        onAction={onSeeAll}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        <Pressable
          style={styles.storyItem}
          onPress={handleAddPress}
          accessibilityRole="button"
          accessibilityLabel="Add your story"
        >
          <Animated.View
            style={[
              styles.addStory,
              {
                backgroundColor: colors.primaryLight,
                borderColor: colors.border,
                transform: [{ scale: addScale }],
              },
            ]}
          >
            <Ionicons name="add" size={25} color={colors.indigo} />
          </Animated.View>

          <Text style={[styles.storyName, { color: colors.muted }]}>
            Your story
          </Text>
        </Pressable>

        {STORIES.map((story) => (
          <StoryItem
            key={story.id}
            story={story}
            viewed={viewedStories.includes(story.id)}
            mutedColor={colors.border}
            accentColor={colors.indigo}
            onPress={() => handleStoryPress(story.id)}
          />
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
    gap: 17,
    paddingVertical: 5,
    paddingHorizontal: 1,
  },
  storyItem: {
    alignItems: "center",
    width: 58,
    gap: 6,
  },
  storyRing: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
  storyCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  addStory: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  initial: {
    fontSize: 18,
    fontWeight: "800",
    color: "#334155",
  },
  storyName: {
    fontSize: 10,
    fontWeight: "600",
  },
});
