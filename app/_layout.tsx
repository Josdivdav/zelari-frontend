import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{
    headerShown: false,
    animation: "slide_from_right",
  }}>
    <Stack.Screen name="index" options={{headerShown: false}}/>
    <Stack.Screen name="(tabs)" options={{animation: "fade"}}/>
    <Stack.Screen name="signin/index" options={{title: "Sign In", headerShown: false}}/>
    <Stack.Screen name="signup/index" options={{title: "Sign Up", headerShown: false}}/>
    <Stack.Screen name="password-reset/index" options={{title: "Reset Password", headerShown: false}}/>
  </Stack>;
}
