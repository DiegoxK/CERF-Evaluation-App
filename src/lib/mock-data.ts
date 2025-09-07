import { Mail, BookText, MessageSquareText } from "lucide-react";
import { type Task, type Evaluation } from "@/lib/types";

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

export const initialEvaluations: Evaluation[] = [
  {
    id: "eval-1",
    taskId: "formal-email",
    title: "Attempt-1",
    userText:
      "Dear Mr. Smith, I am writing to ask about the job. I has went to your website and I think I am a good fit. I want to know more details. Thank you.",
    evaluation: {
      cefrLevel: "A2",
      overallFeedback:
        "Good attempt at a formal email. The main points are clear, but there are some significant grammatical errors and the tone could be more professional.",
      categoryRatings: {
        grammar: {
          rating: 2,
          feedback: "Verb tenses and agreement need work.",
        },
        vocabulary: { rating: 3, feedback: "Vocabulary could be more formal." },
        cohesion: { rating: 4, feedback: "The text flows reasonably well." },
        clarity: { rating: 4, feedback: "The main message is understandable." },
      },
      feedbackItems: [
        {
          textToHighlight: "ask about",
          feedbackType: "Vocabulary",
          suggestion: "inquire about",
          explanation: '"inquire" is a more professional verb than "ask".',
        },
        {
          textToHighlight: "I has went",
          feedbackType: "Grammar",
          suggestion: "I have visited",
          explanation: 'The correct present perfect form is "have visited".',
        },
      ],
    },
  },
  {
    id: "eval-2",
    taskId: "describe-vacation",
    title: "Attempt-1",
    userText:
      "My vacation was very fun. We was going to the beach every day. I see many birds. The food were good. I like it so much.",
    evaluation: {
      cefrLevel: "A1",
      overallFeedback:
        "You successfully described your vacation! The main challenge is with past tense verbs and subject-verb agreement.",
      categoryRatings: {
        grammar: { rating: 1, feedback: "Many errors in past tense verbs." },
        vocabulary: { rating: 2, feedback: "Simple but effective vocabulary." },
        cohesion: {
          rating: 3,
          feedback: "Sentences are simple but connected.",
        },
        clarity: { rating: 4, feedback: "Your meaning is clear." },
      },
      feedbackItems: [
        {
          textToHighlight: "We was going",
          feedbackType: "Grammar",
          suggestion: "We went",
          explanation: 'The simple past tense "went" is more appropriate here.',
        },
        {
          textToHighlight: "food were good",
          feedbackType: "Grammar",
          suggestion: "food was good",
          explanation:
            '"Food" is a singular noun, so it should be paired with "was".',
        },
      ],
    },
  },
];
