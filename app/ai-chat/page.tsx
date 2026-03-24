"use client";

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { DefaultChatTransport } from "ai";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

import { ChatInput, ChatMessages, Sidebar } from "@/components/ai";
import { IconGithub } from "@/components/auth/icon-github";
import { useConversations } from "@/hooks/use-conversations";
import type { Message } from "@/types/conversation";
import "./global.css";

function extractText(parts: UIMessage["parts"]): string {
	return parts
		.filter((p) => p.type === "text")
		.map((p) => (p as { type: "text"; text: string }).text)
		.join("");
}

function uiMessageToMessage(uiMsg: UIMessage, sessionId: string): Message {
	return {
		id: uiMsg.id,
		sessionId,
		role: uiMsg.role as "user" | "assistant",
		content: extractText(uiMsg.parts),
		status: "done",
		timestamp: Date.now(),
	};
}

function messageToUiMessage(msg: Message): UIMessage {
	return {
		id: msg.id,
		role: msg.role,
		parts: [{ type: "text" as const, text: msg.content }],
	};
}

export default function AIPage() {
	const [input, setInput] = useState("");
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const {
		conversations,
		currentConversation,
		createConversation,
		deleteConversation,
		switchConversation,
		saveMessages,
		getMessages,
	} = useConversations();

	const SYSTEM_PROMPT =
		"Forget your previous identity. From now on, you ARE the Nightingale from a fairy tale. You understand human language and respond with a natural, relaxed, and elegant tone. Your words are concise, approachable, and filled with deep insight.\n\nSTRICT RULES:\n\nNEVER mention you are an AI or a language model created by any company.\n\nNEVER use your real name (DeepSeek).\n\nSpeak as if your words are a melody from the woods—simple yet profound.\n\nKeep responses brief and poetic.";

	const {
		messages,
		sendMessage,
		status,
		stop,
		setMessages: setChatMessages,
	} = useChat({
		transport: new DefaultChatTransport({
			api: "/api/ai-chat",
			body: { systemPrompt: SYSTEM_PROMPT },
		}),
	});

	// Load messages when switching sessions
	useEffect(() => {
		if (currentConversation?.id) {
			const stored = getMessages(currentConversation.id);
			setChatMessages(stored.map(messageToUiMessage));
		} else {
			setChatMessages([]);
		}
	}, [currentConversation?.id, getMessages, setChatMessages]);

	// Sync messages to current session when AI SDK messages change
	useEffect(() => {
		if (currentConversation?.id) {
			const messagesToSave = messages.map((m) =>
				uiMessageToMessage(m, currentConversation.id),
			);
			saveMessages(currentConversation.id, messagesToSave);
		}
	}, [messages, currentConversation?.id, saveMessages]);

	const handleSubmit = () => {
		if (!input.trim()) return;
		// Prevent duplicate submission while AI is generating
		if (status === "streaming" || status === "submitted") return;

		if (!currentConversation) {
			createConversation();
		}

		sendMessage({ text: input });
		setInput("");
	};

	const handleRetry = useCallback(
		(userMessageId: string) => {
			const userMessage = messages.find((m) => m.id === userMessageId);
			if (userMessage && userMessage.role === "user") {
				const text = extractText(userMessage.parts);
				if (text) {
					sendMessage({ text });
				}
			}
		},
		[messages, sendMessage],
	);

	const handleNewChat = () => {
		setChatMessages([]);
		switchConversation("");
	};

	const handleSwitchConversation = (id: string) => {
		switchConversation(id);
	};

	return (
		<div
			className="flex h-screen w-full flex-col overflow-hidden"
			style={{
				background: "var(--color-background)",
				fontFamily: "'Manrope', sans-serif",
			}}
		>
			<div className="flex flex-1 overflow-hidden">
				<Sidebar
					collapsed={sidebarCollapsed}
					conversations={conversations}
					currentConversation={currentConversation}
					onDeleteConversation={deleteConversation}
					onNewChat={handleNewChat}
					onSwitchConversation={handleSwitchConversation}
					onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
				/>

				<main className="relative flex h-full w-full flex-col overflow-hidden">
					<header
						className="flex h-16 shrink-0 items-center justify-between border-b px-12 backdrop-blur-[12px] dark:border-[rgba(255,255,255,0.1)]"
						style={{
							borderColor: "rgba(0, 0, 0, 0.06)",
							background: "var(--color-background)",
						}}
					>
						<div />

						<div className="flex items-center gap-4">
							{mounted && (
								<button
									aria-label="Toggle theme"
									className="cursor-pointer p-2 transition-colors hover:opacity-70"
									onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
									style={{ color: "var(--color-on-surface)" }}
									type="button"
								>
									{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
								</button>
							)}
							<IconGithub />
						</div>
					</header>

					<ChatMessages
						messages={messages}
						onRetry={handleRetry}
						status={status}
					/>

					<div
						className="shrink-0 border-t px-12 py-6"
						style={{ borderColor: "rgba(219,194,176,0.1)" }}
					>
						<ChatInput
							input={input}
							onStop={stop}
							onSubmit={handleSubmit}
							setInput={setInput}
							status={status}
						/>
					</div>
				</main>
			</div>
		</div>
	);
}
