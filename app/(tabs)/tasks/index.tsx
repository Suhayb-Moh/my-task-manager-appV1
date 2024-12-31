// screens/tasks/TasksScreen.tsx
import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import TaskItem, { Task } from "../../../components/TaskItem";
import { useTasks } from "../../../hooks/useTasks";
import { useTheme } from "../../../hooks/theme-context";

const TasksScreen = () => {
  const { tasks, loading, error, reloadTasks, deleteTask } = useTasks();
  const { theme } = useTheme();

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

  if (loading)
    return (
      <Text style={[styles.loadingText, { color: theme.textColor }]}>
        Loading Tasks...
      </Text>
    );
  if (error)
    return (
      <Text style={[styles.errorText, { color: theme.textColor }]}>
        Error: {error}
      </Text>
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Text style={[styles.title, { color: theme.textColor }]}>
          Your Tasks
        </Text>

        {tasks.length === 0 ? (
          <Text style={[styles.noTasksText, { color: theme.textColor }]}>
            No tasks available.
          </Text>
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
    </SafeAreaView>
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
  errorText: {
    fontSize: 16,
    color: "#f5222d",
    textAlign: "center",
    marginTop: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#494949",
    textAlign: "center",
    marginTop: 20,
  },
});
