import Button from "@/components/Button";
import InputField from "@/components/InputField";
import constantStyles from "@/constant/colors";
import { checkBiometricSupport, handleBiometrics } from "@/functions/Biometrics";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
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
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [fp, setFp] = useState<boolean>(false);
  

  const checkBiometrics = async () => {
    const biometrics = await checkBiometricSupport();
    if (biometrics) {
      setFp(true);
    }
  }
  checkBiometrics();
  
  const biometricsHandler = async () => {
    handleBiometrics().then((res) => {
      if (res) {
        router.replace("/(tabs)");
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

    router.replace("/(tabs)");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={constantStyles.statusBarcolor} barStyle="dark-content" />
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
                source={require("../../assets/images/brand-logo.png")}
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
                <Ionicons name="shield-checkmark" color="#087208" size={15} />
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
              onPress={() => router.push("/password-reset/")}
            >
              <Text style={styles.forgotText}>Reset password</Text>
            </TouchableOpacity>

            <Button disabled={loading} onClick={signInHandler} label="Sign In" />

            { fp && <TouchableOpacity
                activeOpacity={0.85}
                style={styles.biometricButton}
                disabled={loading}
                onPress={biometricsHandler}
              >
              <Ionicons name="finger-print" color="#087208" size={18} />
              <Text style={styles.biometricText}>Use biometrics</Text>
            </TouchableOpacity>}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.footerLink}
            onPress={() => router.push("/signup")}
          >
            <Text style={styles.footerText}>
              Don't have an account?
              <Text style={styles.footerTextStrong}> Sign up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constantStyles.foregroundColor,
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
    backgroundColor: "#ffffff",
    borderColor: "#d8f3d8",
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
    color: "#112311",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    color: "#5f7d5f",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    maxWidth: 280,
    textAlign: "center",
  },
  formPanel: {
    backgroundColor: "#ffffff",
    borderColor: "#e1f3e1",
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
    color: "#112311",
    fontSize: 20,
    fontWeight: "800",
  },
  panelSubtitle: {
    color: "#6b846b",
    fontSize: 12,
    marginTop: 3,
  },
  secureBadge: {
    alignItems: "center",
    backgroundColor: "#ecffec",
    borderColor: "#cceccc",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  secureText: {
    color: "#087208",
    fontSize: 12,
    fontWeight: "700",
  },
  errorText: {
    color: "#b3261e",
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
    color: "#087208",
    fontSize: 13,
    fontWeight: "700",
  },
  biometricButton: {
    alignItems: "center",
    borderColor: "#d8f3d8",
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    height: 52,
    justifyContent: "center",
    marginTop: 12,
  },
  biometricText: {
    color: "#087208",
    fontSize: 14,
    fontWeight: "700",
  },
  footerLink: {
    alignItems: "center",
    marginTop: 22,
  },
  footerText: {
    color: "#4f674f",
    fontSize: 14,
  },
  footerTextStrong: {
    color: "#087208",
    fontWeight: "800",
  },
});
