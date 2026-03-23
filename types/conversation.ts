// ============================================================
// ChatSession - 会话元数据（用于左侧列表渲染）
// ============================================================
export interface ChatSession {
	id: string;
	title: string;
	createdAt: number;
	updatedAt: number;
	summary: string; // 最后一条消息预览
}

// ============================================================
// Message - 消息明细（与 sessionId 关联）
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
// 内部类型别名（兼容旧代码）
// ============================================================
export type Conversation = ChatSession;
export type ConversationMessage = Message;
