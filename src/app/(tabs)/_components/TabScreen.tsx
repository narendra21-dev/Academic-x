
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  subtitle: string;
};

export default function TabScreen({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>
        Academic<Text style={styles.accent}>-X</Text>
      </Text>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    padding: 25,
  },
  brand: {
    fontSize: 25,
    fontWeight: "800",
    color: "#0F172A",
  },
  accent: {
    color: "#6366F1",
  },
  title: {
    fontSize: 29,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 35,
  },
  subtitle: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 22,
  },
});
