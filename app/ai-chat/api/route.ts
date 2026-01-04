import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText, UIMessage, convertToModelMessages } from "ai";

const openrouter = createOpenRouter({
  apiKey: process.env.OPEN_ROUTER_MIMO_API_KEY,
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const result = streamText({
    model: openrouter("xiaomi/mimo-v2-flash:free"),
    messages: await convertToModelMessages(messages),
  });

  // 3. 返回响应
  return result.toUIMessageStreamResponse({
    sendSources: true,
  });
}
