import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as SplashScreen1 from "expo-splash-screen";
import { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

const C = {
  canvas: "#F8FAFC",
  white: "#FFFFFF",
  border: "#E2E8F0",
  ink: "#0F172A",
  muted: "#64748B",
  indigo: "#6366F1",
  indigoDark: "#4F46E5",
  indigoLight: "#EEF2FF",
  emerald: "#10B981",
  amber: "#F59E0B",
};

export default function SplashScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.72)).current;
  const logoRotate = useRef(new Animated.Value(-8)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(18)).current;
  const featuresOpacity = useRef(new Animated.Value(0)).current;
  const featuresY = useRef(new Animated.Value(24)).current;
  const glowValue = useRef(new Animated.Value(0)).current;
  const strokeValue = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   // ... keep your entrance, glow, stroke, and progress animations here ...

  //   // Navigate to home screen after animations finish
  //   const timer = setTimeout(async () => {
  //     try {
  //       await SplashScreen1.hideAsync();
  //     } catch (e) {
  //       // Fallback if already hidden
  //     }
  //     router.replace("/home"); // Matches your home route
  //   }, 5400);

  //   return () => {
  //     clearTimeout(timer);
  //     // ... cleanup your animations ...
  //   };
  // }, [router]);

  useEffect(() => {
    const entrance = Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          damping: 11,
          stiffness: 105,
          mass: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 0,
          duration: 550,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(titleY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(featuresOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.spring(featuresY, {
          toValue: 0,
          damping: 16,
          stiffness: 95,
          useNativeDriver: true,
        }),
      ]),
    ]);

    entrance.start();

    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowValue, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowValue, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    const strokeAnimation = Animated.loop(
      Animated.timing(strokeValue, {
        toValue: 1,
        duration: 2200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    );

    glowAnimation.start();
    strokeAnimation.start();

    Animated.timing(progress, {
      toValue: 1,
      duration: 2800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    // Temporary demo navigation. Replace with auth/onboarding
    // routing when those screens are ready.
    const timer = setTimeout(() => {
      SplashScreen1.hideAsync();
      // router.replace("/home");
      router.replace("/(tabs)");
    }, 5400);

    return () => {
      clearTimeout(timer);
      entrance.stop();
      glowAnimation.stop();
      strokeAnimation.stop();
      progress.stopAnimation();
    };
  }, [
    router,
    logoOpacity,
    logoScale,
    logoRotate,
    titleOpacity,
    titleY,
    featuresOpacity,
    featuresY,
    glowValue,
    strokeValue,
    progress,
  ]);

  const logoRotation = logoRotate.interpolate({
    inputRange: [-8, 0],
    outputRange: ["-8deg", "0deg"],
  });

  const glowOpacity = glowValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.8],
  });

  const strokeTranslate = strokeValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-22, 22],
  });

  const sidePadding = Math.max(24, width * 0.065);

  return (
    <View style={styles.root}>
      {/* <StatusBar style="dark" backgroundColor={C.canvas} /> */}

      <LinearGradient
        colors={["#FFFFFF", "#F8FAFC", "#EEF2FF"]}
        locations={[0, 0.65, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Soft background decoration */}
      <Animated.View
        pointerEvents="none"
        style={[styles.ambientTop, { opacity: glowOpacity }]}
      />

      <View pointerEvents="none" style={styles.ambientBottom} />

      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.content, { paddingHorizontal: sidePadding }]}>
          {/* Animated brand mark */}
          <View style={styles.brandArea}>
            <Animated.View
              style={[
                styles.logoShadow,
                {
                  opacity: logoOpacity,
                  transform: [{ scale: logoScale }, { rotate: logoRotation }],
                },
              ]}
            >
              <LinearGradient
                colors={["#818CF8", "#6366F1", "#4F46E5"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logo}
              >
                <View style={styles.logoLetterRow}>
                  <Text style={styles.logoA}>A</Text>
                  <Text style={styles.logoX}>X</Text>
                </View>

                {/* Animated brand accent */}
                <View style={styles.strokeTrack}>
                  <Animated.View
                    style={[
                      styles.logoStroke,
                      { transform: [{ translateX: strokeTranslate }] },
                    ]}
                  />
                </View>

                <View style={styles.logoShine} />
                <View style={styles.logoSparkle} />
              </LinearGradient>
            </Animated.View>

            <Animated.View
              style={{
                opacity: titleOpacity,
                transform: [{ translateY: titleY }],
                alignItems: "center",
              }}
            >
              <Text style={styles.wordmark}>
                Academic<Text style={styles.wordmarkX}>-X</Text>
              </Text>

              <View style={styles.brandUnderline}>
                <View style={styles.underlineIndigo} />
                <View style={styles.underlineAmber} />
              </View>

              <Text style={styles.eyebrow}>YOUR FUTURE, CONNECTED</Text>

              <View style={styles.taglineRow}>
                <Text style={styles.tagline}>Learn</Text>
                <View style={[styles.tagDot, { backgroundColor: C.indigo }]} />
                <Text style={styles.tagline}>Connect</Text>
                <View style={[styles.tagDot, { backgroundColor: C.emerald }]} />
                <Text style={styles.tagline}>Grow</Text>
              </View>
            </Animated.View>
          </View>

          {/* Product features */}
          <Animated.View
            style={[
              styles.featureSection,
              {
                opacity: featuresOpacity,
                transform: [{ translateY: featuresY }],
              },
            ]}
          >
            <Text style={styles.sectionEyebrow}>ONE PLATFORM</Text>
            <Text style={styles.sectionTitle}>
              Everything for your next step.
            </Text>
            <Text style={styles.sectionDescription}>
              Learn skills. Build connections. Find opportunities.
            </Text>

            <View style={styles.featureList}>
              <FeatureCard
                symbol="✦"
                title="Courses"
                description="Learn new skills"
                accent={C.indigo}
                tint="#EEF2FF"
              />
              <FeatureCard
                symbol="◎"
                title="Community"
                description="Connect & share"
                accent={C.emerald}
                tint="#ECFDF5"
              />
              <FeatureCard
                symbol="↗"
                title="Careers"
                description="Jobs & internships"
                accent={C.amber}
                tint="#FFFBEB"
              />
            </View>
          </Animated.View>

          {/* Loading and footer */}
          <View style={styles.bottomArea}>
            <View style={styles.loadingRow}>
              <View style={styles.loadingIndicator}>
                <View style={styles.loadingIndicatorInner} />
              </View>
              <Text style={styles.loadingText}>
                Opening new possibilities...
              </Text>
            </View>

            <View style={styles.progressTrack}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>

            <Text style={styles.footer}>
              MADE FOR LEARNING. BUILT FOR GROWTH.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

type FeatureCardProps = {
  symbol: string;
  title: string;
  description: string;
  accent: string;
  tint: string;
};

function FeatureCard({
  symbol,
  title,
  description,
  accent,
  tint,
}: FeatureCardProps) {
  return (
    <View style={styles.featureCard}>
      <View style={[styles.featureIconBox, { backgroundColor: tint }]}>
        <Text style={[styles.featureIcon, { color: accent }]}>{symbol}</Text>
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.canvas,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 24,
    paddingBottom: 22,
  },
  ambientTop: {
    position: "absolute",
    width: 280,
    height: 280,
    top: -170,
    right: -100,
    borderRadius: 150,
    backgroundColor: "#C7D2FE",
  },
  ambientBottom: {
    position: "absolute",
    width: 250,
    height: 250,
    bottom: 100,
    left: -175,
    borderRadius: 150,
    backgroundColor: "#D1FAE5",
    opacity: 0.5,
  },
  brandArea: {
    alignItems: "center",
    paddingTop: 10,
  },
  logoShadow: {
    width: 112,
    height: 112,
    borderRadius: 32,
    marginBottom: 21,
    padding: 2,
    backgroundColor: "#FFFFFF",
    shadowColor: C.indigo,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 9,
  },
  logo: {
    flex: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",
  },
  logoLetterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -4,
  },
  logoA: {
    color: C.white,
    fontSize: 62,
    fontWeight: "900",
    letterSpacing: -9,
    fontStyle: "italic",
  },
  logoX: {
    color: C.amber,
    fontSize: 35,
    fontWeight: "900",
    marginLeft: 1,
    marginTop: 21,
    fontStyle: "italic",
  },
  strokeTrack: {
    position: "absolute",
    width: 59,
    height: 5,
    bottom: 25,
    right: 19,
    overflow: "hidden",
    borderRadius: 8,
    transform: [{ rotate: "-28deg" }],
  },
  logoStroke: {
    width: 24,
    height: 5,
    borderRadius: 8,
    backgroundColor: C.amber,
  },
  logoShine: {
    position: "absolute",
    width: 45,
    height: 130,
    left: -60,
    top: -8,
    backgroundColor: "rgba(255,255,255,0.09)",
    transform: [{ rotate: "28deg" }],
  },
  logoSparkle: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    top: 17,
    right: 19,
  },
  wordmark: {
    color: C.ink,
    fontSize: 37,
    fontWeight: "800",
    letterSpacing: -1.8,
  },
  wordmarkX: {
    color: C.indigo,
    fontWeight: "900",
  },
  brandUnderline: {
    flexDirection: "row",
    width: 48,
    height: 3,
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 10,
  },
  underlineIndigo: {
    flex: 2,
    backgroundColor: C.indigo,
  },
  underlineAmber: {
    flex: 1,
    backgroundColor: C.amber,
  },
  eyebrow: {
    color: C.muted,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2.8,
    marginTop: 14,
  },
  taglineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginTop: 17,
  },
  tagline: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "600",
  },
  tagDot: {
    width: 5,
    height: 5,
    borderRadius: 4,
  },
  featureSection: {
    marginTop: 22,
  },
  sectionEyebrow: {
    color: C.indigo,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    textAlign: "center",
  },
  sectionTitle: {
    color: C.ink,
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "800",
    letterSpacing: -0.7,
    textAlign: "center",
    marginTop: 8,
  },
  sectionDescription: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 7,
    marginBottom: 20,
  },
  featureList: {
    flexDirection: "row",
    gap: 10,
  },
  featureCard: {
    flex: 1,
    minWidth: 0,
    minHeight: 126,
    paddingHorizontal: 4,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.white,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.045,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIconBox: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  featureIcon: {
    fontSize: 25,
    fontWeight: "800",
  },
  featureTitle: {
    color: C.ink,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 10,
  },
  featureDescription: {
    color: C.muted,
    fontSize: 9,
    textAlign: "center",
    marginTop: 5,
  },
  bottomArea: {
    marginTop: 25,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginBottom: 13,
  },
  loadingIndicator: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#C7D2FE",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingIndicatorInner: {
    width: 5,
    height: 5,
    borderRadius: 4,
    backgroundColor: C.indigo,
  },
  loadingText: {
    color: C.muted,
    fontSize: 11,
    fontWeight: "600",
  },
  progressTrack: {
    height: 3,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: C.border,
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: C.indigo,
  },
  footer: {
    color: "#94A3B8",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.2,
    textAlign: "center",
    marginTop: 18,
  },
});
