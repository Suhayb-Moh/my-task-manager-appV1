import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export async function logout() {
  try {
    await SecureStore.deleteItemAsync("access_token");
    router.push("/auth/login");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
