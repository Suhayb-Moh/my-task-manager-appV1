import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen() {
  const router = useRouter();
  const [focus, setFocus] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const customStyle = focus ? styles.textInputFocus : styles.input;

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials");
      }

      const { access_token } = await response.json();

      // Save the token securely
      await SecureStore.setItemAsync("access_token", access_token);

      // Navigate to the main app
      router.push("/(tabs)/tasks");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong!";
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login here</Text>
      <Text style={styles.subTitle}>
        Welcome back you've {"\n"} been missed!
      </Text>
      <TextInput
        style={[
          styles.input,
          focus === "input1" ? styles.textInputFocus : null,
        ]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onFocus={() => setFocus("input1")}
        onBlur={() => setFocus(null)}
        onChangeText={setEmail}
      />
      <TextInput
        style={[
          styles.input,
          focus === "input2" ? styles.textInputFocus : null,
        ]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onFocus={() => setFocus("input2")}
        onBlur={() => setFocus(null)}
        onChangeText={setPassword}
      />
      <Pressable style={styles.forgetPasswordButton}>
        <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
      </Pressable>
      <Pressable
        style={styles.logginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.logginText}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Text>
      </Pressable>
      <Text
        style={styles.registerLink}
        onPress={() => router.push("/auth/register")}
      >
        Create new account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: "PoppinsBold",
    color: "#1F41BB",
    textAlign: "center",
    marginBottom: 50,
  },
  subTitle: {
    fontSize: 20,
    color: "#494949",
    textAlign: "center",
    marginBottom: 35,
    fontFamily: "PoppinsSemiBold",
  },
  input: {
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#F1F4FF",
    fontFamily: "PoppinsMedium",
    borderRadius: 8,
    color: "#626262",
  },
  textInputFocus: {
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#F1F4FF",
    fontFamily: "PoppinsMedium",
    borderRadius: 8,
    color: "#626262",
    borderColor: "#1F41BB",
    borderWidth: 1,
  },
  registerLink: {
    marginTop: 35,
    color: "#494949",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
  },
  forgetPasswordButton: {
    marginTop: 10,
  },
  forgetPasswordText: {
    color: "#1F41BB",
    textAlign: "right",
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
  },
  logginButton: {
    backgroundColor: "#1F41BB",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  logginText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
  },
});
