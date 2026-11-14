import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const STORY_DURATION = 5000;
const TRANSITION_DURATION = 180;
const TAP_DEBOUNCE = 350;

const STORY_DATA = [
  {
    id: "rahul",
    name: "Rahul",
    initial: "R",
    background: "#172554",
    accent: "#93C5FD",
    title: "Building something new 🚀",
    description:
      "Working on my React Native project today. Learning something new every day!",
    time: "2 hours ago",
  },
  {
    id: "priya",
    name: "Priya",
    initial: "P",
    background: "#831843",
    accent: "#FBCFE8",
    title: "Campus life ✨",
    description:
      "A little glimpse of today's college activities. Great memories with great people!",
    time: "3 hours ago",
  },
  {
    id: "aman",
    name: "Aman",
    initial: "A",
    background: "#78350F",
    accent: "#FDE68A",
    title: "Learning never stops 📚",
    description:
      "Completed another chapter today. What's everyone learning this week?",
    time: "4 hours ago",
  },
  {
    id: "neha",
    name: "Neha",
    initial: "N",
    background: "#064E3B",
    accent: "#A7F3D0",
    title: "Small steps, big goals 🌱",
    description: "Consistency is the key. Keep showing up and keep growing!",
    time: "5 hours ago",
  },
  {
    id: "karan",
    name: "Karan",
    initial: "K",
    background: "#4C1D95",
    accent: "#DDD6FE",
    title: "Weekend project 💻",
    description: "Exploring new ideas and building cool things. Stay curious!",
    time: "6 hours ago",
  },
];

type Props = {
  visible: boolean;
  initialStoryId: string | null;
  onClose: () => void;
};

