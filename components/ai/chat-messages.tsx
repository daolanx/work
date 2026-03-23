"use client";

import type { ChatStatus, UIMessage } from "ai";
import { Bot } from "lucide-react";
import { AIMessage } from "./ai-message";
import { styles } from "./styles";
import { TypingIndicator } from "./typing-indicator";
import { UserMessage } from "./user-message";

interface ChatMessagesProps {
	messages: UIMessage[];
	status: ChatStatus;
	onRetry?: (messageId: string) => void;
}

function extractText(parts: UIMessage["parts"]): string {
	return parts
		.filter((p) => p.type === "text")
		.map((p) => (p as { type: "text"; text: string }).text)
		.join("");
}

export function ChatMessages({ messages, status, onRetry }: ChatMessagesProps) {
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
							<Bot className="size-10" style={{ color: styles.primary }} />
						</div>
						<h2
							className="mb-3 font-bold text-2xl"
							style={{
								fontFamily: "'Epilogue', sans-serif",
								color: styles.onSurface,
							}}
						>
							Welcome, Fellow Scholar
						</h2>
						<p
							className="max-w-sm text-sm leading-relaxed"
							style={{ color: styles.tertiary }}
						>
							This is a warm space for thoughtful conversation. Ask anything —
							from the mundane to the profound.
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
						const canRetry = onRetry && prevUserMsg && isIdle;

						return (
							<AIMessage
								key={msg.id}
								onRetry={canRetry ? () => onRetry(prevUserMsg.id) : undefined}
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
