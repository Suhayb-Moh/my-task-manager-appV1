import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTasks } from "../../../hooks/useTasks";

const TasksScreen = () => {
  const { tasks, loading, error } = useTasks();

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       // Get the stored token from SecureStore
  //       const token = await SecureStore.getItemAsync("access_token");

  //       if (!token) {
  //         setError("No authentication token found");
  //         setLoading(false);
  //         return;
  //       }

  //       // Fetch tasks from the API
  //       const response = await axios.get("http://localhost:3000/tasks", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       // Log the API response structure
  //       console.log("API Response:", response.data);

  //       // Extract tasks from the response
  //       const fetchedTasks = response.data.tasks; // Adjusted to match your API structure

  //       // Log the fetched tasks for confirmation
  //       console.log("Fetched Tasks:", fetchedTasks);

  //       // Check if the fetched tasks are an array
  //       if (Array.isArray(fetchedTasks)) {
  //         setTasks(fetchedTasks);
  //       } else {
  //         setError("Tasks data is not in the expected format");
  //       }
  //       setLoading(false);
  //     } catch (error: any) {
  //       console.error("Error fetching tasks:", error);
  //       if (error.response && error.response.status === 401) {
  //         setError("Unauthorized. Please log in again.");
  //       } else {
  //         setError("Failed to load tasks.");
  //       }
  //       setLoading(false);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  // Render loading or error states
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1F41BB" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tasks.map((task) => (
        <View key={task._id} style={styles.taskCard}>
          <Text style={styles.taskTitle}>{task.name}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
          <Text style={styles.taskDueDate}>
            Due: {new Date(task.due_date).toLocaleDateString()}
          </Text>
          <Text style={styles.taskPriority}>Priority: {task.priority}</Text>
          <Text style={styles.taskStatus}>
            Status: {task.completed ? "Completed" : "Pending"}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 16,
    paddingBottom: 50,
  },
  taskCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F41BB",
  },
  taskDescription: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
  },
  taskDueDate: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  taskPriority: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  taskStatus: {
    fontSize: 12,
    color: "#FF0000",
    marginTop: 4,
  },
});

export default TasksScreen;
