import { create } from "zustand";
import {
  type DeepPartial,
  type Evaluation,
  type EvaluationReportData,
} from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "cefr-app-evaluations";

type ActiveView = "task-list" | "task-editor" | "evaluation-viewer";

interface AppState {
  evaluations: Evaluation[];
  activeView: ActiveView;
  activeTaskId: string | null;
  activeEvaluationId: string | null;

  clearActive: () => void;
  viewEvaluation: (evaluationId: string) => void;
  startNewTask: (taskId: string) => void;

  startEvaluation: (taskId: string, userText: string) => string;
  updateEvaluation: (
    evaluationId: string,
    partialData: DeepPartial<EvaluationReportData>,
  ) => void;
  saveEvaluations: () => void;
}

const loadFromLocalStorage = (): Evaluation[] => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return item ? (JSON.parse(item) as Evaluation[]) : [];
  } catch (error) {
    console.error("Failed to load evaluations from LocalStorage:", error);
    return [];
  }
};

export const useAppStore = create<AppState>((set, get) => ({
  evaluations: loadFromLocalStorage(),
  activeView: "task-list",
  activeTaskId: null,
  activeEvaluationId: null,

  viewEvaluation: (evaluationId) =>
    set({
      activeView: "evaluation-viewer",
      activeEvaluationId: evaluationId,
      activeTaskId: null,
    }),

  clearActive: () =>
    set({
      activeView: "task-list",
      activeTaskId: null,
      activeEvaluationId: null,
    }),

  startNewTask: (taskId) =>
    set({
      activeView: "task-editor",
      activeTaskId: taskId,
      activeEvaluationId: null,
    }),

  startEvaluation: (taskId, userText) => {
    const newEvaluationId = uuidv4();
    const placeholderEvaluation: Evaluation = {
      id: newEvaluationId,
      taskId,
      userText,
      title: `Evaluation ${get().evaluations.length + 1}`,
      evaluation: {
        briefSummary: "",
        positiveHighlight: "",
        cefrLevel: "A1",
        overallFeedback: "",
        categoryRatings: {},
        feedbackItems: [],
      },
    };

    set((state) => ({
      evaluations: [...state.evaluations, placeholderEvaluation],
      activeView: "evaluation-viewer",
      activeEvaluationId: newEvaluationId,
      activeTaskId: null,
    }));

    return newEvaluationId;
  },

  updateEvaluation: (evaluationId, partialData) => {
    set((state) => ({
      evaluations: state.evaluations.map((e) =>
        e.id === evaluationId
          ? { ...e, evaluation: { ...e.evaluation, ...partialData } }
          : e,
      ),
    }));
  },

  saveEvaluations: () => {
    if (typeof window !== "undefined") {
      try {
        const evaluations = get().evaluations;
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(evaluations),
        );
      } catch (error) {
        console.error("Failed to save evaluations to LocalStorage:", error);
      }
    }
  },
}));
