import { Mail, BookText, MessageSquareText } from "lucide-react";
import { type Task } from "@/lib/types";

export const tasks: Task[] = [
  { id: "formal-email", title: "Write a formal email", icon: Mail },
  {
    id: "describe-vacation",
    title: "Describe your last vacation",
    icon: BookText,
  },
  {
    id: "start-conversation",
    title: "Start a conversation",
    icon: MessageSquareText,
  },
];
