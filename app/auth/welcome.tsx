import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const welcome = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Image Illustration */}
      <Image
        source={require("../../assets/Work from home.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Add title and Subtitle */}
      <Text style={styles.title}>Discover Your {"\n"} Dream Job Here</Text>
      <Text style={styles.subtitle}>
        Explor all the existing job roles based on your {"\n"}interest and study
        major
      </Text>

      {/* Add title and Subtitle */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.loginButton]}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.registerButton]}
          onPress={() => router.push("/auth/register")}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9faff",
    paddingHorizontal: 20,
  },
  image: {
    width: "80%",
    height: "40%",
    marginBottom: 30,
  },
  title: {
    fontSize: 35,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 10,
    textAlign: "center",
    color: "#1F41BB",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
    color: "#000",
    marginBottom: 50,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 40,
    marginTop: 100,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  loginButton: {
    backgroundColor: "#1F41BB",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  registerButton: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "#FFF",
    fontFamily: "PoppinsSemiBold",
    fontSize: 20,
  },
  registerButtonText: {
    color: "#000",
    fontFamily: "PoppinsSemiBold",
    fontSize: 20,
  },
});
