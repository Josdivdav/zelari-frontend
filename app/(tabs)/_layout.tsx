import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/constant/colors";


export default function TabLayout() {
    const theme = useAppTheme();

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: theme.brandText,
            tabBarInactiveTintColor: theme.textSoft,
            tabBarStyle: {
                backgroundColor: theme.surface,
                borderTopColor: theme.borderSoft,
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
                height: 60,
            },
            tabBarLabelStyle: {
                fontSize: 12
            },
            animation: "shift"
        }}>
            <Tabs.Screen 
                name="index" 
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={ focused ? "home" : "home-outline" } size={20} color={color} />
                    )
                }}/>
            <Tabs.Screen 
                name="transactions" 
                options={{
                    title: "History",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={ focused ? "receipt" : "receipt-outline"} size={20} color={color} />
                    )
                }}/>
        </Tabs>
    )
}
