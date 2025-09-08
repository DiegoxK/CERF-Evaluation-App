import { AISDKError, streamObject } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { env } from "@/env";
import { evaluationSchema, evaluateRequestSchema } from "@/lib/schemas";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { checkBotId } from "botid/server";
import { type NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 d"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export async function POST(req: NextRequest) {
  try {
    let rateLimitHeaders: Record<string, string> = {};

    console.log("\n🛡️  Initiating security checks for incoming request...");

    const authorizationHeader = req.headers.get("Authorization");
    console.log(
      `[SECURITY-DEBUG] Authorization header received: ${authorizationHeader ? "Present" : "Not Present"}`,
    );

    if (authorizationHeader === `Bearer ${env.INTERNAL_API_SECRET}`) {
      console.log(
        "✅ [SECURITY] Developer bypass successful. Skipping Bot & Rate Limit checks.",
      );
    } else {
      console.log(
        "ℹ️  [SECURITY] No valid developer bypass key. Proceeding with public checks.",
      );

      console.log("🤖 [SECURITY] Performing BotID check...");
      const botCheck = await checkBotId();
      if (botCheck.isBot) {
        console.warn("🚫 [SECURITY] Bot detected by BotID. Access DENIED.");
        return NextResponse.json(
          { error: "Access denied. Bot detected." },
          { status: 403 },
        );
      }
      console.log(
        "✅ [SECURITY] BotID check passed. Request appears to be from a human.",
      );

      const forwarded = req.headers.get("x-forwarded-for");
      const realIp = req.headers.get("x-real-ip");

      console.log(
        `[SECURITY-DEBUG] x-forwarded-for header: ${forwarded ?? "null"}`,
      );
      console.log(`[SECURITY-DEBUG] x-real-ip header: ${realIp ?? "null"}`);

      const ip = forwarded ? forwarded.split(/, /)[0] : realIp;
      const identifier = ip ?? "127.0.0.1";
      console.log(
        `👤 [SECURITY] Identifier for rate limiting is: ${identifier}`,
      );

      console.log("⏳ [SECURITY] Performing rate limit check with Upstash...");
      const { success, limit, remaining, reset } =
        await ratelimit.limit(identifier);

      rateLimitHeaders = {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString(),
      };

      if (!success) {
        console.warn(`🚫 [SECURITY] Rate limit EXCEEDED...`);
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429, headers: rateLimitHeaders },
        );
      }
      console.log("✅ [SECURITY] Rate limit check passed.");
    }

    const headers: Record<string, string> = {
      "X-Title": "CEFR Text Evaluation App",
    };

    if (req) {
      const host = req.headers.get("host") ?? "localhost";
      const protocol = host.includes("localhost") ? "http" : "https";
      const baseUrl = `${protocol}://${host}`;
      headers["HTTP-Referer"] = baseUrl;
    }

    const openrouter = createOpenRouter({
      apiKey: env.OPENROUTER_API_KEY,
      headers: headers,
    });

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

    const { text, taskDescription } = parseResult.data;

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
      prompt: `The user was given the following task:
      --- TASK DESCRIPTION ---
      ${taskDescription}
      ------------------------

      Here is the user's response to the task. Please evaluate it for its CEFR level and provide detailed feedback.
      
      --- USER TEXT ---
      ${text}
      -----------------`,
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

    const response = result.toTextStreamResponse();
    Object.entries(rateLimitHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
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
