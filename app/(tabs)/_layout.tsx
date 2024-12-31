import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/theme-context";

export default function Layout() {
  const { theme } = useTheme();
  const router = useRouter();

  const handleAddTaskPress = () => {
    // Navigate to CreateTask screen
    router.push("/tasks/CreateTask");
  };

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.headerColor,
        },
        headerTintColor: theme.textColor,
        tabBarStyle: {
          backgroundColor: theme.tabBarColor,
          borderTopWidth: 1,
          borderTopColor: theme.inputBorderColor,
        },
        tabBarActiveTintColor: theme.tabActiveColor,
        tabBarInactiveTintColor: theme.tabInactiveColor,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600", // Semi-bold for visibility
          marginBottom: 5, // Consistent padding
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="tasks"
        options={{
          headerTitle: "",
          headerRight: () => {
            return (
              <Ionicons
                name="add-circle"
                size={30}
                color={theme.tabActiveColor}
                style={{ paddingRight: 16 }}
                onPress={handleAddTaskPress}
              />
            );
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          headerShown: false,
          title: "Categories",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lists"
        options={{
          headerShown: false,
          title: "Lists",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
