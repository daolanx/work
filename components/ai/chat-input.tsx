"use client";

import type { ChatStatus } from "ai";
import { Send, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { styles } from "./styles";

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

	// 清理定时器
	useEffect(() => {
		return () => {
			if (submitTimerRef.current) {
				clearTimeout(submitTimerRef.current);
			}
		};
	}, []);

	// 监听 status 变化，当流式结束时重置提交状态
	useEffect(() => {
		if (status === "ready" || status === "error") {
			setIsSubmitting(false);
		}
	}, [status]);

	const handleSubmit = () => {
		if (!input.trim() || isSubmitting) return;

		setIsSubmitting(true);
		onSubmit();

		// 1秒后重置防抖
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
			{/* Input field */}
			<div
				className="flex items-center gap-2 rounded-2xl border bg-white p-2 transition-colors"
				style={{
					borderColor: styles.primary,
					boxShadow: styles.shadowSm,
				}}
			>
				<div className="flex-1">
					<textarea
						className="w-full resize-none bg-transparent p-2 text-[14px] outline-none placeholder:text-[rgba(114,85,75,0.6)]"
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Explore the depths of poetry..."
						rows={1}
						style={{ color: styles.onSurface }}
						value={input}
					/>
				</div>

				<button
					className="flex size-12 items-center justify-center rounded-xl text-white transition-all active:scale-95"
					disabled={(!input.trim() && !isStreaming) || isSubmitting}
					onClick={isStreaming ? onStop : handleSubmit}
					onMouseEnter={(e) => {
						if (input.trim() || isStreaming) {
							e.currentTarget.style.background = styles.primaryDarker;
						}
					}}
					onMouseLeave={(e) => {
						if (input.trim() || isStreaming) {
							e.currentTarget.style.background = styles.primary;
						}
					}}
					style={{
						background:
							input.trim() || isStreaming
								? styles.primary
								: styles.outlineVariant,
						boxShadow:
							input.trim() || isStreaming ? styles.shadowPrimary : "none",
					}}
					type="button"
				>
					{isStreaming ? (
						<Square className="size-4 fill-white text-white" />
					) : (
						<Send className="size-4" />
					)}
				</button>
			</div>

			{/* Disclaimer */}
			<p
				className="text-center text-[10px] uppercase tracking-[1px] opacity-60"
				style={{ color: styles.tertiary }}
			>
				Harnessing Autumnal Intelligence • Precise & Tactile
			</p>
		</div>
	);
}
