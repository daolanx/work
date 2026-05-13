import type { UIMessage } from "ai";
import type { Message } from "@/types/conversation";

/**
 * Extract text content from UIMessage parts
 */
export function extractText(parts: UIMessage["parts"]): string {
	return parts
		.filter((p) => p.type === "text")
		.map((p) => (p as { type: "text"; text: string }).text)
		.join("");
}

/**
 * Convert AI SDK UIMessage to internal Message format
 */
export function uiMessageToMessage(
	uiMsg: UIMessage,
	sessionId: string,
): Message {
	return {
		id: uiMsg.id,
		sessionId,
		role: uiMsg.role as "user" | "assistant",
		content: extractText(uiMsg.parts),
		status: "done",
		timestamp: Date.now(),
	};
}

/**
 * Convert internal Message to AI SDK UIMessage format
 */
export function messageToUiMessage(msg: Message): UIMessage {
	return {
		id: msg.id,
		role: msg.role,
		parts: [{ type: "text" as const, text: msg.content }],
	};
}
