import React from "react";
import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../hooks/theme-context";

// Define the props to match the full task object structure from the API
export interface Task {
  _id?: string;
  name: string;
  description: string;
  due_date: string;
  priority: number;
  list_id: string;
  category_id: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  const router = useRouter();
  const { theme } = useTheme();

  const handleEditPress = () => {
    router.push({
      pathname: "/tasks/EditTasks",
      params: { task: JSON.stringify(task) },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.inputBackgroundColor,
            borderColor: theme.inputBorderColor,
          },
        ]}
      >
        <View style={styles.infoSection}>
          <Text style={[styles.name, { color: theme.textColor }]}>
            {task.name}
          </Text>
          <Text
            style={[styles.description, { color: theme.textColor }]}
            numberOfLines={2}
          >
            {task.description}
          </Text>
          <Text style={[styles.meta, { color: theme.textColor }]}>
            Due: {new Date(task.due_date).toLocaleDateString()}
          </Text>
          <Text style={[styles.priority, { color: theme.textColor }]}>
            Priority: {task.priority}
          </Text>
          <Text
            style={[
              styles.status,
              task.completed ? styles.completed : styles.pending,
              { color: "#000" },
            ]}
          >
            {task.completed ? "Completed" : "Pending"}
          </Text>
        </View>

        <View style={styles.actionSection}>
          <Pressable
            style={[styles.editButton, { backgroundColor: theme.buttonColor }]}
            onPress={handleEditPress}
          >
            <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>
              Edit
            </Text>
          </Pressable>
          <Pressable
            style={[styles.deleteButton, { backgroundColor: "#f8d7da" }]}
            onPress={onDelete}
          >
            <Text style={[styles.buttonText, { color: "#000" }]}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  meta: {
    fontSize: 12,
    color: "#888",
  },
  priority: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  status: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    textAlign: "center",
    alignSelf: "flex-start",
  },
  completed: {
    backgroundColor: "#d1e7dd",
  },
  pending: {
    backgroundColor: "#f8d7da",
  },
  actionSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
});
