import { StyleSheet, View } from "react-native";

import { spacing } from "../../theme";
import AppCard from "./AppCard";
import Skeleton from "./Skeleton";

export default function HomeSkeleton() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Skeleton width={125} height={15} />
          <Skeleton width={190} height={27} />
        </View>
        <Skeleton width={44} height={44} borderRadius={22} />
      </View>

      {/* Search */}
      <Skeleton height={50} borderRadius={16} />

      {/* Stories */}
      <View style={styles.stories}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} style={styles.story}>
            <Skeleton width={58} height={58} borderRadius={29} />
            <Skeleton width={48} height={10} />
          </View>
        ))}
      </View>

      {/* Feed heading */}
      <View style={styles.sectionHeading}>
        <Skeleton width={130} height={20} />
        <Skeleton width={55} height={14} />
      </View>

      {/* Feed card */}
      <AppCard>
        <View style={styles.userRow}>
          <Skeleton width={42} height={42} borderRadius={21} />
          <View style={styles.userInfo}>
            <Skeleton width={120} height={13} />
            <Skeleton width={85} height={10} />
          </View>
        </View>

        <Skeleton height={14} style={styles.line} />
        <Skeleton width="85%" height={14} style={styles.line} />
        <Skeleton height={175} borderRadius={14} style={styles.postImage} />

        <View style={styles.actions}>
          <Skeleton width={65} height={15} />
          <Skeleton width={65} height={15} />
          <Skeleton width={65} height={15} />
        </View>
      </AppCard>

      {/* Course cards */}
      <View style={styles.sectionHeading}>
        <Skeleton width={145} height={20} />
        <Skeleton width={55} height={14} />
      </View>

      <View style={styles.courseRow}>
        <View style={styles.course}>
          <Skeleton height={100} borderRadius={14} />
          <Skeleton width="90%" height={13} />
          <Skeleton width="55%" height={12} />
        </View>

        <View style={styles.course}>
          <Skeleton height={100} borderRadius={14} />
          <Skeleton width="90%" height={13} />
          <Skeleton width="55%" height={12} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
    paddingBottom: spacing["4xl"],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    gap: spacing.sm,
  },
  stories: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  story: {
    alignItems: "center",
    gap: spacing.sm,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  userInfo: {
    flex: 1,
    gap: spacing.sm,
  },
  line: {
    marginTop: spacing.md,
  },
  postImage: {
    marginTop: spacing.lg,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.lg,
  },
  courseRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  course: {
    flex: 1,
    gap: spacing.sm,
  },
});
