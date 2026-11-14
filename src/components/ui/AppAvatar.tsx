import {
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
} from "react-native";

import { useAppTheme } from "@/providers/theme-provider";
import AppText from "./AppText";

type Props = {
  name: string;
  source?: ImageSourcePropType;
  size?: number;
  backgroundColor?: string;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function AppAvatar({
  name,
  source,
  size = 44,
  backgroundColor,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: backgroundColor ?? colors.primaryLight,
        },
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      ) : (
        <AppText
          weight="700"
          color={colors.indigo}
          style={{ fontSize: size * 0.34 }}
        >
          {getInitials(name)}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
