import { Stack } from "expo-router";
import { useAppTheme } from "@/constant/colors";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

export default function RootLayout() {
  const theme = useAppTheme();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.foregroundColor);
  }, [theme.foregroundColor]);

  return <Stack screenOptions={{
    headerShown: false,
    animation: "slide_from_right",
    contentStyle: {
      backgroundColor: theme.foregroundColor,
    },
  }}>
    <Stack.Screen name="index" options={{headerShown: false}}/>
    <Stack.Screen name="(tabs)" options={{animation: "fade"}}/>
    <Stack.Screen name="signin/index" options={{title: "Sign In", headerShown: false}}/>
    <Stack.Screen name="signup/index" options={{title: "Sign Up", headerShown: false}}/>
    <Stack.Screen name="password-reset/index" options={{title: "Reset Password", headerShown: false}}/>
  </Stack>;
}
