import { AISDKError, streamObject } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { env } from "@/env";
import { evaluationSchema, evaluateRequestSchema } from "@/lib/schemas";

export const maxDuration = 60;

const openrouter = createOpenRouter({
  apiKey: env.OPENROUTER_API_KEY,
  headers: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "CEFR Text Evaluation App",
  },
});

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();

    const parseResult = evaluateRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: parseResult.error.flatten() }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const { text } = parseResult.data;

    const result = streamObject({
      model: openrouter.chat("google/gemini-2.0-flash-001"),
      schema: evaluationSchema,
      system: `You are an expert CEFR language evaluator. Your task is to analyze the user's text and provide a detailed, encouraging evaluation.
      Your response MUST be a structured JSON object that strictly conforms to the provided schema.

      Key Instructions:
      - Include a 'positiveHighlight'. Find at least one thing the user did well and mention it to be encouraging.
      - For 'categoryRatings', YOU MUST use the key name 'rating'.
      - For 'feedbackItems', YOU MUST use the key name 'suggestion'.
       'textToHighlight' MUST be an EXACT substring.
      - **CRITICAL:** The 'feedbackItems' array is the most important part of the evaluation. YOU MUST diligently search for errors in the text.
      - If you find any errors, you MUST create a complete feedback item for EACH of the most significant ones you identify. Each object in the array MUST be complete with all four properties: 'textToHighlight', 'feedbackType', 'suggestion', and 'explanation'.
      - If the text is genuinely flawless (C2 level), the 'feedbackItems' array should be empty. Do not invent errors.

      Here is an example of a perfect response structure:
      Input Text: "I go to the cinema yesterday."
      Perfect JSON Output Example:
      {
        "briefSummary": "The text shows a basic understanding but has a key grammatical error, indicating an A1/A2 level.",
        "positiveHighlight": "Good use of the vocabulary word 'cinema'!",
        "cefrLevel": "A2",
        "overallFeedback": "The user is able to convey a simple past action, but struggles with the correct verb tense. Vocabulary is appropriate for the topic.",
        "categoryRatings": {
          "grammar": { "rating": 2, "feedback": "Incorrect past tense verb form used." },
          "vocabulary": { "rating": 4, "feedback": "Vocabulary is clear and relevant." },
          "fluency": { "rating": 3, "feedback": "The sentence is understandable but not fluid." },
          "cohesion": { "rating": 3, "feedback": "The sentence is a single coherent unit." }
        },
        "feedbackItems": [
          {
            "textToHighlight": "go",
            "feedbackType": "Grammar",
            "suggestion": "went",
            "explanation": "'went' is the correct past tense form of the verb 'to go'."
          }
        ]
      }`,
      prompt: `Please evaluate the following text for its CEFR level and provide detailed feedback:\n\n---\n\n${text}`,
      temperature: 0.3,
      onError: (error) => {
        if (error instanceof AISDKError) {
          throw new Error(`AI SDK Error: ${error.message}`);
        }
        console.error("Error during evaluation:", error);
      },
      onFinish: () => {
        console.log("Evaluation completed.");
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return new Response(JSON.stringify({ error: "Invalid JSON format" }), {
        status: 400,
      });
    }

    console.error("Evaluation API error:", error);
    return new Response("An unexpected error occurred.", { status: 500 });
  }
}
