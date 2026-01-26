"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Bot, CopyIcon, RefreshCcwIcon } from "lucide-react";
import { useState } from "react";
import {
	Conversation,
	ConversationContent,
	ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
	Message,
	MessageAction,
	MessageActions,
	MessageContent,
	MessageResponse,
} from "@/components/ai-elements/message";
import {
	PromptInput,
	PromptInputBody,
	PromptInputFooter,
	PromptInputHeader,
	type PromptInputMessage,
	PromptInputSubmit,
	PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { MessageLoading } from "@/components/ui/message-loading";

export default function AIChatPage() {
	const [input, setInput] = useState("");
	const { messages, sendMessage, status, regenerate } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/ai-chat",
		}),
	});
	const handleSubmit = (message: PromptInputMessage) => {
		const hasText = Boolean(message.text);
		const hasAttachments = Boolean(message.files?.length);
		if (!(hasText || hasAttachments)) {
			return;
		}
		sendMessage({ text: input });
		setInput("");
	};

	return (
		<div className="relative mx-auto size-full h-screen max-w-4xl overflow-auto px-6 [&::-webkit-scrollbar]:w-2">
			<div className="flex h-full flex-col">
				<Conversation>
					<ConversationContent>
						{messages.map((message) => (
							<div key={message.id}>
								{message.parts.map((part, i) => {
									switch (part.type) {
										case "text":
											return (
												<Message from={message.role} key={`${message.id}-${i}`}>
													<MessageContent>
														{message.role === "assistant" && <Bot />}

														<MessageResponse>{part.text}</MessageResponse>
													</MessageContent>
													{message.role === "assistant" && (
														<MessageActions>
															<MessageAction
																label="Retry"
																onClick={() => regenerate()}
															>
																<RefreshCcwIcon className="size-3" />
															</MessageAction>
															<MessageAction
																label="Copy"
																onClick={() =>
																	navigator.clipboard.writeText(part.text)
																}
															>
																<CopyIcon className="size-3" />
															</MessageAction>
														</MessageActions>
													)}
												</Message>
											);
										default:
											return null;
									}
								})}
							</div>
						))}

						{status === "submitted" && <MessageLoading />}
					</ConversationContent>
					<ConversationScrollButton />
				</Conversation>
				<PromptInput
					className="mt-4"
					globalDrop
					multiple
					onSubmit={handleSubmit}
				>
					<PromptInputHeader></PromptInputHeader>
					<PromptInputBody>
						<PromptInputTextarea
							onChange={(e) => setInput(e.target.value)}
							value={input}
						/>
					</PromptInputBody>
					<PromptInputFooter className="flex w-full justify-end">
						<PromptInputSubmit disabled={!input && !status} status={status} />
					</PromptInputFooter>
				</PromptInput>
			</div>
		</div>
	);
}
