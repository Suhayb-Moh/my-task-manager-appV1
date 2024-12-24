import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = () => {
    // Implement registration logic here
    console.log("Registering with:", { name, email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subTitle}>
        Welcome back you've {"\n"} been missed!
      </Text>

      <TextInput
        style={[
          styles.input,
          focus === "input1" ? styles.textInputFocus : null,
        ]}
        placeholder="Username"
        keyboardType="default"
        autoCapitalize="none"
        value={name}
        onFocus={() => setFocus("input1")}
        onBlur={() => setFocus(null)}
        onChangeText={setName}
      />

      <TextInput
        style={[
          styles.input,
          focus === "input2" ? styles.textInputFocus : null,
        ]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onFocus={() => setFocus("input2")}
        onBlur={() => setFocus(null)}
        onChangeText={setEmail}
      />

      <TextInput
        style={[
          styles.input,
          focus === "input3" ? styles.textInputFocus : null,
        ]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onFocus={() => setFocus("input3")}
        onBlur={() => setFocus(null)}
        onChangeText={setPassword}
      />
      <Pressable
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.registerText}>
          {isLoading ? "Registering..." : "Register"}
        </Text>
      </Pressable>

      <Text
        style={styles.registerLink}
        onPress={() => router.push("/auth/login")}
      >
        Already have an account?
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
    marginBottom: 20,
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
  registerButton: {
    backgroundColor: "#1F41BB",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  registerText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
  },
  registerLink: {
    marginTop: 35,
    color: "#494949",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
  },
});
