import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const feedbackColorMap: Record<string, string> = {
  Grammar:
    "border-blue-400/20 bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
  Spelling:
    "border-orange-400/20 bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400",
  Vocabulary:
    "border-green-400/20 bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400",
  Style:
    "border-purple-400/20 bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400",
  Clarity:
    "border-cyan-400/20 bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-400",
  Cohesion:
    "border-indigo-400/20 bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-400",
  Expression:
    "border-pink-400/20 bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-400",
  Punctuation:
    "border-yellow-400/20 bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100",
  Capitalization:
    "border-red-400/20 bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400",
};

const defaultColor =
  "border-gray-400/20 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";

interface FeedbackTypeBadgeProps {
  type: string;
}

export const FeedbackTypeBadge = ({ type }: FeedbackTypeBadgeProps) => {
  const colorClass = feedbackColorMap[type] ?? defaultColor;

  return <Badge className={cn("border capitalize", colorClass)}>{type}</Badge>;
};
