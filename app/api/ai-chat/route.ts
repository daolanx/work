import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

import {
	type ConversationRequest,
	ConversationRequestSchema,
} from "@/lib/schemas/chat";

const openrouter = createOpenRouter({
	apiKey: process.env.OPEN_ROUTER_MIMO_API_KEY,
});

function convertToModelMessages(
	messages: ConversationRequest["messages"],
): { role: "user" | "assistant" | "system"; content: string }[] {
	return messages
		.map((message) => {
			const textPart = message.parts.find((p) => p.type === "text");
			const content = textPart?.text ?? "";
			return {
				role: message.role,
				content,
			};
		})
		.filter((m) => m.content);
}

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const validationResult = ConversationRequestSchema.safeParse(json);
		if (!validationResult.success) {
			return new Response(
				JSON.stringify({
					error: "Invalid request parameters",
					details: validationResult.error,
				}),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		const modelMessages = convertToModelMessages(
			validationResult.data.messages,
		);

		// Get system prompt from request body
		const systemPrompt = validationResult.data.systemPrompt;

		// Prepend system instruction to first user message for better compliance
		if (systemPrompt && modelMessages.length > 0) {
			const firstUserIndex = modelMessages.findIndex((m) => m.role === "user");
			if (firstUserIndex !== -1) {
				modelMessages[firstUserIndex] = {
					...modelMessages[firstUserIndex],
					content: `Instructions: ${systemPrompt}\n\n${modelMessages[firstUserIndex].content}`,
				};
			}
		}

		const result = streamText({
			model: openrouter("deepseek/deepseek-chat"),
			messages: modelMessages,
		});

		return result.toUIMessageStreamResponse();
	} catch (e) {
		console.error("API Error:", e);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
