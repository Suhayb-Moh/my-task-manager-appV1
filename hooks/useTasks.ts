import { useState, useEffect } from "react";
import {
  fetchTasks,
  Task,
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "../api/tasksService";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedTasks = await fetchTasks();
        if (fetchedTasks) {
          setTasks(fetchedTasks);
        } else {
          setError("Failed to fetch tasks");
        }
      } catch (error: any) {
        setError(error.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Create Task logic
  const createTask = async (taskData: Task) => {
    try {
      const newTask = await createTaskApi(taskData); // Call the API function here
      if (newTask) {
        setTasks((prevTasks) => [...prevTasks, newTask]); // Add the newly created task to the list
      }
    } catch (error: any) {
      setError(error.message || "Failed to create task");
    }
  };

  // Update Task logic
  const updateTask = async (taskId: string, updateTask: Task) => {
    // Implement the updateTask logic here
    try {
      const updatedTask = await updateTaskApi(taskId, updateTask);
      if (updatedTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
        ); // Update the task in the list
      }
    } catch (error: any) {
      setError(error.message || "Failed to update task");
    }
  };

  // Delete Task logic
  const deleteTask = async (taskId: string) => {
    try {
      await deleteTaskApi(taskId); // Call the API function here
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Remove the deleted task from the list
    } catch (error: any) {
      setError(error.message || "Failed to delete task");
    }
  };

  return {
    tasks,
    loading,
    error,
    reloadTasks: async () => {
      try {
        const refreshedTasks = await fetchTasks();
        if (refreshedTasks) {
          setTasks(refreshedTasks);
        } else {
          setError("Failed to reload tasks");
        }
      } catch (error: any) {
        setError(error.message || "Failed to reload tasks");
      }
    },
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
  };
}
