import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter, type Href } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "@/providers/theme-provider";

type TabConfig = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  badge?: number;
};

const TAB_CONFIG: Record<string, TabConfig> = {
  index: {
    label: "Home",
    icon: "home-outline",
    activeIcon: "home",
  },
  community: {
    label: "Community",
    icon: "people-outline",
    activeIcon: "people",
    badge: 3,
  },
  courses: {
    label: "Courses",
    icon: "book-outline",
    activeIcon: "book",
  },
  jobs: {
    label: "Jobs",
    icon: "briefcase-outline",
    activeIcon: "briefcase",
    badge: 2,
  },
  profile: {
    label: "Profile",
    icon: "person-outline",
    activeIcon: "person",
  },
};

type CustomTabBarProps = {
  state: {
    index: number;
    routes: Array<{
      key: string;
      name: string;
    }>;
  };
  navigateToTab: (routeKey: string) => void;
};

function CustomTabBar({ state, navigateToTab }: CustomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const { colors: C } = useAppTheme();

  const styles = useMemo(() => createStyles(C), [C]);

  const [containerWidth, setContainerWidth] = useState(0);

  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const dotBounce = useRef(new Animated.Value(0)).current;

  const tabAnimations = useRef(
    state.routes.map(() => new Animated.Value(1)),
  ).current;

  const tabRotations = useRef(
    state.routes.map(() => new Animated.Value(0)),
  ).current;

  const tabCount = state.routes.length;

  // Account for the dock's horizontal padding.
  const tabWidth = containerWidth > 0 ? (containerWidth - 10) / tabCount : 0;

  useEffect(() => {
    if (tabWidth <= 0) return;

    Animated.spring(indicatorPosition, {
      toValue: state.index * tabWidth,
      stiffness: 180,
      damping: 22,
      mass: 0.8,
      useNativeDriver: true,
    }).start();

    // Bounce the active dot when the selected tab changes.
    dotBounce.stopAnimation();
    dotBounce.setValue(0);

    Animated.sequence([
      Animated.timing(dotBounce, {
        toValue: -4,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(dotBounce, {
        toValue: 0,
        stiffness: 260,
        damping: 8,
        mass: 0.5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [state.index, tabWidth, indicatorPosition, dotBounce]);

  const handlePress = (routeKey: string, index: number) => {
    if (index !== state.index) {
      navigateToTab(routeKey);
    }

    // Icon press animation.
    tabAnimations[index].stopAnimation();
    tabRotations[index].stopAnimation();

    tabAnimations[index].setValue(1);
    tabRotations[index].setValue(0);

    Animated.parallel([
      Animated.sequence([
        Animated.spring(tabAnimations[index], {
          toValue: 0.88,
          useNativeDriver: true,
          speed: 35,
        }),
        Animated.spring(tabAnimations[index], {
          toValue: 1,
          useNativeDriver: true,
          speed: 25,
        }),
      ]),
      Animated.sequence([
        Animated.timing(tabRotations[index], {
          toValue: 1,
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.timing(tabRotations[index], {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(tabRotations[index], {
          toValue: 0,
          duration: 90,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  return (
    <View
      style={[
        styles.tabBarWrapper,
        {
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      <View
        style={[
          styles.tabBar,
          {
            width: Math.min(screenWidth - 32, 480),
          },
        ]}
        onLayout={(event) => {
          setContainerWidth(event.nativeEvent.layout.width);
        }}
      >
        {/* Animated active background */}
        {tabWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.activeIndicator,
              {
                width: tabWidth,
                transform: [{ translateX: indicatorPosition }],
              },
            ]}
          />
        )}

        {/* Moving and bouncing dot */}
        {tabWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.activeDot,
              {
                transform: [
                  {
                    translateX: Animated.add(
                      indicatorPosition,
                      tabWidth / 2 - 3,
                    ),
                  },
                  {
                    translateY: dotBounce,
                  },
                ],
              },
            ]}
          />
        )}

        {/* Navigation tabs */}
        {state.routes.map((route, index) => {
          const config = TAB_CONFIG[route.name];

          if (!config) return null;

          const focused = state.index === index;

          return (
            <Pressable
              key={route.key}
              onPress={() => handlePress(route.name, index)}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={config.label}
              style={styles.tabItem}
              android_ripple={{
                color: C.primaryLight,
                borderless: true,
              }}
            >
              <Animated.View
                style={[
                  styles.tabContent,
                  {
                    transform: [
                      {
                        scale: tabAnimations[index],
                      },
                      {
                        rotate: tabRotations[index].interpolate({
                          inputRange: [-1, 0, 1],
                          outputRange: ["-8deg", "0deg", "8deg"],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={focused ? config.activeIcon : config.icon}
                    size={22}
                    color={focused ? C.indigo : C.tabInactive}
                  />

                  {config.badge !== undefined && config.badge > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {config.badge > 9 ? "9+" : config.badge}
                      </Text>
                    </View>
                  )}
                </View>

                <Text
                  numberOfLines={1}
                  style={[styles.tabLabel, focused && styles.activeTabLabel]}
                >
                  {config.label}
                </Text>
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  const { colors } = useAppTheme();
  const router = useRouter();

  return (
    <Tabs
      tabBar={(props) => (
        <CustomTabBar
          state={props.state}
          navigateToTab={(routeName) => router.navigate(routeName as Href)}
        />
      )}
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors.background,
        },
        animation: "fade",
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="community" options={{ title: "Community" }} />
      <Tabs.Screen name="courses" options={{ title: "Courses" }} />
      <Tabs.Screen name="jobs" options={{ title: "Jobs" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

function createStyles(C: {
  background: string;
  card: string;
  border: string;
  text: string;
  muted: string;
  indigo: string;
  primaryLight: string;
  tabBar: string;
  tabInactive: string;
  danger: string;
}) {
  return StyleSheet.create({
    tabBarWrapper: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      backgroundColor: "transparent",
      paddingTop: 8,
    },

    tabBar: {
      height: 68,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: C.tabBar,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: C.border,
      paddingHorizontal: 5,

      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.12,
      shadowRadius: 14,
      elevation: 8,
    },

    activeIndicator: {
      position: "absolute",
      left: 5,
      top: 5,
      bottom: 5,
      backgroundColor: C.primaryLight,
      borderRadius: 19,
    },

    activeDot: {
      position: "absolute",
      left: 5,
      bottom: 4,
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: C.indigo,
      zIndex: 3,
    },

    tabItem: {
      flex: 1,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },

    tabContent: {
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },

    iconContainer: {
      width: 27,
      height: 25,
      alignItems: "center",
      justifyContent: "center",
    },

    tabLabel: {
      fontSize: 10,
      fontWeight: "600",
      color: C.tabInactive,
    },

    activeTabLabel: {
      color: C.indigo,
      fontWeight: "800",
    },

    badge: {
      position: "absolute",
      top: -5,
      right: -9,
      minWidth: 15,
      height: 15,
      paddingHorizontal: 3,
      borderRadius: 8,
      backgroundColor: C.danger,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: C.tabBar,
    },

    badgeText: {
      color: "#FFFFFF",
      fontSize: 8,
      fontWeight: "800",
    },
  });
}
