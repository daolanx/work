// ============================================================
// ChatSession - Session metadata (for sidebar list)
// ============================================================
export interface ChatSession {
	id: string;
	title: string;
	createdAt: number;
	updatedAt: number;
	summary: string;
}

// ============================================================
// Message - Message detail (associated with sessionId)
// ============================================================
export interface Message {
	id: string;
	sessionId: string;
	role: "user" | "assistant" | "system";
	content: string;
	status: "sending" | "done" | "error";
	timestamp: number;
}

// ============================================================
// Type aliases for backward compatibility
// ============================================================
/** @deprecated Use ChatSession instead */
export type Conversation = ChatSession;
