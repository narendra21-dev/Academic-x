
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="dark" /> */}
      <Text style={styles.logo}>
        Academic<Text style={styles.accent}>-X</Text>
      </Text>
      <Text style={styles.title}>Your future starts here.</Text>
      <Text style={styles.subtitle}>
        Learn, connect and discover your next opportunity.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    padding: 28,
  },
  logo: {
    color: "#0F172A",
    fontSize: 34,
    fontWeight: "800",
  },
  accent: {
    color: "#6366F1",
  },
  title: {
    color: "#0F172A",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 28,
  },
  subtitle: {
    color: "#64748B",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
  },
});
