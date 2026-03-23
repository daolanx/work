"use client";

import { Bot } from "lucide-react";

import { styles } from "./styles";

export function TypingIndicator() {
	return (
		<div className="flex items-start gap-4 py-4">
			<div
				className="flex size-8 shrink-0 items-center justify-center rounded-lg"
				style={{ background: styles.primary, boxShadow: styles.shadowMd }}
			>
				<Bot className="size-4 text-white" />
			</div>
			<div className="flex items-center gap-1 pt-2">
				{[0, 1, 2].map((i) => (
					<span
						className="size-2 animate-bounce rounded-full"
						key={i}
						style={{
							background: "var(--color-secondary)",
							opacity: 0.4,
							animationDelay: `${i * 0.15}s`,
						}}
					/>
				))}
			</div>
		</div>
	);
}
