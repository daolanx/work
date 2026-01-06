import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { z } from "zod";

const PartSchema = z.object({
  type: z.string(),
  text: z.string().optional(), 
  state: z.string().optional()
});

const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant", "system"]), 
  parts: z.array(PartSchema),
});

const ConversationSchema = z.object({
  id: z.string(),
  messages: z.array(MessageSchema),
  trigger: z.string(),
});

const openrouter = createOpenRouter({
  apiKey: process.env.OPEN_ROUTER_MIMO_API_KEY,
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const validationResult = ConversationSchema.safeParse(json);
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid request parameters"
        }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" } 
        }
      );
    }
    const result = streamText({
      model: openrouter("xiaomi/mimo-v2-flash:free"),
      messages: await convertToModelMessages(validationResult.data.messages as unknown as UIMessage[]),
    });

    return result.toUIMessageStreamResponse();

  } catch (e) {
    console.error("API Error:", e);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
