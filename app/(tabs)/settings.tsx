import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  Switch,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/theme-context";

const SettingsScreen = () => {
  const { logout } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/auth/login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleProfileEdit = () => {
    router.push("/auth/EditProfile");
  };

  const handlePrivacySettings = () => {
    router.push("/settings/Privacy");
  };

  const handleNotifications = () => {
    router.push("/settings/Notifications");
  };

  const handleAbout = () => {
    Alert.alert(
      "About the App",
      "Version: 1.0.0\nDeveloped by: Your Name/Team\nContact: your@email.com",
      [{ text: "OK", style: "default" }]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Text style={[styles.header, { color: theme.textColor }]}>
          Settings
        </Text>

        <View style={styles.menu}>
          <Pressable
            style={[
              styles.menuItem,
              {
                backgroundColor: theme.buttonColor,
                borderColor: theme.inputBorderColor,
              },
            ]}
            onPress={handleProfileEdit}
          >
            <Text
              style={[styles.menuItemText, { color: theme.buttonTextColor }]}
            >
              Edit Profile
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.menuItem,
              {
                backgroundColor: theme.buttonColor,
                borderColor: theme.inputBorderColor,
              },
            ]}
            onPress={handlePrivacySettings}
          >
            <Text
              style={[styles.menuItemText, { color: theme.buttonTextColor }]}
            >
              Privacy Settings
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.menuItem,
              {
                backgroundColor: theme.buttonColor,
                borderColor: theme.inputBorderColor,
              },
            ]}
            onPress={handleNotifications}
          >
            <Text
              style={[styles.menuItemText, { color: theme.buttonTextColor }]}
            >
              Notification Preferences
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.menuItem,
              {
                backgroundColor: theme.buttonColor,
                borderColor: theme.inputBorderColor,
              },
            ]}
            onPress={handleAbout}
          >
            <Text
              style={[styles.menuItemText, { color: theme.buttonTextColor }]}
            >
              About the App
            </Text>
          </Pressable>
        </View>

        {/* theme select toggle button */}
        <View style={styles.themeToggle}>
          <Text style={[styles.themeToggleText, { color: theme.textColor }]}>
            Dark Mode
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{
              false: theme.textColor,
              true: theme.textColor,
            }}
            thumbColor={theme.buttonColor}
          />
        </View>

        <Pressable
          style={[
            styles.logoutButton,
            { backgroundColor: theme.inputBorderColor },
          ]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutText, { color: theme.textColor }]}>
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 16,
  },
  menu: {
    marginTop: 24,
    marginBottom: 32,
  },
  menuItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
  },
  menuItemText: {
    fontSize: 16,
  },
  themeToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  themeToggleText: {
    fontSize: 16,
  },
  logoutButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
