import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

type Options = {
  delay?: number;
  duration?: number;
  distance?: number;
};

export function useEnterAnimation({
  delay = 0,
  duration = 350,
  distance = 14,
}: Options = {}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(distance)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => animation.stop();
  }, [delay, distance, duration, opacity, translateY]);

  return {
    opacity,
    transform: [{ translateY }],
  };
}
