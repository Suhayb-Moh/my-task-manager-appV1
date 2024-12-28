import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTasks } from "../../../hooks/useTasks";
import { fetchLists } from "../../../api/listsService";
import { fetchCategories } from "../../../api/categoriesService";

import DropDownPicker from "react-native-dropdown-picker";

const NewTaskScreen = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { createTask } = useTasks(); // Use the hook for creating tasks
  const router = useRouter();

  // Task state
  const [taskData, setTaskData] = useState<{
    _id?: string; // Optional
    name: string;
    description: string;
    due_date: string;
    priority: number;
    list_id: string;
    category_id: string;
    completed: boolean;
  }>({
    name: "",
    description: "",
    due_date: new Date().toISOString(), // Default to current date
    priority: 1,
    list_id: "", // Replace with actual list_id
    category_id: "", // Replace with actual list_id
    completed: false,
  });

  const [lists, setLists] = useState<{ label: string; value: string }[]>([]);
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [listDropDownOpen, setListDropDownOpen] = useState(false);
  const [categoryDropDownOpen, setCategoryDropDownOpen] = useState(false);

  useEffect(() => {
    const loadDropdownData = async () => {
      try {
        const fetchedLists = await fetchLists();
        const fetchedCategories = await fetchCategories();
        if (fetchedLists) {
          setLists(
            fetchedLists.map((list) => ({
              label: list.name,
              value: list._id,
            }))
          );
        }
        if (fetchedCategories) {
          setCategories(
            fetchedCategories.map((category) => ({
              label: category.name,
              value: category._id,
            }))
          );
        }
      } catch (error) {
        console.error("Error loading dropdown data:", error);
      }
    };

    loadDropdownData();
  }, []);

  const handleInputChange = (
    key: keyof typeof taskData,
    value: string | boolean | number
  ) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      const isoDate = selectedDate.toISOString();
      handleInputChange("due_date", isoDate);
    }
  };

  const handleCreateTask = async () => {
    const { _id, ...payload } = taskData;

    // Validation
    const { name, description, due_date, list_id, category_id } = payload;
    if (!name || !description || !due_date || !category_id || !list_id) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    console.log("Task Data Being Sent: ", taskData);

    try {
      await createTask(payload); // Call createTask from useTasks
      Alert.alert("Success", "Task created successfully!");
      router.replace("/(tabs)/tasks"); // Navigate to tasks page after success
    } catch (error: any) {
      console.log(
        "Failed to create task: ",
        error.response?.data || error.message
      );
      Alert.alert(
        "Error",
        `Failed to create task. ${
          error.response?.data?.message || "Please try again."
        }`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Task</Text>

      {/* Task Name */}
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

      {/* List Dropdown */}
      <Text style={styles.label}>Select List:</Text>
      <DropDownPicker
        open={listDropDownOpen}
        value={taskData.list_id}
        items={lists}
        setOpen={setListDropDownOpen}
        setValue={(callback) => {
          const value =
            typeof callback === "function"
              ? callback(taskData.list_id)
              : callback;
          handleInputChange("list_id", value);
        }}
        setItems={setLists}
        placeholder="Select List"
        zIndex={3000}
        zIndexInverse={1000}
      />

      {/* Category Dropdown */}
      <Text style={styles.label}>Select Category:</Text>
      <DropDownPicker
        open={categoryDropDownOpen}
        value={taskData.category_id}
        items={categories}
        setOpen={setCategoryDropDownOpen}
        setValue={(callback) => {
          const value =
            typeof callback === "function"
              ? callback(taskData.category_id)
              : callback;
          handleInputChange("category_id", value);
        }}
        setItems={setCategories}
        placeholder="Select a Category"
        zIndex={2000} // Ensure dropdowns don't overlap
        zIndexInverse={2000}
      />

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

      {/* Create Task Button */}
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
  dateButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
  },
  dateText: { fontSize: 16 },
  label: { marginTop: 12, fontWeight: "bold", fontSize: 16 },
  picker: { backgroundColor: "#fff", marginVertical: 8 },
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
  checkboxIndicator: { width: 12, height: 12 },
  checkboxSelected: { backgroundColor: "#1F41BB" },
  button: {
    backgroundColor: "#1F41BB",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
