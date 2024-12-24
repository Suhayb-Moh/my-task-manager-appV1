import { Stack, Tabs } from "expo-router";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Tasks",
        headerRight: () => (
          <Ionicons
            name="add-circle"
            size={34}
            color="black"
            onPress={() => {
              router.push("/(tabs)/tasks/CreateTask");
            }}
          />
        ),
      }}
    />
  );
}
