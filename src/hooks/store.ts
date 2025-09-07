import { create } from "zustand";
import { type Evaluation } from "@/lib/types";
import { initialEvaluations } from "@/lib/mock-data";

type ActiveView = "task-list" | "task-editor" | "evaluation-viewer";

interface AppState {
  evaluations: Evaluation[];
  activeView: ActiveView;
  activeTaskId: string | null;
  activeEvaluationId: string | null;

  viewEvaluation: (evaluationId: string) => void;
  startNewTask: (taskId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  evaluations: initialEvaluations,
  activeView: "task-list",
  activeTaskId: null,
  activeEvaluationId: null,

  viewEvaluation: (evaluationId) =>
    set({
      activeView: "evaluation-viewer",
      activeEvaluationId: evaluationId,
      activeTaskId: null,
    }),

  startNewTask: (taskId) =>
    set({
      activeView: "task-editor",
      activeTaskId: taskId,
      activeEvaluationId: null,
    }),
}));
