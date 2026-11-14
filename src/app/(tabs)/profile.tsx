import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnimatedSection from "@/components/ui/AnimatedSection";
import PressableScale from "@/components/ui/PressableScale";
import { useCommunity } from "@/features/community/providers/community-provider";
import CommunityFeedSection from "@/features/home/components/CommunityFeedSection";
import { useAppTheme } from "@/providers/theme-provider";

type ProfileData = {
  name: string;
  username: string;
  initials: string;
  role: string;
  university: string;
  course: string;
  location: string;
  bio: string;
};

const INITIAL_PROFILE: ProfileData = {
  name: "Alex Morgan",
  username: "alexmorgan",
  initials: "AM",
  role: "Computer Science Student",
  university: "Rajasthan Technical University",
  course: "B.Tech • Computer Science",
  location: "Jaipur, Rajasthan",
  bio: "Building ideas, learning new technologies and connecting with amazing people. 🚀",
};

const SKILLS = [
  "React Native",
  "JavaScript",
  "TypeScript",
  "UI/UX Design",
  "Problem Solving",
];

const ACHIEVEMENTS = [
  {
    icon: "trophy-outline" as const,
    title: "Rising Creator",
    description: "Active community contributor",
  },
  {
    icon: "code-slash-outline" as const,
    title: "Tech Enthusiast",
    description: "Passionate about building projects",
  },
  {
    icon: "people-outline" as const,
    title: "Community Member",
    description: "Connected with fellow students",
  },
];

type EditFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  maxLength?: number;
};

function EditField({
  label,
  value,
  placeholder,
  onChangeText,
  multiline = false,
  autoCapitalize = "sentences",
  maxLength,
}: EditFieldProps) {
  const { colors } = useAppTheme();

  return (
    <View style={fieldStyles.wrapper}>
      <Text style={[fieldStyles.label, { color: colors.text }]}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        selectionColor={colors.indigo}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        maxLength={maxLength}
        textAlignVertical={multiline ? "top" : "center"}
        returnKeyType={multiline ? "default" : "next"}
        blurOnSubmit={!multiline}
        style={[
          fieldStyles.input,
          {
            color: colors.text,
            backgroundColor: colors.input,
            borderColor: colors.border,
          },
          multiline && fieldStyles.multiline,
        ]}
      />
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 17,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    minHeight: 49,
    borderRadius: 13,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
  },
  multiline: {
    minHeight: 100,
    paddingTop: 13,
    paddingBottom: 13,
  },
});

