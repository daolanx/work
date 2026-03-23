"use client";

import { styles } from "./styles";

interface UserMessageProps {
	text: string;
	time: string;
}

export function UserMessage({ text, time }: UserMessageProps) {
	return (
		<div
			className="ml-auto flex w-full max-w-[80%] flex-col items-end gap-1 rounded-tl-2xl rounded-tr-2xl rounded-br-sm rounded-bl-2xl px-6 py-4"
			style={{
				background: styles.surfaceLow,
				boxShadow: styles.shadowSm,
			}}
		>
			<p
				className="text-[14px] leading-[22.75px]"
				style={{ color: styles.onSurface }}
			>
				{text}
			</p>
			<span
				className="pr-1 text-[10px] uppercase tracking-[-0.5px]"
				style={{ color: styles.tertiary }}
			>
				{time}
			</span>
		</div>
	);
}
