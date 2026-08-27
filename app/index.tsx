import Button from "@/components/Button";
import { AppTheme, useAppTheme } from "@/constant/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const trustItems = [
  {
    icon: "shield-checkmark",
    label: "Protected wallet access",
  },
  {
    icon: "flash",
    label: "Fast transfers and top ups",
  },
  {
    icon: "receipt",
    label: "Clear transaction history",
  },
];

export default function Index() {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.statusBarColor} barStyle={theme.statusBarStyle} />

      <View style={styles.content}>
        <View style={styles.brandRow}>
          <View style={styles.logoWrap}>
            <Image
              source={require("../assets/images/brand-logo-dark.png")}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          <View>
            <Text style={styles.brandName}>Zelari</Text>
            <Text style={styles.brandSubtext}>Digital wallet</Text>
          </View>
        </View>

        <View style={styles.previewCard}>
          <View style={styles.previewHeader}>
            <View>
              <Text style={styles.previewLabel}>Available Balance</Text>
              <Text style={styles.previewAmount}>₦1,000,000.00</Text>
            </View>

            <View style={styles.secureBadge}>
              <Ionicons name="lock-closed" color={theme.brandText} size={14} />
              <Text style={styles.secureText}>Secure</Text>
            </View>
          </View>

          <View style={styles.previewDivider} />

          <View style={styles.previewStats}>
            <View>
              <Text style={styles.statLabel}>Today</Text>
              <Text style={styles.statValue}>+₦24,000</Text>
            </View>
            <View style={styles.statPill}>
              <Feather name="arrow-up-right" color={theme.brandText} size={18} />
            </View>
          </View>
        </View>

        <View style={styles.heroTextBlock}>
          <Text style={styles.title}>Simple money control you can trust</Text>
          <Text style={styles.subtitle}>
            Manage your wallet, buy data, fund your balance, and track activity from one clean dashboard.
          </Text>
        </View>

        <View style={styles.trustList}>
          {trustItems.map((item) => (
            <View key={item.label} style={styles.trustItem}>
              <View style={styles.trustIcon}>
                <Ionicons name={item.icon as any} color={theme.brandText} size={16} />
              </View>
              <Text style={styles.trustLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <Button label="Get Started" icon onClick={() => router.push("/signin")} />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.foregroundColor,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  brandRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 30,
  },
  logoWrap: {
    alignItems: "center",
    backgroundColor: theme.surface,
    borderColor: theme.border,
    borderRadius: 20,
    borderWidth: 1,
    height: 62,
    justifyContent: "center",
    marginRight: 12,
    width: 62,
  },
  logo: {
    height: 42,
    width: 42,
  },
  brandName: {
    color: theme.text,
    fontSize: 24,
    fontWeight: "800",
  },
  brandSubtext: {
    color: theme.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  previewCard: {
    backgroundColor: theme.brandStrong,
    borderRadius: 22,
    marginBottom: 30,
    padding: 20,
  },
  previewHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  previewLabel: {
    color: theme.brandSubtleText,
    fontSize: 13,
    fontWeight: "600",
  },
  previewAmount: {
    color: theme.onBrand,
    fontSize: 29,
    fontWeight: "800",
    marginTop: 8,
  },
  secureBadge: {
    alignItems: "center",
    backgroundColor: theme.surface,
    borderRadius: 15,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  secureText: {
    color: theme.brandText,
    fontSize: 12,
    fontWeight: "800",
  },
  previewDivider: {
    backgroundColor: "rgba(255,255,255,0.22)",
    height: 1,
    marginVertical: 18,
  },
  previewStats: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statLabel: {
    color: theme.brandSubtleText,
    fontSize: 12,
  },
  statValue: {
    color: theme.onBrand,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 3,
  },
  statPill: {
    alignItems: "center",
    backgroundColor: theme.surface,
    borderRadius: 17,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  heroTextBlock: {
    marginBottom: 22,
  },
  title: {
    color: theme.text,
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
  },
  subtitle: {
    color: theme.textMuted,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
  },
  trustList: {
    gap: 11,
  },
  trustItem: {
    alignItems: "center",
    backgroundColor: theme.surface,
    borderColor: theme.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    padding: 12,
  },
  trustIcon: {
    alignItems: "center",
    backgroundColor: theme.surfaceSoft,
    borderRadius: 16,
    height: 32,
    justifyContent: "center",
    marginRight: 10,
    width: 32,
  },
  trustLabel: {
    color: theme.text,
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
  },
  actions: {
    paddingBottom: 8,
  },
  signInButton: {
    alignItems: "center",
    borderColor: theme.border,
    borderRadius: 15,
    borderWidth: 1,
    height: 54,
    justifyContent: "center",
    marginTop: 12,
  },
  signInText: {
    color: theme.brandText,
    fontSize: 14,
    fontWeight: "800",
  },
});
