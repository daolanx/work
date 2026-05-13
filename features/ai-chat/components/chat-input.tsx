"use client";

import type { ChatStatus } from "ai";
import { Send, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useConversationsStore } from "@/hooks/use-conversations";

interface ChatInputProps {
	status: ChatStatus;
	onStop: () => void;
	sendMessage: (message: { text: string }) => void;
}

export function ChatInput({ status, onStop, sendMessage }: ChatInputProps) {
	const [input, setInput] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const { currentConversationId, createConversation } = useConversationsStore();

	// Cleanup timer on unmount
	useEffect(() => {
		return () => {
			if (submitTimerRef.current) {
				clearTimeout(submitTimerRef.current);
			}
		};
	}, []);

	// Reset submitting state when status changes
	useEffect(() => {
		if (status === "ready" || status === "error") {
			setIsSubmitting(false);
		}
	}, [status]);

	// Handle submit
	const handleSubmit = () => {
		const trimmed = input.trim();
		if (!trimmed || isSubmitting) return;

		// Ensure conversation exists before sending
		if (!currentConversationId) {
			createConversation();
		}

		setIsSubmitting(true);
		setInput(""); // Clear input immediately
		sendMessage({ text: trimmed });

		// Reset submitting state after a delay
		submitTimerRef.current = setTimeout(() => {
			setIsSubmitting(false);
		}, 1000);
	};

	// Handle keyboard shortcuts
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	const isStreaming = status === "submitted";
	const canSubmit = input.trim() && !isStreaming && !isSubmitting;

	return (
		<div className="mx-auto flex w-full max-w-[50rem] flex-col gap-3">
			<div
				className="flex items-center gap-3 rounded-2xl border p-3 transition-colors sm:p-2"
				style={{
					borderColor: "var(--color-primary)",
					background: "var(--color-surface-highest)",
					boxShadow: "var(--shadow-sm)",
				}}
			>
				<div className="flex-1">
					<textarea
						className="w-full resize-none bg-transparent p-1 text-[15px] outline-none"
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Share what's on your mind..."
						rows={3}
						style={{ color: "var(--color-on-surface)" }}
						value={input}
					/>
				</div>

				<button
					className="flex size-12 items-center justify-center rounded-xl transition-all active:scale-95"
					disabled={!canSubmit && !isStreaming}
					onClick={isStreaming ? onStop : handleSubmit}
					onMouseEnter={(e) => {
						if (canSubmit || isStreaming) {
							e.currentTarget.style.background = "var(--color-primary-dark)";
						}
					}}
					onMouseLeave={(e) => {
						if (canSubmit || isStreaming) {
							e.currentTarget.style.background = "var(--color-primary)";
						}
					}}
					style={{
						background:
							canSubmit || isStreaming
								? "var(--color-primary)"
								: "var(--color-outline-variant)",
						color: "var(--color-on-primary)",
						boxShadow:
							canSubmit || isStreaming ? "var(--shadow-primary)" : "none",
					}}
					type="button"
				>
					{isStreaming ? (
						<Square
							className="size-4"
							style={{ fill: "var(--color-on-primary)" }}
						/>
					) : (
						<Send className="size-4" />
					)}
				</button>
			</div>

			<p
				className="text-center text-[10px] uppercase tracking-[1px] opacity-60"
				style={{ color: "var(--color-tertiary)" }}
			>
				Light. Precise. Natural.
			</p>
		</div>
	);
}
