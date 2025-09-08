import { Mail, BookText, MessageSquareText } from "lucide-react";
import { type Task } from "@/lib/types";

export const tasks: Task[] = [
  {
    id: "formal-email",
    title: "Write a formal email",
    icon: Mail,
    description: `You are applying for a 'Frontend Developer' position at a tech company called 'Innovate Solutions'. Write a formal email to the hiring manager, Ms. Sarah Chen, expressing your interest in the role and highlighting your key skills.`,
  },
  {
    id: "describe-vacation",
    title: "Describe your last vacation",
    icon: BookText,
    description: `Write a short, descriptive paragraph about your most recent vacation. Be sure to mention where you went, what you did, and how you felt. Try to use descriptive adjectives to make your writing more engaging.`,
  },
  {
    id: "start-conversation",
    title: "Start a conversation",
    icon: MessageSquareText,
    description: `You are at a social event and want to start a friendly conversation with someone new. Write a short, natural-sounding opening. You could ask a question, make a comment about the event, or introduce yourself.`,
  },
];
