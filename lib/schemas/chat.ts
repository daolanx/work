import { z } from "zod";

/**
 * Schema definitions for AI Chat API
 * Shared between frontend and backend
 */

export const PartSchema = z.object({
	type: z.string(),
	text: z.string().optional(),
	state: z.string().optional(),
});

export const MessageSchema = z.object({
	id: z.string(),
	role: z.enum(["user", "assistant", "system"]),
	parts: z.array(PartSchema),
});

export const ConversationRequestSchema = z.object({
	id: z.string(),
	messages: z.array(MessageSchema),
	trigger: z.string(),
	systemPrompt: z.string().optional(),
});

export type ConversationRequest = z.infer<typeof ConversationRequestSchema>;
export type ChatMessage = z.infer<typeof MessageSchema>;
export type ChatPart = z.infer<typeof PartSchema>;
