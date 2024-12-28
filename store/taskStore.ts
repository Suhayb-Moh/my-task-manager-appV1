// stores/taskStore.ts
import { create } from "zustand";
import { fetchTasks, deleteTask, createTask, Task } from "../api/tasksService";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  loadTasks: () => Promise<void>;
  addTask: (task: Task) => void;
  removeTask: (taskId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,
  loadTasks: async () => {
    set({ loading: true, error: null });
    try {
      const fetchedTasks = await fetchTasks();
      set({ tasks: fetchedTasks, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to load tasks", loading: false });
    }
  },
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  removeTask: async (taskId) => {
    try {
      await deleteTask(taskId);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== taskId),
      }));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  },
}));
