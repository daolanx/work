"use client";

import type { ChatStatus } from "ai";
import { Send, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatInputProps {
	input: string;
	setInput: (value: string) => void;
	onSubmit: () => void;
	status: ChatStatus;
	onStop: () => void;
}

export function ChatInput({
	input,
	setInput,
	onSubmit,
	status,
	onStop,
}: ChatInputProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (submitTimerRef.current) {
				clearTimeout(submitTimerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (status === "ready" || status === "error") {
			setIsSubmitting(false);
		}
	}, [status]);

	const handleSubmit = () => {
		if (!input.trim() || isSubmitting) return;

		setIsSubmitting(true);
		onSubmit();

		submitTimerRef.current = setTimeout(() => {
			setIsSubmitting(false);
		}, 1000);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	const isStreaming = status === "submitted";

	return (
		<div className="mx-auto flex w-full max-w-[50rem] flex-col gap-3">
			<div
				className="flex items-center gap-2 rounded-2xl border p-2 transition-colors"
				style={{
					borderColor: "var(--color-primary)",
					background: "var(--color-surface)",
					boxShadow: "var(--shadow-sm)",
				}}
			>
				<div className="flex-1">
					<textarea
						className="w-full resize-none bg-transparent p-2 text-[14px] outline-none"
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Share what's on your mind..."
						rows={1}
						style={{ color: "var(--color-on-surface)" }}
						value={input}
					/>
				</div>

				<button
					className="flex size-12 items-center justify-center rounded-xl transition-all active:scale-95"
					disabled={(!input.trim() && !isStreaming) || isSubmitting}
					onClick={isStreaming ? onStop : handleSubmit}
					onMouseEnter={(e) => {
						if (input.trim() || isStreaming) {
							e.currentTarget.style.background = "var(--color-primary-dark)";
						}
					}}
					onMouseLeave={(e) => {
						if (input.trim() || isStreaming) {
							e.currentTarget.style.background = "var(--color-primary)";
						}
					}}
					style={{
						background:
							input.trim() || isStreaming
								? "var(--color-primary)"
								: "var(--color-outline-variant)",
						color: "var(--color-on-primary)",
						boxShadow:
							input.trim() || isStreaming ? "var(--shadow-primary)" : "none",
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
