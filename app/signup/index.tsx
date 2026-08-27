import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { AppTheme, useAppTheme } from "@/constant/colors";
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


export default function Signup() {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [password, setPassword] = useState<string>("200930Joshua.");
  const [confirmPassword, setConfirmPassword] = useState<string>("200930Joshua.");
  const [email, setEmail] = useState<string>("joshuadivine985@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState<string>("09044013437");
  const [fullName, setFullName] = useState<string>("Divine David");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [phoneErr, setPhoneErr] = useState<boolean>(false);
  const [nameErr, setNameErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState<boolean>(false);

  const signUpHandler = async () => {
    const emailInvalid = !email || !email.split("@")[0] || !email.split("@")[1] || !email.split(".")[1];
    const phoneInvalid = phoneNumber.trim().length < 8;
    const nameInvalid = fullName.trim().length < 2;
    const passwordInvalid = password.length < 6;
    const confirmPasswordInvalid = confirmPassword !== password;

    setEmailErr(emailInvalid);
    setPhoneErr(phoneInvalid);
    setNameErr(nameInvalid);
    setPasswordErr(passwordInvalid);
    setConfirmPasswordErr(confirmPasswordInvalid);

    if (
      emailInvalid ||
      phoneInvalid ||
      nameInvalid ||
      passwordInvalid ||
      confirmPasswordInvalid
    ) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://192.168.0.109:3000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phoneNumber,
          fullName,
          password,
        }),
      });
      if(response.status !== 200) {
        const errorData = await response.json();
        console.log("Error: ", errorData);
        setLoading(false);
        return;
      }

      await response.json();
      setLoading(false);
      
    } catch (error : any) {
      if(error.error.includes("Email already exists")) {
      }
      setEmailErr(true);
      setLoading(false);
      console.log("Error: ", error);
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
                source={require("../../assets/images/brand-logo.png")}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>

            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Set up your Zelari wallet in a few quick steps.</Text>
          </View>

          <View style={styles.formPanel}>
            <View style={styles.panelHeader}>
              <View>
                <Text style={styles.panelTitle}>Get started</Text>
                <Text style={styles.panelSubtitle}>Enter your details exactly as you use them</Text>
              </View>

              <View style={styles.stepBadge}>
                <Ionicons name="person-add" color={theme.brandText} size={15} />
                <Text style={styles.stepText}>New</Text>
              </View>
            </View>

            <InputField
              type="email"
              onChangeText={setEmail}
              value={email}
              placeholder="Email address"
              error={emailErr}
            />
            {emailErr && <Text style={styles.errorText}>Email already exists or is invalid.</Text>}

            <InputField
              type="numberic"
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              placeholder="Phone number"
              error={phoneErr}
            />
            {phoneErr && <Text style={styles.errorText}>Enter a valid phone number.</Text>}

            <InputField
              type="text"
              onChangeText={setFullName}
              value={fullName}
              placeholder="Full name"
              error={nameErr}
            />
            {nameErr && <Text style={styles.errorText}>Enter your full name.</Text>}

            <InputField
              type="password"
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              error={passwordErr}
            />
            {passwordErr && <Text style={styles.errorText}>Password must be at least 6 characters.</Text>}

            <InputField
              type="password"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Confirm password"
              error={confirmPasswordErr}
            />
            {confirmPasswordErr && <Text style={styles.errorText}>Passwords do not match.</Text>}

            <View style={styles.termsBox}>
              <Ionicons name="lock-closed" color={theme.brandText} size={16} />
              <Text style={styles.termsText}>
                By signing up you agree to our
                <Text style={styles.termsLink}> privacy, terms and conditions.</Text>
              </Text>
            </View>

            <Button disabled={loading} onClick={signUpHandler} label="Create account" />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.footerLink}
            onPress={() => router.back()}
          >
            <Text style={styles.footerText}>
              Already have an account?
              <Text style={styles.footerTextStrong}> Sign in</Text>
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
    paddingVertical: 28,
  },
  hero: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoWrap: {
    alignItems: "center",
    backgroundColor: theme.surface,
    borderColor: theme.border,
    borderRadius: 24,
    borderWidth: 1,
    height: 82,
    justifyContent: "center",
    marginBottom: 18,
    width: 82,
  },
  logo: {
    height: 56,
    width: 56,
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
    maxWidth: 210,
  },
  stepBadge: {
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
  stepText: {
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
  termsBox: {
    alignItems: "flex-start",
    backgroundColor: theme.surfaceMuted,
    borderColor: theme.border,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 9,
    marginBottom: 16,
    marginTop: -2,
    padding: 12,
  },
  termsText: {
    color: theme.textMuted,
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  termsLink: {
    color: theme.brandText,
    fontWeight: "800",
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
