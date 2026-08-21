import Button from "@/components/Button";
import InputField from "@/components/InputField";
import constantStyles from "@/constant/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { goBack } from "expo-router/build/global-state/routing";
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

export default function PasswordReset() {
  const [email, setEmail] = useState<string>("");
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const resetPasswordHandler = async () => {
    if (!email || !email.includes("@")) {
      setEmailErr(true);
      setSent(false);
      return;
    }

    setEmailErr(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
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
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" color="#087208" size={20} />
          </TouchableOpacity>

          <View style={styles.hero}>
            <View style={styles.logoWrap}>
              <Image
                source={require("../../assets/images/brand-logo.png")}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>

            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.subtitle}>
              Enter your email and we will send password reset instructions.
            </Text>
          </View>

          <View style={styles.formPanel}>
            <View style={styles.panelHeader}>
              <View>
                <Text style={styles.panelTitle}>Account recovery</Text>
                <Text style={styles.panelSubtitle}>Use the email linked to your wallet</Text>
              </View>

              <View style={styles.secureBadge}>
                <Ionicons name="mail" color="#087208" size={15} />
                <Text style={styles.secureText}>Email</Text>
              </View>
            </View>

            {sent && (
              <View style={styles.successBox}>
                <Ionicons name="checkmark-circle" color="#087208" size={19} />
                <Text style={styles.successText}>
                  Reset instructions have been sent to your email.
                </Text>
              </View>
            )}

            <InputField
              type="email"
              onChangeText={(value: string) => {
                setEmail(value);
                if (emailErr) {
                  setEmailErr(false);
                }
                if (sent) {
                  setSent(false);
                }
              }}
              value={email}
              placeholder="Email address"
              error={emailErr}
            />
            {emailErr && <Text style={styles.errorText}>Enter a valid email address.</Text>}

            <Button
              disabled={loading}
              onClick={resetPasswordHandler}
              label={sent ? "Send again" : "Send reset link"}
            />

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.signInButton}
              onPress={() => goBack()}
              disabled={loading}
            >
              <Ionicons name="log-in-outline" color="#087208" size={18} />
              <Text style={styles.signInText}>Back to sign in</Text>
            </TouchableOpacity>
          </View>
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
  backButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#d8f3d8",
    borderRadius: 18,
    borderWidth: 1,
    height: 36,
    justifyContent: "center",
    left: 20,
    position: "absolute",
    top: 20,
    width: 36,
    zIndex: 2,
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
    maxWidth: 300,
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
    maxWidth: 210,
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
  successBox: {
    alignItems: "flex-start",
    backgroundColor: "#f5fff5",
    borderColor: "#cceccc",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    padding: 12,
  },
  successText: {
    color: "#315f31",
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  errorText: {
    color: "#b3261e",
    fontSize: 12,
    marginBottom: 12,
    marginTop: -12,
  },
  signInButton: {
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
  signInText: {
    color: "#087208",
    fontSize: 14,
    fontWeight: "700",
  },
});
