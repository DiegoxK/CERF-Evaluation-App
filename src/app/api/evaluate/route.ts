import { streamObject } from "ai";
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
      model: openrouter.chat("anthropic/claude-3.5-sonnet"),
      schema: evaluationSchema,
      system: `You are an expert CEFR language evaluator. Your task is to analyze the user's text and provide a detailed evaluation based on the Common European Framework of Reference for Languages.

      Your response MUST be a structured JSON object that conforms to the provided schema.

      - cefrLevel: Assess the text and assign one of the CEFR levels (A1, A2, B1, B2, C1, C2).
      - overallFeedback: Provide a constructive, high-level summary.
      - categoryRatings: Rate each category from 1 to 5 and give specific feedback.
      - feedbackItems: Identify specific parts of the text for improvement. For each item, you MUST provide 'textToHighlight' which is an EXACT substring from the user's original text. This is critical for the application to work correctly.`,
      prompt: `Please evaluate the following text for its CEFR level and provide detailed feedback:\n\n---\n\n${text}`,
      temperature: 0.4,
      onError: (error) => {
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
