
import React from "react";
import {
  Animated,
  type ViewStyle,
} from "react-native";

import { useEnterAnimation } from "@/hooks/use-enter-animation";

type Props = {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
};

export default function AnimatedSection({
  children,
  delay = 0,
  style,
}: Props) {
  const animation = useEnterAnimation({
    delay,
    duration: 380,
    distance: 16,
  });

  return (
    <Animated.View style={[animation, style]}>
      {children}
    </Animated.View>
  );
}
