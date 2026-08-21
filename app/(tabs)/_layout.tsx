import { Tabs } from "expo-router";
import { FontAwesome6, Fontisto, Ionicons } from "@expo/vector-icons";
import constantStyles from "@/constant/colors";


export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#097009ff",
            tabBarStyle: {
                backgroundColor: constantStyles.statusBarcolor,
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
                height: 60,
            },
            tabBarLabelStyle: {
                color: "#0f7201ff",
                fontSize: 12
            },
            animation: "shift"
        }}>
            <Tabs.Screen 
                name="index" 
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={ focused ? "home" : "home-outline" } size={20} color={ focused ? color : "#0f7201ff" } />
                    )
                }}/>
            <Tabs.Screen 
                name="transactions" 
                options={{
                    title: "Transactions",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={ focused ? "receipt" : "receipt-outline"} size={20} color={ focused ? color : "#0f7201ff" } />
                    )
                }}/>
        </Tabs>
    )
}