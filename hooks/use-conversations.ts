import { useCallback, useState } from "react";
import type { ChatSession, Message } from "@/types/conversation";

/* ============================================================
   useChatList - 列表管理（对应设计文档 3.1）
   ============================================================ */
export interface UseChatListReturn {
	// Data
	sessions: ChatSession[];
	currentSessionId: string | null;

	// Session CRUD
	createSession: (title?: string) => ChatSession;
	removeSession: (id: string) => void;
	updateSession: (id: string, updates: Partial<ChatSession>) => void;
	switchSession: (id: string) => void;
	clearCurrentSession: () => void; // 切换到"新对话"状态
}

export function useChatList(): UseChatListReturn {
	const [sessions, setSessions] = useState<ChatSession[]>([]);
	const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

	const createSession = useCallback(
		(title?: string) => {
			const newSession: ChatSession = {
				id: crypto.randomUUID(),
				title: title ?? `Chat ${sessions.length + 1}`,
				createdAt: Date.now(),
				updatedAt: Date.now(),
				summary: "",
			};
			setSessions((prev) => [newSession, ...prev]);
			setCurrentSessionId(newSession.id);
			return newSession;
		},
		[sessions.length],
	);

	const removeSession = useCallback(
		(id: string) => {
			setSessions((prev) => prev.filter((s) => s.id !== id));
			if (currentSessionId === id) {
				const remaining = sessions.filter((s) => s.id !== id);
				setCurrentSessionId(remaining[0]?.id ?? null);
			}
		},
		[currentSessionId, sessions],
	);

	const updateSession = useCallback(
		(id: string, updates: Partial<ChatSession>) => {
			setSessions((prev) =>
				prev.map((s) =>
					s.id === id ? { ...s, ...updates, updatedAt: Date.now() } : s,
				),
			);
		},
		[],
	);

	const switchSession = useCallback((id: string) => {
		setCurrentSessionId(id);
	}, []);

	const clearCurrentSession = useCallback(() => {
		setCurrentSessionId(null);
	}, []);

	return {
		sessions,
		currentSessionId,
		createSession,
		removeSession,
		updateSession,
		switchSession,
		clearCurrentSession,
	};
}

/* ============================================================
   useChatRuntime - 对话运行时（对应设计文档 3.2）
   ============================================================ */
export interface UseChatRuntimeReturn {
	// Data
	messages: Message[];
	isGenerating: boolean;

	// Methods
	loadSession: (sessionId: string, messages: Message[]) => void;
	clearMessages: () => void;
	addUserMessage: (content: string) => Message;
	updateMessage: (id: string, updates: Partial<Message>) => void;
	appendAssistantMessage: (content: string) => Message;
}

export function useChatRuntime(): UseChatRuntimeReturn {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isGenerating, setIsGenerating] = useState(false);

	const loadSession = useCallback((_sessionId: string, msgs: Message[]) => {
		setMessages(msgs);
	}, []);

	const clearMessages = useCallback(() => {
		setMessages([]);
	}, []);

	const addUserMessage = useCallback((content: string): Message => {
		const msg: Message = {
			id: crypto.randomUUID(),
			sessionId: "",
			role: "user",
			content,
			status: "done",
			timestamp: Date.now(),
		};
		setMessages((prev) => [...prev, msg]);
		return msg;
	}, []);

	const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
		setMessages((prev) =>
			prev.map((m) => (m.id === id ? { ...m, ...updates } : m)),
		);
	}, []);

	const appendAssistantMessage = useCallback((content: string): Message => {
		const msg: Message = {
			id: crypto.randomUUID(),
			sessionId: "",
			role: "assistant",
			content,
			status: "done",
			timestamp: Date.now(),
		};
		setMessages((prev) => [...prev, msg]);
		return msg;
	}, []);

	return {
		messages,
		isGenerating,
		loadSession,
		clearMessages,
		addUserMessage,
		updateMessage,
		appendAssistantMessage,
	};
}

/* ============================================================
   useConversations - 组合版本（兼容旧接口）
   ============================================================ */
export interface UseConversationsReturn {
	conversations: ChatSession[];
	currentConversation: ChatSession | null;
	createConversation: (title?: string) => ChatSession;
	deleteConversation: (id: string) => void;
	switchConversation: (id: string) => void;
	setMessages: (messages: Message[]) => void;
	clearMessages: () => void;
	messagesMap: Map<string, Message[]>;
	getMessages: (sessionId: string) => Message[];
}

export function useConversations(): UseConversationsReturn {
	const {
		sessions,
		currentSessionId,
		createSession,
		removeSession,
		switchSession,
	} = useChatList();

	const [messagesMap, setMessagesMap] = useState<Map<string, Message[]>>(
		new Map(),
	);

	const currentConversation =
		sessions.find((s) => s.id === currentSessionId) ?? null;

	const createConversation = useCallback(
		(title?: string) => createSession(title),
		[createSession],
	);

	const deleteConversation = useCallback(
		(id: string) => removeSession(id),
		[removeSession],
	);

	const switchConversation = useCallback(
		(id: string) => switchSession(id),
		[switchSession],
	);

	const setMessages = useCallback(
		(msgs: Message[]) => {
			if (!currentSessionId) return;
			setMessagesMap((prev) => {
				const next = new Map(prev);
				next.set(currentSessionId, msgs);
				return next;
			});
		},
		[currentSessionId],
	);

	const clearMessages = useCallback(() => {
		setMessages([]);
	}, [setMessages]);

	const getMessages = useCallback(
		(sessionId: string): Message[] => messagesMap.get(sessionId) ?? [],
		[messagesMap],
	);

	return {
		conversations: sessions,
		currentConversation,
		createConversation,
		deleteConversation,
		switchConversation,
		setMessages,
		clearMessages,
		messagesMap,
		getMessages,
	};
}
