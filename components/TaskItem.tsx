import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTasks } from "../hooks/useTasks";

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

  const handleEditPress = () => {
    router.push({
      pathname: "/tasks/EditTasks",
      params: { task: JSON.stringify(task) },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <Text style={styles.name}>{task.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {task.description}
        </Text>
        <Text style={styles.meta}>
          Due: {new Date(task.due_date).toLocaleDateString()}
        </Text>
        <Text style={styles.priority}>Priority: {task.priority}</Text>
        <Text
          style={[
            styles.status,
            task.completed ? styles.completed : styles.pending,
          ]}
        >
          {task.completed ? "Completed" : "Pending"}
        </Text>
      </View>

      <View style={styles.actionSection}>
        <Pressable style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
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
    color: "#0f5132",
  },
  pending: {
    backgroundColor: "#f8d7da",
    color: "#842029",
  },
  actionSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#e2eafc",
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#f8d7da",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
});
