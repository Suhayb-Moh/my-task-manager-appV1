import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useTasks } from "../../../hooks/useTasks"; // Make sure to use the hook properly

const NewTaskScreen = () => {
  const { createTask } = useTasks(); // Use the hook inside the functional component
  const router = useRouter();

  // Task state
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    due_date: "",
    priority: 1,
    list_id: "1", // Hardcoded list_id for now
    completed: false,
  });

  const handleInputChange = (
    key: keyof typeof taskData,
    value: string | boolean | number
  ) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateTask = async () => {
    const { name, description, due_date } = taskData;

    // Validation
    if (!name || !description || !due_date) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    try {
      await createTask(taskData); // Call createTask from useTasks
      Alert.alert("Success", "Task created successfully!");
      router.replace("/tasks"); // Navigate to tasks page after success
    } catch (error) {
      Alert.alert("Error", "Failed to create task. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={taskData.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Task Description"
        value={taskData.description}
        onChangeText={(text) => handleInputChange("description", text)}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Due Date (YYYY-MM-DD)"
        value={taskData.due_date}
        onChangeText={(text) => handleInputChange("due_date", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Priority (1-5)"
        value={taskData.priority.toString()}
        onChangeText={(text) => handleInputChange("priority", Number(text))}
        keyboardType="numeric"
      />

      <View style={styles.checkboxContainer}>
        <Text>Completed:</Text>
        <Pressable
          style={styles.checkbox}
          onPress={() => handleInputChange("completed", !taskData.completed)}
        >
          <View
            style={[
              styles.checkboxIndicator,
              taskData.completed && styles.checkboxSelected,
            ]}
          />
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleCreateTask}>
        <Text style={styles.buttonText}>Create Task</Text>
      </Pressable>
    </View>
  );
};

export default NewTaskScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9faff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1F41BB",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  textArea: { height: 100, textAlignVertical: "top" },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxIndicator: {
    width: 12,
    height: 12,
  },
  checkboxSelected: {
    backgroundColor: "#1F41BB",
  },
  button: {
    backgroundColor: "#1F41BB",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
