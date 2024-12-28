// screens/tasks/TasksScreen.tsx
import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import TaskItem, { Task } from "../../../components/TaskItem";
import { useTasks } from "../../../hooks/useTasks";

const TasksScreen = () => {
  const { tasks, loading, error, reloadTasks, deleteTask } = useTasks();

  useEffect(() => {
    // Load tasks when component mounts
    reloadTasks();
  }, []);

  const handleTaskDeletion = async (taskId: string) => {
    try {
      await deleteTask(taskId); // call the deleteTask function from the hook
      reloadTasks(); // reload tasks to reflect the deletion
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  if (loading) return <Text>Loading Tasks...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tasks</Text>

      {tasks.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks available.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item: Task) => item._id || ""}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onDelete={() => item._id && handleTaskDeletion(item._id)}
            />
          )}
        />
      )}
    </View>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9faff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1F41BB",
  },
  noTasksText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});
