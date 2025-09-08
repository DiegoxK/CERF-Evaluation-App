import {
  Mail,
  BookText,
  MessageSquareText,
  ShieldAlert,
  UtensilsCrossed,
  Waypoints,
  Scale,
  Heart,
  Star,
} from "lucide-react";
import { type Task } from "@/lib/types";

export const tasks: Task[] = [
  {
    id: "free-writing",
    title: "Free Writing",
    icon: Star,
    description:
      "Write about anything you like. This is a great way to practice your general writing skills without a specific prompt. Describe your day, your hobbies, or your opinion on a topic.",
  },
  {
    id: "start-conversation",
    title: "Start a conversation",
    icon: MessageSquareText,
    description: `You are at a social event and want to start a friendly conversation with someone new. Write a short, natural-sounding opening. You could ask a question, make a comment about the event, or introduce yourself.`,
  },
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
    description: `Write a short paragraph about your most recent vacation. Be sure to mention where you went, what you did, and how you felt. Try to use descriptive adjectives to make your writing more engaging.`,
  },
  {
    id: "complaint-email",
    title: "Write a complaint email",
    icon: ShieldAlert,
    description: `You recently bought a product online that arrived damaged. Write a formal email to the customer support team of 'Gadget World'. Explain the problem, mention your order number (e.g., GW12345), and request a replacement or a refund.`,
  },
  {
    id: "restaurant-review",
    title: "Write a restaurant review",
    icon: UtensilsCrossed,
    description: `Write a review for a restaurant you recently visited. Describe the food, the atmosphere, and the service. State whether you would recommend it to others and explain why.`,
  },
  {
    id: "give-directions",
    title: "Give directions",
    icon: Waypoints,
    description: `A tourist has asked you for directions from the local train station to the city museum. Write clear, step-by-step instructions. Use landmarks to help guide them (e.g., 'turn left at the big post office').`,
  },
  {
    id: "argument-opinion",
    title: "Argue your opinion",
    icon: Scale,
    description: `Some people believe that remote work is the future, while others think working in an office is better for collaboration. Write a short paragraph expressing your opinion on this topic. Give at least one reason to support your view.`,
  },
  {
    id: "describe-hobby",
    title: "Describe your favorite hobby",
    icon: Heart,
    description: `Describe a hobby or activity that you enjoy. Explain what it is, why you like it, and how often you do it. This is a chance to use vocabulary related to your personal interests.`,
  },
];
