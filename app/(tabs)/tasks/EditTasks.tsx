// screens/tasks/EditTaskScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useTasks } from "../../../hooks/useTasks";
import { useSearchParams } from "expo-router/build/hooks";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditTaskScreen = () => {
  const searchParams = useSearchParams();
  const task = searchParams.get("task");
  const parsedTask = task ? JSON.parse(task) : null;
  const { updateTask } = useTasks();
  const router = useRouter();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskData, setTaskData] = useState(parsedTask);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      const isoDate = selectedDate.toISOString();
      handleInputChange("due_date", isoDate);
    }
  };

  const handleInputChange = (key: keyof typeof taskData, value: any) => {
    setTaskData((prev: typeof taskData) => ({ ...prev, [key]: value }));
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(taskData._id, taskData); // Implement this function in `useTasks`
      Alert.alert("Success", "Task updated successfully!");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update task.");
    }
  };

  if (!parsedTask) {
    return <Text>Invalid Task</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={taskData.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />

      {/* Task Description */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Task Description"
        value={taskData.description}
        onChangeText={(text) => handleInputChange("description", text)}
        multiline
      />

      {/* Due Date */}
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          {new Date(taskData.due_date).toDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={new Date(taskData.due_date)}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Priority */}
      <TextInput
        style={styles.input}
        placeholder="Priority (1-5)"
        value={taskData.priority.toString()}
        onChangeText={(text) => handleInputChange("priority", Number(text))}
        keyboardType="numeric"
      />

      {/* Completed */}
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
      {/* Add inputs for other fields like priority, due_date, etc. */}
      <Pressable style={styles.button} onPress={handleUpdateTask}>
        <Text style={styles.buttonText}>Update Task</Text>
      </Pressable>
    </View>
  );
};

export default EditTaskScreen;

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
  dateButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
  },
  dateText: { fontSize: 16 },
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
