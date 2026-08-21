import constantStyles from "@/constant/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
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

const filters = ["All", "Credits", "Debits"];

const transactions = [
    {
        id: "txn-1",
        type: "credit",
        title: "Wallet top up",
        description: "Bank transfer",
        date: "Today, 9:41 AM",
        amount: 24000,
        icon: "arrow-down-left",
        status: "Successful",
    },
    {
        id: "txn-2",
        type: "debit",
        title: "MTN data bundle",
        description: "2GB monthly plan",
        date: "Yesterday, 4:12 PM",
        amount: 2500,
        icon: "smartphone",
        status: "Successful",
    },
    {
        id: "txn-3",
        type: "debit",
        title: "Transfer to Ada",
        description: "Wallet transfer",
        date: "Aug 14, 2:08 PM",
        amount: 15000,
        icon: "send",
        status: "Successful",
    },
    {
        id: "txn-4",
        type: "credit",
        title: "Refund",
        description: "Reversed data purchase",
        date: "Aug 12, 11:30 AM",
        amount: 1200,
        icon: "rotate-ccw",
        status: "Completed",
    },
];

function Transactions() {
    const [activeFilter, setActiveFilter] = useState<string>("All");

    const currency = useMemo(
        () =>
            new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                maximumFractionDigits: 2,
            }),
        []
    );

    const filteredTransactions = transactions.filter((transaction) => {
        if (activeFilter === "Credits") {
            return transaction.type === "credit";
        }

        if (activeFilter === "Debits") {
            return transaction.type === "debit";
        }

        return true;
    });

    const totalCredits = transactions
        .filter((transaction) => transaction.type === "credit")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalDebits = transactions
        .filter((transaction) => transaction.type === "debit")
        .reduce((total, transaction) => total + transaction.amount, 0);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={constantStyles.statusBarcolor} barStyle="dark-content" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.header}>
                    <View>
                        <Text style={styles.eyebrow}>Wallet activity</Text>
                        <Text style={styles.title}>Transactions</Text>
                    </View>

                    <TouchableOpacity activeOpacity={0.8} style={styles.headerButton}>
                        <Feather name="download" color="#087208" size={18} />
                    </TouchableOpacity>
                </View>

                <View style={styles.summaryCard}>
                    <View style={styles.summaryTopRow}>
                        <View>
                            <Text style={styles.summaryLabel}>This month</Text>
                            <Text style={styles.summaryAmount}>
                                {currency.format(totalCredits - totalDebits)}
                            </Text>
                        </View>

                        <View style={styles.summaryBadge}>
                            <Ionicons name="checkmark-circle" color="#087208" size={15} />
                            <Text style={styles.summaryBadgeText}>Updated</Text>
                        </View>
                    </View>

                    <View style={styles.summaryGrid}>
                        <View style={styles.summaryMetric}>
                            <Text style={styles.metricLabel}>Money in</Text>
                            <Text style={styles.creditText}>{currency.format(totalCredits)}</Text>
                        </View>
                        <View style={styles.summaryMetric}>
                            <Text style={styles.metricLabel}>Money out</Text>
                            <Text style={styles.debitText}>{currency.format(totalDebits)}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.filterRow}>
                    {filters.map((filter) => {
                        const isActive = activeFilter === filter;

                        return (
                            <TouchableOpacity
                                key={filter}
                                activeOpacity={0.8}
                                style={[styles.filterChip, isActive && styles.filterChipActive]}
                                onPress={() => setActiveFilter(filter)}
                            >
                                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                                    {filter}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Recent history</Text>
                            <Text style={styles.sectionSubtitle}>
                                {filteredTransactions.length} transactions found
                            </Text>
                        </View>
                    </View>

                    <View style={styles.transactionList}>
                        {filteredTransactions.map((transaction) => {
                            const isCredit = transaction.type === "credit";
                            const amountPrefix = isCredit ? "+" : "-";

                            return (
                                <TouchableOpacity
                                    key={transaction.id}
                                    activeOpacity={0.82}
                                    style={styles.transactionItem}
                                >
                                    <View
                                        style={[
                                            styles.transactionIcon,
                                            isCredit ? styles.creditIcon : styles.debitIcon,
                                        ]}
                                    >
                                        <Feather
                                            name={transaction.icon as any}
                                            color={isCredit ? "#087208" : "#b3261e"}
                                            size={16}
                                        />
                                    </View>

                                    <View style={styles.transactionDetails}>
                                        <Text style={styles.transactionTitle}>{transaction.title}</Text>
                                        <Text style={styles.transactionDescription}>
                                            {transaction.description}
                                        </Text>
                                        <Text style={styles.transactionDate}>{transaction.date}</Text>
                                    </View>

                                    <View style={styles.amountBlock}>
                                        <Text
                                            style={[
                                                styles.transactionAmount,
                                                isCredit ? styles.creditText : styles.debitText,
                                            ]}
                                        >
                                            {amountPrefix}
                                            {currency.format(transaction.amount)}
                                        </Text>
                                        <Text style={styles.statusText}>{transaction.status}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
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
    eyebrow: {
        color: "#5a7a5a",
        fontSize: 13,
        fontWeight: "600",
    },
    title: {
        color: "#112311",
        fontSize: 28,
        fontWeight: "800",
        marginTop: 2,
    },
    headerButton: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#d8f3d8",
        borderRadius: 18,
        borderWidth: 1,
        height: 36,
        justifyContent: "center",
        width: 36,
    },
    summaryCard: {
        backgroundColor: "#087208",
        borderRadius: 18,
        marginBottom: 16,
        padding: 18,
    },
    summaryTopRow: {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 18,
    },
    summaryLabel: {
        color: "#dfffe2",
        fontSize: 13,
        fontWeight: "600",
    },
    summaryAmount: {
        color: "#ffffff",
        fontSize: 30,
        fontWeight: "800",
        marginTop: 6,
    },
    summaryBadge: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 15,
        flexDirection: "row",
        gap: 5,
        paddingHorizontal: 9,
        paddingVertical: 6,
    },
    summaryBadgeText: {
        color: "#087208",
        fontSize: 12,
        fontWeight: "800",
    },
    summaryGrid: {
        flexDirection: "row",
        gap: 10,
    },
    summaryMetric: {
        backgroundColor: "rgba(255,255,255,0.13)",
        borderRadius: 14,
        flex: 1,
        padding: 12,
    },
    metricLabel: {
        color: "#dfffe2",
        fontSize: 12,
        marginBottom: 5,
    },
    creditText: {
        color: "#087208",
        fontWeight: "800",
    },
    debitText: {
        color: "#b3261e",
        fontWeight: "800",
    },
    filterRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 16,
    },
    filterChip: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#d8f3d8",
        borderRadius: 18,
        borderWidth: 1,
        flex: 1,
        paddingVertical: 10,
    },
    filterChipActive: {
        backgroundColor: "#087208",
        borderColor: "#087208",
    },
    filterText: {
        color: "#087208",
        fontSize: 13,
        fontWeight: "800",
    },
    filterTextActive: {
        color: "#ffffff",
    },
    section: {
        backgroundColor: "#ffffff",
        borderColor: "#e1f3e1",
        borderRadius: 14,
        borderWidth: 1,
        padding: 14,
    },
    sectionHeader: {
        marginBottom: 14,
    },
    sectionTitle: {
        color: "#112311",
        fontSize: 16,
        fontWeight: "800",
    },
    sectionSubtitle: {
        color: "#6b846b",
        fontSize: 12,
        marginTop: 2,
    },
    transactionList: {
        gap: 13,
    },
    transactionItem: {
        alignItems: "center",
        flexDirection: "row",
    },
    transactionIcon: {
        alignItems: "center",
        borderRadius: 18,
        height: 36,
        justifyContent: "center",
        marginRight: 10,
        width: 36,
    },
    creditIcon: {
        backgroundColor: "#ecffec",
    },
    debitIcon: {
        backgroundColor: "#fff0ee",
    },
    transactionDetails: {
        flex: 1,
        paddingRight: 10,
    },
    transactionTitle: {
        color: "#112311",
        fontSize: 14,
        fontWeight: "800",
    },
    transactionDescription: {
        color: "#6b846b",
        fontSize: 12,
        marginTop: 2,
    },
    transactionDate: {
        color: "#8ba08b",
        fontSize: 11,
        marginTop: 3,
    },
    amountBlock: {
        alignItems: "flex-end",
    },
    transactionAmount: {
        fontSize: 13,
    },
    statusText: {
        color: "#7f957f",
        fontSize: 11,
        marginTop: 4,
    },
});

export default Transactions;
