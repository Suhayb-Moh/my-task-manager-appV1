import { useState, useEffect } from "react";
import {
  fetchTasks,
  Task,
  createTask as createTaskApi,
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

  return { tasks, loading, error, createTask }; // Return createTask as well
}
