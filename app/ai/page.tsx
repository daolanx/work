"use client";

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

import { ChatInput, ChatMessages, Sidebar } from "@/components/ai";
import { useConversations } from "@/hooks/use-conversations";
import type { Message } from "@/types/conversation";
import "@/app/ai/global.css";

/* ============================================================
   工具函数
   ============================================================ */
function extractText(parts: UIMessage["parts"]): string {
	return parts
		.filter((p) => p.type === "text")
		.map((p) => (p as { type: "text"; text: string }).text)
		.join("");
}

// 将 useChat 的 UIMessage 转换为内部 Message
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

/* ============================================================
   主页面组件
   ============================================================ */
export default function AIPage() {
	const [input, setInput] = useState("");
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	// ----------------------------
	// 1. 会话管理
	// ----------------------------
	const {
		conversations,
		currentConversation,
		createConversation,
		deleteConversation,
		switchConversation,
	} = useConversations();

	// ----------------------------
	// 2. useChat (流式响应)
	// ----------------------------
	const {
		messages,
		sendMessage,
		status,
		stop,
		setMessages: setChatMessages,
	} = useChat({
		transport: new DefaultChatTransport({
			api: "/api/ai-chat",
		}),
	});

	// 用 ref 存储消息映射（避免闭包问题）
	const messagesMapRef = useRef<Map<string, Message[]>>(new Map());
	// 追踪当前会话 ID
	const currentSessionIdRef = useRef<string | null>(null);

	// 同步 currentSessionIdRef
	useEffect(() => {
		currentSessionIdRef.current = currentConversation?.id ?? null;
	}, [currentConversation?.id]);

	// ----------------------------
	// 3. 加载会话消息到 useChat
	// ----------------------------
	// biome-ignore lint/correctness/useExhaustiveDependencies: messagesMapRef is stable
	useEffect(() => {
		if (currentConversation) {
			const stored = messagesMapRef.current.get(currentConversation.id) ?? [];
			const uiMessages: UIMessage[] = stored.map((msg) => ({
				id: msg.id,
				role: msg.role,
				parts: [{ type: "text" as const, text: msg.content }],
			}));
			setChatMessages(uiMessages);
		} else {
			setChatMessages([]);
		}
	}, [currentConversation?.id, setChatMessages]);

	// ----------------------------
	// 4. 同步 useChat 消息到 ref
	// ----------------------------
	useEffect(() => {
		const sessionId = currentSessionIdRef.current;
		if (!sessionId) return;

		// 转换当前 useChat 消息为内部格式
		const newStored: Message[] = messages.map((m) =>
			uiMessageToMessage(m, sessionId),
		);

		// 更新 ref
		messagesMapRef.current.set(sessionId, newStored);
	}, [messages]);

	// ----------------------------
	// 5. 提交消息
	// ----------------------------
	const handleSubmit = () => {
		if (!input.trim()) return;

		// 如果没有当前会话，创建一个
		if (!currentConversation) {
			createConversation();
		}

		// 发送消息
		sendMessage({ text: input });
		setInput("");
	};

	// ----------------------------
	// 6. 重试
	// ----------------------------
	const handleRetry = (userMessageId: string) => {
		const userMessage = messages.find((m) => m.id === userMessageId);
		if (userMessage && userMessage.role === "user") {
			const text = extractText(userMessage.parts);
			if (text) {
				sendMessage({ text });
			}
		}
	};

	// ----------------------------
	// 7. 新建对话
	// ----------------------------
	const handleNewChat = () => {
		setChatMessages([]);
		switchConversation("");
	};

	// ----------------------------
	// 8. 切换会话
	// ----------------------------
	const handleSwitchConversation = (id: string) => {
		switchConversation(id);
	};

	// ----------------------------
	// 渲染
	// ----------------------------
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
						className="flex h-16 shrink-0 items-center border-b px-12 backdrop-blur-[12px]"
						style={{
							borderColor: "rgba(219,194,176,0.1)",
							background: "rgba(252,249,242,0.8)",
						}}
					/>

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
