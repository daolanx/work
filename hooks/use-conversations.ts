import { create } from "zustand";
import type { ChatSession, Message } from "@/types/conversation";

interface ConversationsState {
	conversations: ChatSession[];
	currentConversationId: string | null;

	createConversation: (title?: string) => ChatSession;
	deleteConversation: (id: string) => void;
	switchConversation: (id: string) => void;

	messagesMap: Map<string, Message[]>;
	saveMessages: (sessionId: string, messages: Message[]) => void;
	getMessages: (sessionId: string) => Message[];

	// Computed
	getCurrentConversation: () => ChatSession | null;
}

export const useConversationsStore = create<ConversationsState>((set, get) => ({
	conversations: [],
	currentConversationId: null,

	createConversation: (title?: string) => {
		const { conversations } = get();
		const newSession: ChatSession = {
			id: crypto.randomUUID(),
			title: title ?? `Chat ${conversations.length + 1}`,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			summary: "",
		};
		set((state) => ({
			conversations: [newSession, ...state.conversations],
			currentConversationId: newSession.id,
		}));
		return newSession;
	},

	deleteConversation: (id: string) => {
		set((state) => {
			const next = new Map(state.messagesMap);
			next.delete(id);
			return {
				conversations: state.conversations.filter((s) => s.id !== id),
				messagesMap: next,
				currentConversationId:
					state.currentConversationId === id
						? null
						: state.currentConversationId,
			};
		});
	},

	switchConversation: (id: string) => {
		set({ currentConversationId: id });
	},

	messagesMap: new Map(),

	saveMessages: (sessionId: string, messages: Message[]) => {
		set((state) => {
			const next = new Map(state.messagesMap);
			next.set(sessionId, messages);
			return { messagesMap: next };
		});
	},

	getMessages: (sessionId: string): Message[] => {
		return get().messagesMap.get(sessionId) ?? [];
	},

	getCurrentConversation: () => {
		const { conversations, currentConversationId } = get();
		return currentConversationId
			? (conversations.find((s) => s.id === currentConversationId) ?? null)
			: null;
	},
}));
