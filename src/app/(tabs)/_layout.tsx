
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#38BDF8",
                tabBarInactiveTintColor: "#888888",
                tabBarStyle: {
                    backgroundColor: "#101820",
                    borderTopColor: "#333333",
                    height: 57 + insets.bottom,
                    paddingBottom: insets.bottom + 5,
                    paddingTop: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="flashcards"
                options={{
                    title: "Flashcards",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="layers-outline" size={size} color={color} />
                    ),
                }}
            />


            <Tabs.Screen
                name="lessons"
                options={{
                    title: "Lessons",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book-outline" size={size} color={color} />
                    ),
                }}
            />


        </Tabs>
    );
}
