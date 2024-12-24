import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

const settings = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