export default function StoryViewer({
  visible,
  initialStoryId,
  onClose,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  const progress = useRef(new Animated.Value(0)).current;
  const transition = useRef(new Animated.Value(0)).current;

  const remainingDurationRef = useRef(STORY_DURATION);
  const onCloseRef = useRef(onClose);

  const lastTapRef = useRef(0);
  const navigationLockedRef = useRef(false);

  const isHoldingRef = useRef(false);
  const holdTriggeredRef = useRef(false);

  const currentStory = STORY_DATA[currentIndex];

  // Always use the latest close callback without restarting the timer.
  onCloseRef.current = onClose;

  // Reset the viewer whenever it opens.
  useEffect(() => {
    if (!visible) {
      setReady(false);
      progress.stopAnimation();
      return;
    }

    const selectedIndex = STORY_DATA.findIndex(
      (story) => story.id === initialStoryId,
    );

    setReady(false);
    setCurrentIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setPaused(false);

    remainingDurationRef.current = STORY_DURATION;
    lastTapRef.current = 0;
    navigationLockedRef.current = false;
    isHoldingRef.current = false;
    holdTriggeredRef.current = false;

    progress.stopAnimation();
    progress.setValue(0);

    setReady(true);
  }, [visible, initialStoryId, progress]);

  // One progress animation and one timer for each active story.
  useEffect(() => {
    if (!visible || !ready || paused) return;

    const duration = remainingDurationRef.current;

    const animation = Animated.timing(progress, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    animation.start();

    const timer = setTimeout(() => {
      navigationLockedRef.current = true;
      remainingDurationRef.current = STORY_DURATION;
      progress.setValue(0);

      if (currentIndex < STORY_DATA.length - 1) {
        setCurrentIndex((index) => index + 1);
      } else {
        onCloseRef.current();
      }
    }, duration);

    return () => {
      clearTimeout(timer);
      animation.stop();
    };
  }, [visible, ready, paused, currentIndex, progress]);

  // Animate story content whenever the active story changes.
  useEffect(() => {
    if (!visible || !ready) return;

    // Unlock navigation after the new story has rendered.
    navigationLockedRef.current = false;

    transition.setValue(0);

    const animation = Animated.timing(transition, {
      toValue: 1,
      duration: TRANSITION_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    animation.start();

    return () => animation.stop();
  }, [currentIndex, visible, ready, transition]);

  // Navigate between stories.
  const changeStory = useCallback(
    (nextIndex: number) => {
      if (!visible || !ready || navigationLockedRef.current) return;

      if (nextIndex < 0 || nextIndex >= STORY_DATA.length) {
        navigationLockedRef.current = true;
        onCloseRef.current();
        return;
      }

      navigationLockedRef.current = true;

      remainingDurationRef.current = STORY_DURATION;

      progress.stopAnimation();
      progress.setValue(0);

      setPaused(false);
      setCurrentIndex(nextIndex);
    },
    [visible, ready, progress],
  );

  // Handle quick taps on the left and right sides.
  const handleZonePress = useCallback(
    (direction: "next" | "previous") => {
      // Do not navigate from a long-press gesture.
      if (isHoldingRef.current || holdTriggeredRef.current) {
        holdTriggeredRef.current = false;
        return;
      }

      const now = Date.now();

      // Prevent rapid repeated taps from skipping stories.
      if (now - lastTapRef.current < TAP_DEBOUNCE) {
        return;
      }

      lastTapRef.current = now;

      changeStory(direction === "next" ? currentIndex + 1 : currentIndex - 1);
    },
    [changeStory, currentIndex],
  );

  // Manual pause: preserve the exact remaining duration.
  const pauseStory = useCallback(() => {
    if (paused || !visible) return;

    progress.stopAnimation((value) => {
      remainingDurationRef.current = Math.max(0, STORY_DURATION * (1 - value));

      setPaused(true);
    });
  }, [paused, visible, progress]);

  // Resume from the remaining duration.
  const resumeStory = useCallback(() => {
    setPaused(false);
  }, []);

  const togglePause = useCallback(() => {
    if (paused) {
      resumeStory();
    } else {
      pauseStory();
    }
  }, [paused, pauseStory, resumeStory]);

  // Called when the user first touches a navigation area.
  // This resets the hold flag for a new gesture.
  const handlePressIn = useCallback(() => {
    if (!isHoldingRef.current) {
      holdTriggeredRef.current = false;
    }
  }, []);

  // Long press: pause the story.
  const handleHoldStart = useCallback(() => {
    isHoldingRef.current = true;
    holdTriggeredRef.current = true;

    // A long press starts a fresh tap sequence.
    lastTapRef.current = 0;

    if (visible) {
      progress.stopAnimation((value) => {
        remainingDurationRef.current = Math.max(
          0,
          STORY_DURATION * (1 - value),
        );

        // Only pause if the finger is still being held.
        // This avoids the pause callback winning a race
        // against the release callback.
        if (isHoldingRef.current) {
          setPaused(true);
        }
      });
    }
  }, [visible, progress]);

  // Release after a long press: resume the story.
  const handleHoldEnd = useCallback(() => {
    // Normal taps also trigger onPressOut.
    // Do not reset tap history for those.
    if (!isHoldingRef.current) return;

    isHoldingRef.current = false;

    // Start a fresh tap sequence after releasing.
    lastTapRef.current = 0;

    // Stop any remaining animation and preserve its position.
    progress.stopAnimation((value) => {
      remainingDurationRef.current = Math.max(0, STORY_DURATION * (1 - value));

      setPaused(false);
    });
  }, [progress]);

  const closeViewer = useCallback(() => {
    progress.stopAnimation();
    onCloseRef.current();
  }, [progress]);

  if (!currentStory) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      statusBarTranslucent
      onRequestClose={closeViewer}
    >
      <StatusBar hidden />

      <View
        style={[styles.container, { backgroundColor: currentStory.background }]}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: transition,
              transform: [
                {
                  translateY: transition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [8, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {/* Progress indicators */}
          <View style={styles.topArea}>
            <View style={styles.progressRow}>
              {STORY_DATA.map((story, index) => (
                <View key={story.id} style={styles.progressTrack}>
                  {index < currentIndex && (
                    <View
                      style={[styles.progressFill, styles.completedProgress]}
                    />
                  )}

                  {index === currentIndex && (
                    <Animated.View
                      style={[
                        styles.progressFill,
                        styles.activeProgress,
                        {
                          width: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", "100%"],
                          }),
                        },
                      ]}
                    />
                  )}
                </View>
              ))}
            </View>

            {/* User information */}
            <View style={styles.header}>
              <View style={styles.userInfo}>
                <View
                  style={[
                    styles.avatar,
                    { backgroundColor: currentStory.accent },
                  ]}
                >
                  <Text style={styles.avatarText}>{currentStory.initial}</Text>
                </View>

                <View>
                  <Text style={styles.userName}>{currentStory.name}</Text>
                  <Text style={styles.timeText}>{currentStory.time}</Text>
                </View>
              </View>

              <View style={styles.headerActions}>
                <Pressable
                  onPress={togglePause}
                  hitSlop={12}
                  accessibilityLabel={paused ? "Resume story" : "Pause story"}
                >
                  <Ionicons
                    name={paused ? "play" : "pause"}
                    size={23}
                    color="#FFFFFF"
                  />
                </Pressable>

                <Pressable
                  onPress={closeViewer}
                  hitSlop={12}
                  accessibilityLabel="Close story"
                >
                  <Ionicons name="close" size={29} color="#FFFFFF" />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Story content */}
          <View style={styles.storyContent}>
            <View
              style={[
                styles.storyArtwork,
                { backgroundColor: currentStory.accent },
              ]}
            >
              <Text
                style={[
                  styles.artworkInitial,
                  { color: currentStory.background },
                ]}
              >
                {currentStory.initial}
              </Text>

              <View style={styles.artworkDot} />
            </View>

            <Text style={styles.storyTitle}>{currentStory.title}</Text>

            <Text style={styles.storyDescription}>
              {currentStory.description}
            </Text>
          </View>

          {/* Reply placeholder */}
          <View style={styles.bottomArea}>
            <View style={styles.replyBar}>
              <Text style={styles.replyPlaceholder}>
                Reply to {currentStory.name}...
              </Text>

              <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
            </View>
          </View>
        </Animated.View>

        {/* Story navigation zones */}
        <View style={styles.tapZones}>
          <Pressable
            style={styles.leftTap}
            onPressIn={handlePressIn}
            onPress={() => handleZonePress("previous")}
            onLongPress={handleHoldStart}
            onPressOut={handleHoldEnd}
            delayLongPress={180}
            accessibilityLabel="Previous story. Hold to pause."
          />

          <Pressable
            style={styles.rightTap}
            onPressIn={handlePressIn}
            onPress={() => handleZonePress("next")}
            onLongPress={handleHoldStart}
            onPressOut={handleHoldEnd}
            delayLongPress={180}
            accessibilityLabel="Next story. Hold to pause."
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 52,
    paddingHorizontal: 14,
    paddingBottom: 24,
  },
  topArea: {
    zIndex: 2,
  },
  progressRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 17,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  progressFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 4,
  },
  completedProgress: {
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  activeProgress: {
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 39,
    height: 39,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#172033",
    fontSize: 16,
    fontWeight: "800",
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  timeText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
  },
  storyContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  storyArtwork: {
    width: 180,
    height: 180,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 38,
    transform: [{ rotate: "-5deg" }],
  },
  artworkInitial: {
    fontSize: 100,
    fontWeight: "900",
  },
  artworkDot: {
    position: "absolute",
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    right: 20,
    top: 20,
  },
  storyTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    lineHeight: 34,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 13,
  },
  storyDescription: {
    color: "rgba(255,255,255,0.86)",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 310,
  },
  bottomArea: {
    zIndex: 2,
  },
  replyBar: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    borderRadius: 25,
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  replyPlaceholder: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
  },
  tapZones: {
    position: "absolute",
    top: 105,
    bottom: 82,
    left: 0,
    right: 0,
    flexDirection: "row",
    zIndex: 1,
  },
  leftTap: {
    flex: 1,
  },
  rightTap: {
    flex: 1,
  },
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                         