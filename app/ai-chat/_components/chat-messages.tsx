"use client";

import type { ChatStatus, UIMessage } from "ai";
import { Bird } from "lucide-react";
import { useEffect, useRef } from "react";
import { useConversationsStore } from "@/hooks/use-conversations";
import {
	extractText,
	messageToUiMessage,
	uiMessageToMessage,
} from "@/lib/chat/transformers";
import { AIMessage } from "./ai-message";
import { styles } from "./styles";
import { TypingIndicator } from "./typing-indicator";
import { UserMessage } from "./user-message";

interface ChatMessagesProps {
	messages: UIMessage[];
	status: ChatStatus;
	setMessages: (messages: UIMessage[]) => void;
	/** Function to send message to AI - used for retry */
	sendMessage: (message: { text: string }) => void;
}

export function ChatMessages({
	messages,
	status,
	setMessages,
	sendMessage,
}: ChatMessagesProps) {
	const {
		currentConversationId,
		getMessages,
		saveMessages,
		getCurrentConversation,
	} = useConversationsStore();

	// Load messages when switching sessions
	const lastLoadedSessionRef = useRef<string | null>(null);
	const currentConversation = getCurrentConversation();

	useEffect(() => {
		const sessionId = currentConversationId;

		if (sessionId && sessionId !== lastLoadedSessionRef.current) {
			lastLoadedSessionRef.current = sessionId;
			const stored = getMessages(sessionId);
			setMessages(stored.map(messageToUiMessage));
		} else if (!sessionId && currentConversation === null) {
			lastLoadedSessionRef.current = null;
			setMessages([]);
		}
	}, [currentConversationId, getMessages, setMessages, currentConversation]);

	// Sync messages to current session when AI SDK messages change
	useEffect(() => {
		if (currentConversationId) {
			const messagesToSave = messages.map((m) =>
				uiMessageToMessage(m, currentConversationId),
			);
			saveMessages(currentConversationId, messagesToSave);
		}
	}, [messages, currentConversationId, saveMessages]);

	// Handle retry - re-send the user message to get a new AI response
	const handleRetry = (userMessageId: string) => {
		const userMessage = messages.find((m) => m.id === userMessageId);
		if (userMessage && userMessage.role === "user") {
			const text = extractText(userMessage.parts);
			if (text) {
				sendMessage({ text });
			}
		}
	};

	return (
		<div className="hide-scrollbar flex-1 overflow-y-auto px-12">
			<div className="mx-auto flex w-full max-w-[50rem] flex-col gap-12 py-8">
				{/* Empty state */}
				{messages.length === 0 && (
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<div
							className="mb-8 flex size-20 items-center justify-center rounded-3xl border"
							style={{
								background: `linear-gradient(to bottom right, ${styles.surfaceLow}, ${styles.surface})`,
								borderColor: styles.surfaceHigh,
							}}
						>
							<Bird className="size-10" style={{ color: styles.primary }} />
						</div>
						<h2
							className="mb-3 font-bold text-2xl"
							style={{
								fontFamily: "'Epilogue', sans-serif",
								color: styles.onSurface,
							}}
						>
							Welcome to Parrot Chat.
						</h2>
						<p
							className="max-w-sm text-sm leading-relaxed"
							style={{ color: styles.tertiary }}
						>
							Let‘s Talk with Parrot. How's your day, feather-less friend?
						</p>
					</div>
				)}

				{/* Real messages (deduplicate by ID to handle streaming edge cases) */}
				{messages
					.reduce<UIMessage[]>((acc, msg) => {
						if (!acc.some((m) => m.id === msg.id)) {
							acc.push(msg);
						}
						return acc;
					}, [])
					.map((msg, index, arr) => {
						const isUser = msg.role === "user";
						const text = extractText(msg.parts);

						if (isUser) {
							return <UserMessage key={msg.id} text={text} time="" />;
						}

						// Only show retry button for AI messages that have a corresponding user message before them
						// Find the previous user message
						const prevUserMsg = arr
							.slice(0, index)
							.reverse()
							.find((m) => m.role === "user");
						// Show retry when not actively streaming/submitting and has previous user message
						const isIdle = status === "ready" || status === "error";
						const canRetry = prevUserMsg && isIdle;

						return (
							<AIMessage
								key={msg.id}
								onRetry={
									canRetry ? () => handleRetry(prevUserMsg.id) : undefined
								}
							>
								<p
									className="text-[16px] leading-6"
									style={{ color: styles.onSurface }}
								>
									{text}
								</p>
							</AIMessage>
						);
					})}

				{status === "submitted" && <TypingIndicator />}
			</div>
		</div>
	);
}
