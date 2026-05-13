import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

import { type ConversationRequest, ConversationRequestSchema } from "./schema";

export { ConversationRequestSchema };
export type { ConversationRequest };

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

export function streamChatCompletion(data: ConversationRequest) {
	const modelMessages = convertToModelMessages(data.messages);
	const systemPrompt = data.systemPrompt;

	if (systemPrompt && modelMessages.length > 0) {
		const firstUserIndex = modelMessages.findIndex((m) => m.role === "user");
		if (firstUserIndex !== -1) {
			modelMessages[firstUserIndex] = {
				...modelMessages[firstUserIndex],
				content: `Instructions: ${systemPrompt}\n\n${modelMessages[firstUserIndex].content}`,
			};
		}
	}

	return streamText({
		model: openrouter("deepseek/deepseek-chat"),
		messages: modelMessages,
	});
}
