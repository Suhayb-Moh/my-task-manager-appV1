import { apiGet, apiPost } from "../constants/api";

// Updated Type for Task based on your API response
export interface Task {
  _id: string;
  list_id: string;
  name: string;
  description: string;
  due_date: string;
  priority: number;
  completed: boolean;
}

export const fetchTasks = async (): Promise<Task[] | null> => {
  try {
    const response = await apiGet<{ tasks: Task[] }>("/tasks");
    if (response && response.tasks) {
      return response.tasks;
    } else {
      console.error("Unexpected response format:", response);
      return null;
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }
};

/**
 * Create a new task.
 * @param taskData - The data for the new task (excluding `id`).
 */

export const createTask = async (
  taskData: Omit<Task, "_id">
): Promise<Task | null> => {
  try {
    const response = await apiPost<Task>("/tasks", taskData);
    if (response) {
      console.log("Created task:", response); // Log the created task for debugging
      return response;
    } else {
      console.error("Failed to create task");
      return null;
    }
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
};
