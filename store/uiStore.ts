import { create } from "zustand";

interface UIState {
  isCreateTaskVisible: boolean;
  setCreateTaskVisible: (isVisible: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCreateTaskVisible: false,
  setCreateTaskVisible: (isVisible: boolean) =>
    set({ isCreateTaskVisible: isVisible }),
}));
