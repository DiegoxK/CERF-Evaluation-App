import type { z } from "zod";
import { type LucideIcon } from "lucide-react";
import {
  type evaluationSchema,
  type categoryRatingSchema,
  type feedbackItemSchema,
} from "./schemas";

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type EvaluationReportData = z.infer<typeof evaluationSchema>;
export type CategoryRating = z.infer<typeof categoryRatingSchema>;
export type FeedbackItem = z.infer<typeof feedbackItemSchema>;

export interface Evaluation {
  id: string;
  title: string;
  taskId: string;
  userText: string;
  evaluation: DeepPartial<EvaluationReportData>;
}

export interface Task {
  id: string;
  title: string;
  icon: LucideIcon;
}
