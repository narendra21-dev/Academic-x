export const lightColors = {
  background: "#F8FAFC",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: "#0F172A",
  muted: "#64748B",

  primary: "#09090B",
  primaryLight: "#EEF2FF",
  indigo: "#6366F1",

  green: "#10B981",
  amber: "#F59E0B",
  danger: "#EF4444",

  tabBar: "#FFFFFF",
  tabInactive: "#94A3B8",
  input: "#F1F5F9",
  overlay: "rgba(15, 23, 42, 0.45)",

  skeleton: "#E8EDF4",
  skeletonHighlight: "#F8FAFC",
} as const;

export const darkColors = {
  background: "#090E1A",
  card: "#111827",
  border: "#263244",
  text: "#F8FAFC",
  muted: "#94A3B8",

  primary: "#F8FAFC",
  primaryLight: "#25264A",
  indigo: "#818CF8",

  green: "#34D399",
  amber: "#FBBF24",
  danger: "#F87171",

  tabBar: "#111827",
  tabInactive: "#64748B",
  input: "#1E293B",
  overlay: "rgba(0, 0, 0, 0.65)",

  skeleton: "#263244",
  skeletonHighlight: "#344258",
} as const;

export type AppColors = {
  [K in keyof typeof lightColors]: string;
};
