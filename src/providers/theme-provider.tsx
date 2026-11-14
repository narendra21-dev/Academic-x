import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { darkColors, lightColors, type AppColors } from "@/theme";

export type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "academic-x-theme";

type ThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  colors: AppColors;
  isThemeLoaded: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

        if (mounted && (savedTheme === "light" || savedTheme === "dark")) {
          setModeState(savedTheme);
        }
      } catch (error) {
        console.warn("Unable to load saved theme:", error);
      } finally {
        if (mounted) setIsThemeLoaded(true);
      }
    }

    loadTheme();

    return () => {
      mounted = false;
    };
  }, []);

  const setMode = useCallback((nextMode: ThemeMode) => {
    setModeState(nextMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setModeState((current) => (current === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    if (!isThemeLoaded) return;

    AsyncStorage.setItem(THEME_STORAGE_KEY, mode).catch((error) => {
      console.warn("Unable to save saved theme:", error);
    });
  }, [mode, isThemeLoaded]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark: mode === "dark",
      colors: mode === "dark" ? darkColors : lightColors,
      isThemeLoaded,
      setMode,
      toggleTheme,
    }),
    [mode, isThemeLoaded, setMode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside ThemeProvider");
  }

  return context;
}
