import { z } from "zod";

export const evaluateRequestSchema = z.object({
  text: z
    .string()
    .min(10, { message: "Text must be at least 10 characters long." }),
  taskDescription: z.string(),
});

export const feedbackItemSchema = z.object({
  textToHighlight: z
    .string()
    .describe(
      "The exact text from the user's input that this feedback pertains to. This must be a direct substring.",
    ),
  feedbackType: z
    .string()
    .describe(
      "A category for the feedback, e.g., Grammar, Spelling, Punctuation, Style.",
    ),
  suggestion: z
    .string()
    .describe("The suggested improvement for the highlighted text."),
  explanation: z
    .string()
    .describe("A brief explanation of why the suggestion is an improvement."),
});

export const categoryRatingSchema = z.object({
  rating: z
    .number()
    .min(1)
    .max(5)
    .describe("A rating from 1 to 5, where 5 is excellent."),
  feedback: z.string().describe("Specific feedback for this category."),
});

export const evaluationSchema = z.object({
  briefSummary: z
    .string()
    .describe(
      "A very short, one-sentence summary of the CEFR level assessment. This should be generated first.",
    ),
  positiveHighlight: z
    .string()
    .nullable()
    .describe(
      "A brief mention of one thing the user did well. Be encouraging.",
    ),
  cefrLevel: z
    .enum(["A1", "A2", "B1", "B2", "C1", "C2"])
    .describe("The assessed CEFR level of the text."),
  overallFeedback: z
    .string()
    .describe(
      "A comprehensive summary of the text's strengths and weaknesses.",
    ),
  categoryRatings: z
    .object({
      grammar: categoryRatingSchema.describe(
        "Evaluation of grammatical accuracy and range.",
      ),
      vocabulary: categoryRatingSchema.describe(
        "Evaluation of lexical resource and word choice.",
      ),
      fluency: categoryRatingSchema.describe(
        "Evaluation of the text's natural flow and readability.",
      ),
      cohesion: categoryRatingSchema.describe(
        "Evaluation of how well the text is connected and structured.",
      ),
    })
    .describe("Breakdown of ratings for different linguistic categories."),
  feedbackItems: z
    .array(feedbackItemSchema)
    .describe(
      "An array of detailed feedback items for specific parts of the text.",
    ),
});
