import { create } from "zustand";

interface AppState {
  activeEvaluationId: string | null;
  setActiveEvaluationId: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeEvaluationId: null,
  setActiveEvaluationId: (id) => set({ activeEvaluationId: id }),
}));
