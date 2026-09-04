import { useColorScheme } from "react-native";

export const themes = {
  light: {
    isDark: false,
    statusBarColor: "#f6fff6",
    statusBarStyle: "dark-content" as const,
    foregroundColor: "#f6fff6",
    surface: "#ffffff",
    surfaceMuted: "#f5fff5",
    surfaceSoft: "#ecffec",
    border: "#d8f3d8",
    borderSoft: "#e1f3e1",
    text: "#112311",
    textMuted: "#5f7d5f",
    textSoft: "#6b846b",
    textFaint: "#8ba08b",
    brand: "#087208",
    brandStrong: "#088208",
    brandButton: "#0d9e0d",
    brandText: "#087208",
    onBrand: "#ffffff",
    brandSubtleText: "#dfffe2",
    positive: "#087208",
    positiveSoft: "#ecffec",
    negative: "#b3261e",
    negativeSoft: "#fff0ee",
    shadow: "#57575711",
  },
  dark: {
    isDark: true,
    statusBarColor: "#06110a",
    statusBarStyle: "light-content" as const,
    foregroundColor: "#06110a",
    surface: "#0f1b13",
    surfaceMuted: "#122417",
    surfaceSoft: "#16331d",
    border: "#234a2a",
    borderSoft: "#1d3a23",
    text: "#effaf0",
    textMuted: "#a9c9ad",
    textSoft: "#8fb494",
    textFaint: "#6f9275",
    brand: "#5ee26a",
    brandStrong: "#0a8f24",
    brandButton: "#16ad35",
    brandText: "#74f282",
    onBrand: "#ffffff",
    brandSubtleText: "#dbffdf",
    positive: "#64e773",
    positiveSoft: "#153b1b",
    negative: "#ff8a80",
    negativeSoft: "#3a1715",
    shadow: "#00000055",
  },
};

export type AppTheme = (typeof themes)[keyof typeof themes];

export function useAppTheme(): AppTheme {
  const scheme = useColorScheme();

  return (scheme === "dark") ? themes.dark : themes.light;
}

export default themes.light;
