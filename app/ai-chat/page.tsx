"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Menu } from "lucide-react";
import { useState } from "react";
import { IconGithub } from "@/components/auth/icon-github";
import { getSystemPrompt } from "@/lib/chat/prompts";
import { ChatInput } from "./_components/chat-input";
import { ChatMessages } from "./_components/chat-messages";
import { MobileSidebar } from "./_components/mobile-sidebar";
import { Sidebar } from "./_components/sidebar";
import { ThemeSwitch } from "./_components/theme-switch";
import "./global.css";

export default function AIPage() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

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
				{/* Desktop Sidebar - hidden on mobile, shown on md+ */}
				<div className="hidden md:block">
					<Sidebar />
				</div>

				{/* Mobile Sidebar Overlay */}
				{sidebarOpen && (
					<>
						{/* Backdrop */}
						<button
							className="fixed inset-0 z-40 cursor-pointer bg-black/40 backdrop-blur-sm md:hidden"
							onClick={() => setSidebarOpen(false)}
							type="button"
						/>

						{/* Mobile Sidebar Panel */}
						<div className="fixed top-0 left-0 z-50 h-full w-[85%] max-w-[320px] md:hidden">
							<MobileSidebar onClose={() => setSidebarOpen(false)} />
						</div>
					</>
				)}

				<main className="relative flex h-full w-full flex-col overflow-hidden">
					<header
						className="flex h-14 shrink-0 items-center justify-between border-b px-4 backdrop-blur-[12px] sm:px-6 md:px-12 dark:border-[rgba(255,255,255,0.1)]"
						style={{
							borderColor: "rgba(0, 0, 0, 0.06)",
							background: "var(--color-background)",
						}}
					>
						{/* Mobile menu button */}
						<button
							className="flex size-10 items-center justify-center rounded-lg transition-colors md:hidden"
							onClick={() => setSidebarOpen(true)}
							style={{
								background: "var(--color-surface-high)",
								color: "var(--color-on-surface)",
							}}
							type="button"
						>
							<Menu className="size-5" />
						</button>

						{/* Spacer for desktop */}
						<div className="hidden md:block" />

						<div className="flex items-center gap-2 sm:gap-4">
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
						className="shrink-0 border-t px-4 py-4 sm:px-6 md:px-12 md:py-6"
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
