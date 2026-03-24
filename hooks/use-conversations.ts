import { useCallback, useRef, useState } from "react";
import type { ChatSession, Message } from "@/types/conversation";

/* ============================================================
   useChatList - session list management
   ============================================================ */
export interface UseChatListReturn {
	sessions: ChatSession[];
	currentSessionId: string | null;
	createSession: (title?: string) => ChatSession;
	removeSession: (id: string) => void;
	updateSession: (id: string, updates: Partial<ChatSession>) => void;
	switchSession: (id: string) => void;
	clearCurrentSession: () => void;
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

	// Functional Updater pattern for zero dependencies.
	// Nested setCurrentSessionId inside setSessions callback to read latest state.
	const removeSession = useCallback((id: string) => {
		setSessions((prev) => {
			const nextSessions = prev.filter((s) => s.id !== id);
			setCurrentSessionId((currentId) => {
				if (currentId === id) {
					return nextSessions[0]?.id ?? null;
				}
				return currentId;
			});
			return nextSessions;
		});
	}, []);

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
   useConversations - unified message and session management (single source of truth)
   ============================================================ */
export interface UseConversationsReturn {
	// Session management
	conversations: ChatSession[];
	currentConversation: ChatSession | null;
	createConversation: (title?: string) => ChatSession;
	deleteConversation: (id: string) => void;
	switchConversation: (id: string) => void;

	// Message management (ref-based to avoid unnecessary re-renders)
	saveMessages: (sessionId: string, messages: Message[]) => void;
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

	// Ref-based storage for all session messages to avoid re-renders on every message change
	const messagesMapRef = useRef<Map<string, Message[]>>(new Map());

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

	// Save messages to a session
	const saveMessages = useCallback((sessionId: string, messages: Message[]) => {
		messagesMapRef.current.set(sessionId, messages);
	}, []);

	// Get messages from a session
	const getMessages = useCallback((sessionId: string): Message[] => {
		return messagesMapRef.current.get(sessionId) ?? [];
	}, []);

	return {
		conversations: sessions,
		currentConversation,
		createConversation,
		deleteConversation,
		switchConversation,
		saveMessages,
		getMessages,
	};
}
