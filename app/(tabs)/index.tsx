import EntryDataProvider from "@/components/EntryDataProvider";
import MainAction from "@/components/MainAction";
import constantStyles from "@/constant/colors";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const recentActivity = [
    {
        icon: "arrow-down-left",
        title: "Wallet top up",
        time: "Today, 9:41 AM",
        amount: "+₦24,000",
    },
    {
        icon: "smartphone",
        title: "MTN data bundle",
        time: "Yesterday, 4:12 PM",
        amount: "-₦2,500",
    },
];

function Index() {
    const [showBalance, setShowBalance] = useState<boolean>(false);
    const [balance] = useState<number>(10547);

    const [username, setUsername] = useState<string>("");


    const currency = useMemo(
        () =>
            new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                maximumFractionDigits: 2,
            }),
        []
    );

    const fetchDB = async () => {
        const req = await fetch("http://192.168.43.212:3000/");
        const res = await req.json();
        
        setUsername(res.result);
    }
    fetchDB()

    const hiddenBalance = "••••••••";
    const balanceLabel = showBalance ? currency.format(balance) : hiddenBalance;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={constantStyles.statusBarcolor} barStyle="dark-content" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.header}>
                    <View style={styles.profileRow}>
                        <View style={styles.avatar}>
                            <FontAwesome6 name="user" size={15} color="#0f7201" />
                        </View>
                        <View>
                            <Text style={styles.greeting}>Good morning</Text>
                            <Text style={styles.name}>{ username }</Text>
                        </View>
                    </View>

                    <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}>
                        <FontAwesome6 name="bell" color="#155b16" size={17} />
                    </TouchableOpacity>
                </View>

                <View style={styles.balanceCard}>
                    <View style={styles.balanceTopRow}>
                        <View style={styles.balanceLabelRow}>
                            <Ionicons name="shield-checkmark" color="#dfffe2" size={16} />
                            <Text style={styles.balanceCaption}>Wallet Balance</Text>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.visibilityButton}
                            onPress={() => setShowBalance((value) => !value)}
                        >
                            <Feather name={showBalance ? "eye" : "eye-off"} color="#ffffff" size={16} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.balanceAmount} numberOfLines={1}>
                        {balanceLabel}
                    </Text>
                    <Text style={styles.balanceSubText}>Available balance</Text>

                    <TouchableOpacity activeOpacity={0.85} style={styles.fundButton}>
                        <Feather name="plus" color="#087208" size={16} />
                        <Text style={styles.fundButtonText}>Fund Wallet</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.quickActions}>
                    <MainAction name="add-circle-outline" size={22} color="#087208" label="Add Money" />
                    <MainAction name="send" size={20} color="#087208" label="Transfer" />
                    <MainAction
                        name="receipt-long"
                        size={20}
                        color="#087208"
                        label="History"
                        onPress={() => router.push("/(tabs)/transactions")}
                    />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Buy Data</Text>
                            <Text style={styles.sectionSubtitle}>Choose a network provider</Text>
                        </View>
                        <TouchableOpacity style={styles.seeAllButton} activeOpacity={0.8}>
                            <Text style={styles.seeAllText}>See all</Text>
                            <FontAwesome6 name="chevron-right" size={11} color="#087208" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.providerRow}>
                        <EntryDataProvider label="Airtel" provider="airtel" />
                        <EntryDataProvider label="MTN" provider="mtn" />
                        <EntryDataProvider label="Glo" provider="glo" />
                        <EntryDataProvider label="9Mobile" provider="9mobile" />
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Recent Activity</Text>
                            <Text style={styles.sectionSubtitle}>Your latest wallet movements</Text>
                        </View>
                    </View>

                    <View style={styles.activityList}>
                        {recentActivity.map((item) => (
                            <View key={item.title} style={styles.activityItem}>
                                <View style={styles.activityIcon}>
                                    <Feather name={item.icon as any} color="#087208" size={16} />
                                </View>
                                <View style={styles.activityDetails}>
                                    <Text style={styles.activityTitle}>{item.title}</Text>
                                    <Text style={styles.activityTime}>{item.time}</Text>
                                </View>
                                <Text
                                    style={[
                                        styles.activityAmount,
                                        item.amount.startsWith("+") ? styles.credit : styles.debit,
                                    ]}
                                >
                                    {item.amount}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constantStyles.foregroundColor,
    },
    content: {
        paddingHorizontal: 18,
        paddingTop: 8,
        paddingBottom: 26,
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 18,
    },
    profileRow: {
        alignItems: "center",
        flexDirection: "row",
    },
    avatar: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#d8f3d8",
        borderRadius: 18,
        borderWidth: 1,
        height: 36,
        justifyContent: "center",
        marginRight: 12,
        width: 36,
    },
    greeting: {
        color: "#5a7a5a",
        fontSize: 13,
    },
    name: {
        color: "#112311",
        fontSize: 20,
        fontWeight: "700",
    },
    iconButton: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#d8f3d8",
        borderRadius: 18,
        borderWidth: 1,
        height: 36,
        justifyContent: "center",
        width: 36,
    },
    balanceCard: {
        backgroundColor: "#088208",
        borderRadius: 18,
        marginBottom: 16,
        overflow: "hidden",
        padding: 18,
    },
    balanceTopRow: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 18,
    },
    balanceLabelRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: 7,
    },
    balanceCaption: {
        color: "#eaffea",
        fontSize: 13,
        fontWeight: "600",
    },
    visibilityButton: {
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.14)",
        borderRadius: 15,
        height: 30,
        justifyContent: "center",
        width: 30,
    },
    balanceAmount: {
        color: "#ffffff",
        fontSize: 32,
        fontWeight: "800",
        marginBottom: 4,
    },
    balanceSubText: {
        color: "#dfffe2",
        fontSize: 13,
        marginBottom: 18,
    },
    fundButton: {
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "#ffffff",
        borderRadius: 8,
        flexDirection: "row",
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 9,
    },
    fundButtonText: {
        color: "#087208",
        fontSize: 13,
        fontWeight: "700",
    },
    quickActions: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#e1f3e1",
        borderRadius: 14,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 16,
        paddingVertical: 10,
    },
    section: {
        backgroundColor: "#ffffff",
        borderColor: "#e1f3e1",
        borderRadius: 14,
        borderWidth: 1,
        marginBottom: 16,
        padding: 14,
    },
    sectionHeader: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 14,
    },
    sectionTitle: {
        color: "#112311",
        fontSize: 16,
        fontWeight: "700",
    },
    sectionSubtitle: {
        color: "#6b846b",
        fontSize: 12,
        marginTop: 2,
    },
    seeAllButton: {
        alignItems: "center",
        flexDirection: "row",
        gap: 6,
    },
    seeAllText: {
        color: "#087208",
        fontSize: 13,
        fontWeight: "700",
    },
    providerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    activityList: {
        gap: 12,
    },
    activityItem: {
        alignItems: "center",
        flexDirection: "row",
    },
    activityIcon: {
        alignItems: "center",
        backgroundColor: "#ecffec",
        borderRadius: 18,
        height: 36,
        justifyContent: "center",
        marginRight: 10,
        width: 36,
    },
    activityDetails: {
        flex: 1,
    },
    activityTitle: {
        color: "#112311",
        fontSize: 14,
        fontWeight: "700",
    },
    activityTime: {
        color: "#6b846b",
        fontSize: 12,
        marginTop: 2,
    },
    activityAmount: {
        fontSize: 13,
        fontWeight: "800",
    },
    credit: {
        color: "#087208",
    },
    debit: {
        color: "#b3261e",
    },
});

export default Index;
