import { type LucideIcon } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  icon: LucideIcon;
}

export interface FeedbackItem {
  textToHighlight: string;
  feedbackType: string;
  suggestion: string;
  explanation: string;
}

export interface CategoryRating {
  rating: number;
  feedback: string;
}

export interface Evaluation {
  id: string;
  title: string;
  taskId: string;
  userText: string;
  evaluation?: {
    briefSummary?: string;
    positiveHighlight?: string;
    cefrLevel?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
    overallFeedback?: string;
    categoryRatings?: {
      grammar?: CategoryRating;
      vocabulary?: CategoryRating;
      fluency?: CategoryRating;
      cohesion?: CategoryRating;
    };
    feedbackItems?: (FeedbackItem | undefined)[];
  };
}
