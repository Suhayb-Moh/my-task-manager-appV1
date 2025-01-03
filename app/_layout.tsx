import React from "react";
import { router, Slot, Stack, useNavigationContainerRef } from "expo-router";
import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useFonts } from "expo-font";
import { ThemeProvider, useTheme } from "../hooks/theme-context";
import { darkTheme } from "../styles/theme";

export default function RootLayoutNav() {
  const [isNavigationReady, setNavigationReady] = useState(false);
  const rootNavigationRef = useNavigationContainerRef();
  const { isAuthenticated, isAuthLoaded } = useAuth();

  // Load fonts

  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
    PoppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  // Only set navigation ready when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      setNavigationReady(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const unsubscribe = rootNavigationRef?.addListener("state", () => {
      setNavigationReady(true);
    });

    return () => {
      unsubscribe?.();
    };
  }, [rootNavigationRef]);

  useEffect(() => {
    if (isNavigationReady && isAuthLoaded) {
      if (isAuthenticated) {
        router.push("/(tabs)/tasks");
      } else {
        router.push("/auth/welcome");
      }
    }
  }, [isNavigationReady, isAuthLoaded, isAuthenticated]);

  return (
    <>
      <ThemeProvider>
        <AppWithTheme />
      </ThemeProvider>
    </>
  );
}

const AppWithTheme = () => {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={theme === darkTheme ? "light-content" : "dark-content"}
        backgroundColor={theme.backgroundColor}
      />
      <Slot />
    </>
  );
};
