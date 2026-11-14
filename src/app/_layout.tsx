import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RouterThemeProvider,
  Stack,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { CommunityProvider } from "@/features/community/providers/community-provider";
import {
  ThemeProvider as AppThemeProvider,
  useAppTheme,
} from "@/providers/theme-provider";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { isDark } = useAppTheme();

  return (
    <RouterThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="post/[postid]" />
      </Stack>
    </RouterThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <CommunityProvider>
        <RootNavigator />
      </CommunityProvider>
    </AppThemeProvider>
  );
}
