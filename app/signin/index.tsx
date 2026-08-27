import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { AppTheme, useAppTheme } from "@/constant/colors";
import { checkBiometricSupport, handleBiometrics } from "@/functions/Biometrics";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signin() {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [fp, setFp] = useState<boolean>(false);
  const [sessionExists] = useState<boolean>(true);
  

  const checkBiometrics = async () => {
    const biometrics = await checkBiometricSupport();
    if (biometrics) {
      setFp(true);
    }
  }

  useEffect(() => {
    checkBiometrics();
  }, []);
  
  const biometricsHandler = async () => {
    handleBiometrics().then((res) => {
      if (res) {
        setLoading(true);
        setFp(false);
        setTimeout(() => {
          router.replace("/(tabs)");
        }, 2000);
      }
    });
  }
  const signInHandler = async () => {
    if (!email || !email.includes("@")) {
      setEmailErr(true);
      return;
    }

    setEmailErr(false);

    if (!password || password.length < 6) {
      setPasswordErr(true);
      return;
    }

    setPasswordErr(false);
    setLoading(true);

    setTimeout(() => {
      router.replace("/(tabs)");
      setLoading(false);
    }, 2000);

    try {
      const response = await fetch("http://192.168.0.109:3000/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        console.log("Error: ", data);
        return;
      }
      
    } catch (error : any) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.statusBarColor} barStyle={theme.statusBarStyle} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.logoWrap}>
              <Image
                source={require("../../assets/images/brand-logo-dark.png")}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>

            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue managing your wallet.</Text>
          </View>

          <View style={styles.formPanel}>
            <View style={styles.panelHeader}>
              <View>
                <Text style={styles.panelTitle}>Sign in</Text>
                <Text style={styles.panelSubtitle}>Use your Zelari account details</Text>
              </View>

              <View style={styles.secureBadge}>
                <Ionicons name="shield-checkmark" color={theme.brandText} size={15} />
                <Text style={styles.secureText}>Secure</Text>
              </View>
            </View>

            <InputField
              type="email"
              onChangeText={setEmail}
              value={email}
              placeholder="Email address"
              error={emailErr}
            />
            {emailErr && <Text style={styles.errorText}>Enter a valid email address.</Text>}

            <InputField
              type="password"
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              error={passwordErr}
            />
            {passwordErr && <Text style={styles.errorText}>Password must be at least 6 characters.</Text>}

            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.forgotButton}
              onPress={() => router.push("/password-reset")}
            >
              <Text style={styles.forgotText}>Reset password</Text>
            </TouchableOpacity>

            <Button disabled={loading} onClick={signInHandler} label="Sign In" />

            { fp && sessionExists && <TouchableOpacity
                activeOpacity={0.85}
                style={styles.biometricButton}
                disabled={loading}
                onPress={biometricsHandler}
              >
              <Ionicons name="finger-print" color={theme.brandText} size={18} />
              <Text style={styles.biometricText}>Use biometrics</Text>
            </TouchableOpacity>}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.footerLink}
            onPress={() => router.push("/signup")}
          >
            <Text style={styles.footerText}>
              Don{"'"}t have an account?
              <Text style={styles.footerTextStrong}> Sign up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.foregroundColor,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  hero: {
    alignItems: "center",
    marginBottom: 28,
  },
  logoWrap: {
    alignItems: "center",
    backgroundColor: theme.surface,
    borderColor: theme.border,
    borderRadius: 24,
    borderWidth: 1,
    height: 86,
    justifyContent: "center",
    marginBottom: 22,
    width: 86,
  },
  logo: {
    height: 58,
    width: 58,
  },
  title: {
    color: theme.text,
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    color: theme.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    maxWidth: 280,
    textAlign: "center",
  },
  formPanel: {
    backgroundColor: theme.surface,
    borderColor: theme.borderSoft,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },
  panelHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  panelTitle: {
    color: theme.text,
    fontSize: 20,
    fontWeight: "800",
  },
  panelSubtitle: {
    color: theme.textSoft,
    fontSize: 12,
    marginTop: 3,
  },
  secureBadge: {
    alignItems: "center",
    backgroundColor: theme.surfaceSoft,
    borderColor: theme.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  secureText: {
    color: theme.brandText,
    fontSize: 12,
    fontWeight: "700",
  },
  errorText: {
    color: theme.negative,
    fontSize: 12,
    marginBottom: 12,
    marginTop: -12,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 18,
    marginTop: -4,
  },
  forgotText: {
    color: theme.brandText,
    fontSize: 13,
    fontWeight: "700",
  },
  biometricButton: {
    alignItems: "center",
    borderColor: theme.border,
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    height: 52,
    justifyContent: "center",
    marginTop: 12,
  },
  biometricText: {
    color: theme.brandText,
    fontSize: 14,
    fontWeight: "700",
  },
  footerLink: {
    alignItems: "center",
    marginTop: 22,
  },
  footerText: {
    color: theme.textMuted,
    fontSize: 14,
  },
  footerTextStrong: {
    color: theme.brandText,
    fontWeight: "800",
  },
});
