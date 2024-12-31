import { Stack, Tabs } from "expo-router";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useUIStore } from "../../../store/uiStore";

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();
  const { isCreateTaskVisible, setCreateTaskVisible } = useUIStore();

  useEffect(() => {
    // whenever the pathname changes, check if the current route is createtask
    setCreateTaskVisible(pathname === "/tasks/CreateTask");
  }, [pathname, setCreateTaskVisible]);

  const handleAddTaskPress = () => {
    // Check if the current route is not CreateTask before navigating
    if (!isCreateTaskVisible) {
      presentation: "";
      router.push("/tasks/CreateTask");
    }
  };
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerRight: () =>
          !isCreateTaskVisible ? (
            <Ionicons
              name="add-circle"
              size={34}
              color="black"
              onPress={handleAddTaskPress}
            />
          ) : null,
      }}
    />
  );
}