export default function ProfileScreen() {
  const router = useRouter();
  const { isDark, colors, toggleTheme } = useAppTheme();

  const { posts, toggleLike, toggleBookmark } = useCommunity();

  const [profile, setProfile] = useState<ProfileData>(INITIAL_PROFILE);
  const [activeTab, setActiveTab] = useState<"posts" | "about">("posts");

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const [profileDraft, setProfileDraft] = useState<ProfileData>(profile);

  const styles = useMemo(() => createStyles(colors), [colors]);

  const myPosts = useMemo(
    () =>
      posts.filter(
        (post) => post.author === profile.name || post.author === "You",
      ),
    [posts, profile.name],
  );

  const updateDraft = (key: keyof ProfileData, value: string) => {
    setProfileDraft((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const openEditProfile = () => {
    setProfileDraft({ ...profile });
    setEditVisible(true);
  };

  const saveProfile = () => {
    const cleanedName = profileDraft.name.trim();
    const cleanedUsername = profileDraft.username
      .trim()
      .replace(/^@/, "")
      .replace(/\s+/g, "")
      .toLowerCase();

    if (!cleanedName) {
      Alert.alert("Name required", "Please enter your name.");
      return;
    }

    if (!cleanedUsername) {
      Alert.alert("Username required", "Please enter a username.");
      return;
    }

    const initials = cleanedName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");

    setProfile({
      ...profileDraft,
      name: cleanedName,
      username: cleanedUsername,
      initials,
    });

    setEditVisible(false);
  };

  const styles2 = styles;

  return (
    <SafeAreaView style={styles2.screen} edges={["top", "left", "right"]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles2.pageContent}
      >
        {/* Header */}
        <AnimatedSection>
          <View style={styles2.topHeader}>
            <View>
              <Text style={styles2.brandText}>
                Academic<Text style={styles2.brandAccent}>-X</Text>
              </Text>
              <Text style={styles2.headerSubtitle}>Your profile</Text>
            </View>

            <PressableScale
              onPress={() => setSettingsVisible(true)}
              style={styles2.settingsButton}
            >
              <Ionicons name="settings-outline" size={21} color={colors.text} />
            </PressableScale>
          </View>
        </AnimatedSection>

        {/* Profile cover */}
        <AnimatedSection delay={60}>
          <View style={styles2.profileCard}>
            <View style={styles2.cover}>
              <View style={styles2.coverDecorationOne} />
              <View style={styles2.coverDecorationTwo} />

              <Text style={styles2.coverBrand}>
                A<Text style={styles2.coverBrandAccent}>-X</Text>
              </Text>

              <Text style={styles2.coverCaption}>LEARN • CONNECT • GROW</Text>
            </View>

            <View style={styles2.profileInfo}>
              <View style={styles2.avatarRow}>
                <View style={styles2.avatarWrapper}>
                  <View style={styles2.avatar}>
                    <Text style={styles2.avatarText}>{profile.initials}</Text>
                  </View>
                  <View style={styles2.onlineDot} />
                </View>

                <View style={styles2.profileActions}>
                  <PressableScale
                    style={styles2.editButton}
                    onPress={openEditProfile}
                  >
                    <Ionicons
                      name="create-outline"
                      size={16}
                      color={colors.text}
                    />
                    <Text style={styles2.editButtonText}>Edit Profile</Text>
                  </PressableScale>
                </View>
              </View>

              <View style={styles2.nameRow}>
                <Text style={styles2.profileName}>{profile.name}</Text>
                <Ionicons
                  name="checkmark-circle"
                  size={19}
                  color={colors.indigo}
                />
              </View>

              <Text style={styles2.username}>@{profile.username}</Text>

              <Text style={styles2.role}>{profile.role}</Text>

              <Text style={styles2.bio}>{profile.bio}</Text>

              <View style={styles2.profileMeta}>
                <View style={styles2.metaItem}>
                  <Ionicons
                    name="school-outline"
                    size={15}
                    color={colors.muted}
                  />
                  <Text style={styles2.metaText}>{profile.university}</Text>
                </View>

                <View style={styles2.metaItem}>
                  <Ionicons
                    name="location-outline"
                    size={15}
                    color={colors.muted}
                  />
                  <Text style={styles2.metaText}>{profile.location}</Text>
                </View>

                <View style={styles2.metaItem}>
                  <Ionicons
                    name="calendar-outline"
                    size={15}
                    color={colors.muted}
                  />
                  <Text style={styles2.metaText}>Joined September 2025</Text>
                </View>
              </View>

              {/* Stats */}
              <View style={styles2.statsContainer}>
                <View style={styles2.statItem}>
                  <Text style={styles2.statNumber}>{myPosts.length}</Text>
                  <Text style={styles2.statLabel}>Posts</Text>
                </View>

                <View style={styles2.statDivider} />

                <View style={styles2.statItem}>
                  <Text style={styles2.statNumber}>248</Text>
                  <Text style={styles2.statLabel}>Followers</Text>
                </View>

                <View style={styles2.statDivider} />

                <View style={styles2.statItem}>
                  <Text style={styles2.statNumber}>186</Text>
                  <Text style={styles2.statLabel}>Following</Text>
                </View>
              </View>
            </View>
          </View>
        </AnimatedSection>

        {/* Profile tabs */}
        <AnimatedSection delay={120}>
          <View style={styles2.tabsContainer}>
            <PressableScale
              style={[
                styles2.tabButton,
                activeTab === "posts" && styles2.activeTabButton,
              ]}
              onPress={() => setActiveTab("posts")}
            >
              <Ionicons
                name="grid-outline"
                size={17}
                color={activeTab === "posts" ? colors.indigo : colors.muted}
              />
              <Text
                style={[
                  styles2.tabText,
                  activeTab === "posts" && styles2.activeTabText,
                ]}
              >
                My Posts
              </Text>
            </PressableScale>

            <PressableScale
              style={[
                styles2.tabButton,
                activeTab === "about" && styles2.activeTabButton,
              ]}
              onPress={() => setActiveTab("about")}
            >
              <Ionicons
                name="person-outline"
                size={17}
                color={activeTab === "about" ? colors.indigo : colors.muted}
              />
              <Text
                style={[
                  styles2.tabText,
                  activeTab === "about" && styles2.activeTabText,
                ]}
              >
                About
              </Text>
            </PressableScale>
          </View>
        </AnimatedSection>

        {/* Posts */}
        {activeTab === "posts" ? (
          <AnimatedSection delay={160}>
            {myPosts.length > 0 ? (
              <CommunityFeedSection
                posts={myPosts}
                onLike={toggleLike}
                onBookmark={toggleBookmark}
                onComment={(postId) =>
                  router.push({
                    pathname: "/post/[postid]",
                    params: { postid: String(postId) },
                  })
                }
                showHeader={false}
                showCategory
              />
            ) : (
              <View style={styles2.emptyPosts}>
                <View style={styles2.emptyIcon}>
                  <Ionicons
                    name="newspaper-outline"
                    size={28}
                    color={colors.indigo}
                  />
                </View>

                <Text style={styles2.emptyTitle}>No posts yet</Text>

                <Text style={styles2.emptyDescription}>
                  Share your thoughts, projects and campus experiences with the
                  community.
                </Text>

                <PressableScale
                  style={styles2.createPostButton}
                  onPress={() => router.push("/community")}
                >
                  <Ionicons name="add" size={18} color="#FFFFFF" />
                  <Text style={styles2.createPostText}>
                    Create your first post
                  </Text>
                </PressableScale>
              </View>
            )}
          </AnimatedSection>
        ) : (
          <AnimatedSection delay={160}>
            {/* Academic information */}
            <View style={styles2.sectionCard}>
              <View style={styles2.sectionTitleRow}>
                <View style={styles2.sectionIcon}>
                  <Ionicons
                    name="school-outline"
                    size={19}
                    color={colors.indigo}
                  />
                </View>
                <Text style={styles2.sectionTitle}>Academic Information</Text>
              </View>

              <InfoRow
                label="University"
                value={profile.university}
                icon="business-outline"
              />

              <InfoRow
                label="Course"
                value={profile.course}
                icon="book-outline"
              />

              <InfoRow
                label="Current Role"
                value={profile.role}
                icon="person-outline"
                last
              />
            </View>

            {/* Skills */}
            <View style={styles2.sectionCard}>
              <View style={styles2.sectionTitleRow}>
                <View style={styles2.sectionIcon}>
                  <Ionicons
                    name="flash-outline"
                    size={19}
                    color={colors.indigo}
                  />
                </View>
                <Text style={styles2.sectionTitle}>Skills & Interests</Text>
              </View>

              <View style={styles2.skillsContainer}>
                {SKILLS.map((skill) => (
                  <View key={skill} style={styles2.skillChip}>
                    <Text style={styles2.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Achievements */}
            <View style={styles2.sectionCard}>
              <View style={styles2.sectionTitleRow}>
                <View style={styles2.sectionIcon}>
                  <Ionicons
                    name="ribbon-outline"
                    size={19}
                    color={colors.indigo}
                  />
                </View>
                <Text style={styles2.sectionTitle}>Achievements</Text>
              </View>

              {ACHIEVEMENTS.map((item, index) => (
                <View
                  key={item.title}
                  style={[
                    styles2.achievementRow,
                    index === ACHIEVEMENTS.length - 1 &&
                      styles2.lastAchievement,
                  ]}
                >
                  <View style={styles2.achievementIcon}>
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={colors.indigo}
                    />
                  </View>

                  <View style={styles2.achievementInfo}>
                    <Text style={styles2.achievementTitle}>{item.title}</Text>
                    <Text style={styles2.achievementDescription}>
                      {item.description}
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={17}
                    color={colors.muted}
                  />
                </View>
              ))}
            </View>
          </AnimatedSection>
        )}

        <Text style={styles2.footerText}>
          Made for students, built for the future. ✨
        </Text>
      </ScrollView>

      {/* Settings modal */}
      <Modal
        visible={settingsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSettingsVisible(false)}
      >
        <Pressable
          style={styles2.modalOverlay}
          onPress={() => setSettingsVisible(false)}
        >
          <Pressable
            style={styles2.settingsSheet}
            onPress={(event) => event.stopPropagation()}
          >
            <View style={styles2.sheetHandle} />

            <View style={styles2.modalHeader}>
              <View>
                <Text style={styles2.modalTitle}>Settings</Text>
                <Text style={styles2.modalSubtitle}>
                  Manage your app preferences
                </Text>
              </View>

              <PressableScale
                style={styles2.closeButton}
                onPress={() => setSettingsVisible(false)}
              >
                <Ionicons name="close" size={21} color={colors.text} />
              </PressableScale>
            </View>

            <View style={styles2.settingRow}>
              <View style={styles2.settingIcon}>
                <Ionicons
                  name={isDark ? "moon-outline" : "sunny-outline"}
                  size={20}
                  color={colors.indigo}
                />
              </View>

              <View style={styles2.settingInfo}>
                <Text style={styles2.settingTitle}>Dark Mode</Text>
                <Text style={styles2.settingDescription}>
                  Change your app appearance
                </Text>
              </View>

              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{
                  false: colors.border,
                  true: colors.indigo,
                }}
                thumbColor="#FFFFFF"
              />
            </View>

            <SettingsRow
              icon="person-outline"
              title="Personal Information"
              subtitle="Manage your profile details"
              onPress={() => {
                setSettingsVisible(false);
                openEditProfile();
              }}
            />

            <SettingsRow
              icon="lock-closed-outline"
              title="Privacy & Security"
              subtitle="Manage your account privacy"
              onPress={() =>
                Alert.alert(
                  "Coming soon",
                  "Privacy settings will be available soon.",
                )
              }
            />

            <SettingsRow
              icon="help-circle-outline"
              title="Help & Support"
              subtitle="Get help with Academic-X"
              onPress={() =>
                Alert.alert(
                  "Help & Support",
                  "Support options will be available soon.",
                )
              }
            />

            <Text style={styles2.versionText}>Academic-X • Version 1.0.0</Text>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Edit Profile modal */}
      <Modal
        visible={editVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setEditVisible(false)}
      >
        <View style={styles2.editOverlay}>
          <KeyboardAvoidingView
            style={styles2.keyboardContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
          >
            <View style={styles2.editModalSheet}>
              <View style={styles2.sheetHandle} />

              {/* Fixed modal header */}
              <View style={styles2.editModalHeader}>
                <View>
                  <Text style={styles2.modalTitle}>Edit Profile</Text>
                  <Text style={styles2.modalSubtitle}>
                    Update your personal information
                  </Text>
                </View>

                <PressableScale
                  style={styles2.closeButton}
                  onPress={() => setEditVisible(false)}
                >
                  <Ionicons name="close" size={21} color={colors.text} />
                </PressableScale>
              </View>

              {/* Scrollable form */}
              <ScrollView
                style={styles2.editScrollView}
                contentContainerStyle={styles2.editFormContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode={
                  Platform.OS === "ios" ? "interactive" : "on-drag"
                }
                automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
              >
                <EditField
                  label="Full Name"
                  value={profileDraft.name}
                  placeholder="Enter your full name"
                  onChangeText={(value) => updateDraft("name", value)}
                />

                <EditField
                  label="Username"
                  value={profileDraft.username}
                  placeholder="Enter username"
                  autoCapitalize="none"
                  onChangeText={(value) => updateDraft("username", value)}
                />

                <EditField
                  label="Professional Role"
                  value={profileDraft.role}
                  placeholder="e.g. Computer Science Student"
                  onChangeText={(value) => updateDraft("role", value)}
                />

                <EditField
                  label="Bio"
                  value={profileDraft.bio}
                  placeholder="Tell people about yourself..."
                  multiline
                  maxLength={180}
                  onChangeText={(value) => updateDraft("bio", value)}
                />

                <EditField
                  label="University / College"
                  value={profileDraft.university}
                  placeholder="Enter university name"
                  onChangeText={(value) => updateDraft("university", value)}
                />

                <EditField
                  label="Course / Degree"
                  value={profileDraft.course}
                  placeholder="e.g. B.Tech Computer Science"
                  onChangeText={(value) => updateDraft("course", value)}
                />

                <EditField
                  label="Location"
                  value={profileDraft.location}
                  placeholder="City, State"
                  onChangeText={(value) => updateDraft("location", value)}
                />

                <View style={styles2.editActions}>
                  <PressableScale
                    style={styles2.cancelButton}
                    onPress={() => setEditVisible(false)}
                  >
                    <Text style={styles2.cancelButtonText}>Cancel</Text>
                  </PressableScale>

                  <PressableScale
                    style={styles2.saveButton}
                    onPress={saveProfile}
                  >
                    <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                    <Text style={styles2.saveButtonText}>Save Changes</Text>
                  </PressableScale>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function InfoRow({
  label,
  value,
  icon,
  last = false,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  last?: boolean;
}) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        infoStyles.row,
        { borderBottomColor: colors.border },
        last && infoStyles.last,
      ]}
    >
      <Ionicons name={icon} size={18} color={colors.muted} />

      <View style={infoStyles.content}>
        <Text style={[infoStyles.label, { color: colors.muted }]}>{label}</Text>
        <Text style={[infoStyles.value, { color: colors.text }]}>{value}</Text>
      </View>
    </View>
  );
}

const infoStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  last: {
    borderBottomWidth: 0,
    paddingBottom: 2,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },
});

function SettingsRow({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  const { colors } = useAppTheme();

  return (
    <PressableScale
      onPress={onPress}
      style={[settingsRowStyles.row, { borderBottomColor: colors.border }]}
    >
      <View style={[settingsRowStyles.icon, { backgroundColor: colors.input }]}>
        <Ionicons name={icon} size={19} color={colors.indigo} />
      </View>

      <View style={settingsRowStyles.info}>
        <Text style={[settingsRowStyles.title, { color: colors.text }]}>
          {title}
        </Text>
        <Text style={[settingsRowStyles.subtitle, { color: colors.muted }]}>
          {subtitle}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={17} color={colors.muted} />
    </PressableScale>
  );
}

const settingsRowStyles = StyleSheet.create({
  row: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 11,
    marginTop: 4,
  },
});

function createStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    pageContent: {
      paddingHorizontal: 18,
      paddingBottom: 35,
    },

    topHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 10,
      paddingBottom: 20,
    },
    brandText: {
      fontSize: 23,
      fontWeight: "900",
      letterSpacing: -1,
      color: colors.text,
    },
    brandAccent: {
      color: colors.indigo,
    },
    headerSubtitle: {
      color: colors.muted,
      fontSize: 12,
      marginTop: 3,
    },
    settingsButton: {
      height: 43,
      width: 43,
      borderRadius: 15,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },

    profileCard: {
      backgroundColor: colors.card,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    cover: {
      height: 125,
      backgroundColor: colors.primaryLight,
      padding: 18,
      justifyContent: "center",
      overflow: "hidden",
    },
    coverDecorationOne: {
      position: "absolute",
      width: 180,
      height: 180,
      borderRadius: 100,
      backgroundColor: colors.indigo,
      opacity: 0.09,
      right: -35,
      top: -95,
    },
    coverDecorationTwo: {
      position: "absolute",
      width: 130,
      height: 130,
      borderRadius: 100,
      backgroundColor: colors.indigo,
      opacity: 0.08,
      right: 70,
      bottom: -100,
    },
    coverBrand: {
      fontSize: 36,
      fontWeight: "900",
      color: colors.text,
      letterSpacing: -2,
    },
    coverBrandAccent: {
      color: colors.indigo,
    },
    coverCaption: {
      fontSize: 9,
      fontWeight: "800",
      letterSpacing: 2,
      color: colors.muted,
      marginTop: 2,
    },

    profileInfo: {
      paddingHorizontal: 17,
      paddingBottom: 18,
    },
    avatarRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginTop: -39,
      marginBottom: 12,
    },
    avatarWrapper: {
      position: "relative",
      padding: 4,
      borderRadius: 25,
      backgroundColor: colors.card,
    },
    avatar: {
      width: 82,
      height: 82,
      borderRadius: 22,
      backgroundColor: colors.indigo,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: {
      color: "#FFFFFF",
      fontSize: 27,
      fontWeight: "900",
    },
    onlineDot: {
      position: "absolute",
      width: 17,
      height: 17,
      borderRadius: 10,
      backgroundColor: "#10B981",
      borderWidth: 3,
      borderColor: colors.card,
      right: 2,
      bottom: 3,
    },
    profileActions: {
      paddingBottom: 3,
    },
    editButton: {
      height: 37,
      paddingHorizontal: 13,
      borderRadius: 11,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.input,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    editButtonText: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "700",
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    profileName: {
      color: colors.text,
      fontSize: 21,
      fontWeight: "900",
      letterSpacing: -0.5,
    },
    username: {
      color: colors.muted,
      fontSize: 13,
      marginTop: 3,
    },
    role: {
      color: colors.indigo,
      fontSize: 12,
      fontWeight: "700",
      marginTop: 12,
    },
    bio: {
      color: colors.text,
      fontSize: 13,
      lineHeight: 20,
      marginTop: 9,
    },
    profileMeta: {
      gap: 9,
      marginTop: 15,
    },
    metaItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    metaText: {
      color: colors.muted,
      fontSize: 11,
      flex: 1,
    },

    statsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginTop: 18,
      paddingTop: 15,
    },
    statItem: {
      flex: 1,
      alignItems: "center",
      gap: 3,
    },
    statNumber: {
      fontSize: 18,
      fontWeight: "900",
      color: colors.text,
    },
    statLabel: {
      fontSize: 11,
      color: colors.muted,
    },
    statDivider: {
      width: 1,
      height: 30,
      backgroundColor: colors.border,
    },

    tabsContainer: {
      flexDirection: "row",
      backgroundColor: colors.card,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 5,
      marginTop: 17,
      marginBottom: 15,
    },
    tabButton: {
      flex: 1,
      height: 42,
      borderRadius: 11,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
    },
    activeTabButton: {
      backgroundColor: colors.primaryLight,
    },
    tabText: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.muted,
    },
    activeTabText: {
      color: colors.indigo,
    },

    emptyPosts: {
      backgroundColor: colors.card,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 25,
      alignItems: "center",
      marginTop: 2,
    },
    emptyIcon: {
      width: 58,
      height: 58,
      borderRadius: 19,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primaryLight,
      marginBottom: 14,
    },
    emptyTitle: {
      fontSize: 16,
      fontWeight: "800",
      color: colors.text,
    },
    emptyDescription: {
      textAlign: "center",
      color: colors.muted,
      fontSize: 12,
      lineHeight: 19,
      marginTop: 8,
      marginBottom: 17,
    },
    createPostButton: {
      height: 43,
      borderRadius: 13,
      paddingHorizontal: 16,
      backgroundColor: colors.indigo,
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    createPostText: {
      color: "#FFFFFF",
      fontWeight: "800",
      fontSize: 12,
    },

    sectionCard: {
      backgroundColor: colors.card,
      borderRadius: 19,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      marginBottom: 13,
    },
    sectionTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 14,
    },
    sectionIcon: {
      height: 36,
      width: 36,
      borderRadius: 12,
      backgroundColor: colors.primaryLight,
      alignItems: "center",
      justifyContent: "center",
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "800",
      color: colors.text,
    },
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    skillChip: {
      backgroundColor: colors.primaryLight,
      borderRadius: 10,
      paddingHorizontal: 11,
      paddingVertical: 8,
    },
    skillText: {
      fontSize: 11,
      fontWeight: "700",
      color: colors.indigo,
    },
    achievementRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    lastAchievement: {
      borderBottomWidth: 0,
      paddingBottom: 0,
    },
    achievementIcon: {
      width: 39,
      height: 39,
      borderRadius: 13,
      backgroundColor: colors.primaryLight,
      alignItems: "center",
      justifyContent: "center",
    },
    achievementInfo: {
      flex: 1,
    },
    achievementTitle: {
      fontSize: 12,
      fontWeight: "800",
      color: colors.text,
    },
    achievementDescription: {
      fontSize: 10,
      color: colors.muted,
      marginTop: 4,
    },
    footerText: {
      textAlign: "center",
      color: colors.muted,
      fontSize: 11,
      marginTop: 22,
      marginBottom: 10,
    },

    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: colors.overlay,
    },
    settingsSheet: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: Platform.OS === "ios" ? 30 : 22,
    },
    sheetHandle: {
      width: 40,
      height: 4,
      borderRadius: 3,
      backgroundColor: colors.border,
      alignSelf: "center",
      marginBottom: 19,
    },
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 19,
    },
    modalTitle: {
      fontSize: 19,
      fontWeight: "900",
      color: colors.text,
    },
    modalSubtitle: {
      color: colors.muted,
      fontSize: 11,
      marginTop: 4,
    },
    closeButton: {
      height: 36,
      width: 36,
      borderRadius: 12,
      backgroundColor: colors.input,
      alignItems: "center",
      justifyContent: "center",
    },
    settingRow: {
      minHeight: 76,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingIcon: {
      width: 40,
      height: 40,
      borderRadius: 13,
      backgroundColor: colors.primaryLight,
      alignItems: "center",
      justifyContent: "center",
    },
    settingInfo: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 14,
      fontWeight: "800",
      color: colors.text,
    },
    settingDescription: {
      color: colors.muted,
      fontSize: 11,
      marginTop: 4,
    },
    versionText: {
      color: colors.muted,
      fontSize: 10,
      textAlign: "center",
      marginTop: 19,
    },

    editOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: colors.overlay,
    },
    keyboardContainer: {
      flex: 1,
      justifyContent: "flex-end",
    },
    editModalSheet: {
      height: "90%",
      maxHeight: "90%",
      backgroundColor: colors.card,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingTop: 12,
      paddingHorizontal: 20,
      overflow: "hidden",
    },
    editModalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 17,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    editScrollView: {
      flex: 1,
    },
    editFormContent: {
      paddingTop: 19,
      paddingBottom: 35,
      flexGrow: 1,
    },
    editActions: {
      flexDirection: "row",
      gap: 10,
      marginTop: 8,
      paddingBottom: 12,
    },
    cancelButton: {
      height: 49,
      flex: 1,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.input,
      alignItems: "center",
      justifyContent: "center",
    },
    cancelButtonText: {
      fontSize: 13,
      fontWeight: "800",
      color: colors.text,
    },
    saveButton: {
      height: 49,
      flex: 1.5,
      borderRadius: 14,
      backgroundColor: colors.indigo,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 7,
    },
    saveButtonText: {
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: "800",
    },
  });
}
