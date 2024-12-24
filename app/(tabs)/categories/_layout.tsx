import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Categories",
      }}
    />
  );
};

export default _layout;