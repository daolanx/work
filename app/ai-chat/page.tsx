"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { IconGithub } from "@/components/auth/icon-github";
import { getSystemPrompt } from "@/lib/chat/prompts";
import { ChatInput } from "./_components/chat-input";
import { ChatMessages } from "./_components/chat-messages";
import { Sidebar } from "./_components/sidebar";
import { ThemeSwitch } from "./_components/theme-switch";
import "./global.css";

export default function AIPage() {
	const { messages, sendMessage, status, stop, setMessages } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/ai-chat",
			body: { systemPrompt: getSystemPrompt("nightingale") },
		}),
	});

	return (
		<div
			className="flex h-screen w-full flex-col overflow-hidden"
			style={{
				background: "var(--color-background)",
				fontFamily: "'Manrope', sans-serif",
			}}
		>
			<div className="flex flex-1 overflow-hidden">
				<Sidebar />

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
							<ThemeSwitch />
							<IconGithub />
						</div>
					</header>

					<ChatMessages
						messages={messages}
						sendMessage={sendMessage}
						setMessages={setMessages}
						status={status}
					/>

					<div
						className="shrink-0 border-t px-12 py-6"
						style={{ borderColor: "rgba(219,194,176,0.1)" }}
					>
						<ChatInput
							onStop={stop}
							sendMessage={sendMessage}
							status={status}
						/>
					</div>
				</main>
			</div>
		</div>
	);
}
