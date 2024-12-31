import { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "../styles/theme";

export const useTheme = () => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(
    systemTheme === "dark" ? darkTheme : lightTheme
  );
  const [userPreference, setUserPreference] = useState<string | null>(null);

  useEffect(() => {
    const loadTheme = async () => {
      const storedPreference = await AsyncStorage.getItem("themePreference");
      if (storedPreference) {
        setUserPreference(storedPreference);
        setTheme(storedPreference === "dark" ? darkTheme : lightTheme);
      } else {
        setTheme(systemTheme === "dark" ? darkTheme : lightTheme);
      }
    };
    loadTheme();
  }, [systemTheme]);

  const toggleTheme = async () => {
    const newTheme = theme === darkTheme ? "light" : "dark";
    setTheme(newTheme === "dark" ? darkTheme : lightTheme);
    setUserPreference(newTheme);
    await AsyncStorage.setItem("themePreference", newTheme);
  };

  return { theme, toggleTheme };
};
