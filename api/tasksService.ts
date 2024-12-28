import { apiDelete, apiGet, apiPost, apiPut } from "../constants/api";

// Updated Type for Task based on your API response
export interface Task {
  _id?: string;
  list_id: string;
  category_id: string;
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

/**
 * Update an existing task.
 * @param taskId - The ID of the task to update.
 * @param taskData - The new data for the task.
 */
export const updateTask = async (
  taskId: string,
  taskData: Task
): Promise<Task | null> => {
  try {
    const response = await apiPut<Task>(`/tasks/${taskId}`, taskData);
    if (response) {
      console.log("Updated task:", response); // Log the updated task for debugging
      return response;
    } else {
      console.error("Failed to update task");
      return null;
    }
  } catch (error) {
    console.error("Error updating task:", error);
    return null;
  }
};

/**
 * Delete a task.
 * @param taskId - The ID of the task to delete.
 */
export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    const response = await apiDelete<Task>(`/tasks/${taskId}`);
    if (response) {
      console.log("Deleted task:", response); // Log the deleted task for debugging
      return true;
    } else {
      console.error("Failed to delete task");
      return false;
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
};
//   },
