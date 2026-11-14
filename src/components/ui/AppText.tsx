import { Text, type TextProps, type TextStyle } from "react-native";

import { useAppTheme } from "@/providers/theme-provider";

type Variant = "body" | "title" | "heading" | "caption" | "label";

type Props = TextProps & {
  variant?: Variant;
  color?: string;
  weight?: "400" | "500" | "600" | "700" | "800";
};

const variantStyles: Record<Variant, TextStyle> = {
  body: { fontSize: 14, lineHeight: 22 },
  title: { fontSize: 28, lineHeight: 36 },
  heading: { fontSize: 19, lineHeight: 27 },
  caption: { fontSize: 12, lineHeight: 18 },
  label: { fontSize: 13, lineHeight: 19 },
};

export default function AppText({
  variant = "body",
  color,
  weight = "400",
  style,
  children,
  ...props
}: Props) {
  const { colors } = useAppTheme();

  return (
    <Text
      {...props}
      style={[
        {
          color: color ?? colors.text,
          fontWeight: weight,
        },
        variantStyles[variant],
        style,
      ]}
    >
      {children}
    </Text>
  );
}
