"use client";

import { MessageSquarePlus, MoreVertical, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConversationsStore } from "@/hooks/use-conversations";
import { styles } from "./styles";

interface MobileSidebarProps {
	onClose: () => void;
}

export function MobileSidebar({ onClose }: MobileSidebarProps) {
	const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

	const {
		conversations,
		createConversation,
		deleteConversation,
		switchConversation,
		getCurrentConversation,
	} = useConversationsStore();

	const currentConversation = getCurrentConversation();

	const handleNewChat = () => {
		createConversation();
		onClose();
	};

	const handleSwitchConversation = (id: string) => {
		switchConversation(id);
		onClose();
	};

	return (
		<div
			className="flex h-full w-full flex-col"
			style={{ background: styles.surfaceLow }}
		>
			{/* Header */}
			<div
				className="flex items-center justify-between border-b px-4 py-4"
				style={{ borderColor: "rgba(219,194,176,0.15)" }}
			>
				<div>
					<h2
						className="font-bold text-lg"
						style={{
							fontFamily: "'Epilogue', sans-serif",
							color: styles.primary,
						}}
					>
						Parrot Chat
					</h2>
					<p className="text-xs" style={{ color: styles.onSurfaceVariant }}>
						New conversations
					</p>
				</div>
				<button
					className="flex size-10 items-center justify-center rounded-xl transition-colors active:scale-95"
					onClick={onClose}
					style={{
						background: styles.surfaceHigh,
						color: styles.onSurface,
					}}
					type="button"
				>
					<X className="size-5" />
				</button>
			</div>

			{/* New Chat Button */}
			<div className="px-4 pt-4">
				<button
					className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold text-[15px] text-white transition-all active:scale-[0.98]"
					onClick={handleNewChat}
					style={{
						background: styles.primary,
						boxShadow: styles.shadowPrimary,
					}}
					type="button"
				>
					<MessageSquarePlus className="size-5" />
					<span>New Chat</span>
				</button>
			</div>

			{/* Chat History */}
			<div className="flex-1 overflow-y-auto px-4 pt-4">
				<p
					className="mb-3 px-2 text-[11px] uppercase tracking-wider"
					style={{ color: styles.tertiary }}
				>
					Recent Chats
				</p>

				{conversations.length === 0 ? (
					<div
						className="flex flex-col items-center justify-center py-12 text-center"
						style={{ color: styles.tertiary }}
					>
						<MessageSquarePlus className="mb-3 size-8 opacity-40" />
						<p className="text-sm opacity-60">No conversations yet</p>
						<p className="text-xs opacity-40">
							Start chatting to see your history
						</p>
					</div>
				) : (
					<div className="flex flex-col gap-1 pb-4">
						{conversations.map((item) => (
							<div
								className="flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all active:scale-[0.98]"
								key={item.id}
								onClick={() => handleSwitchConversation(item.id)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										handleSwitchConversation(item.id);
									}
								}}
								role="button"
								style={{
									background:
										item.id === currentConversation?.id
											? "rgba(174, 43, 0, 0.08)"
											: "transparent",
								}}
								tabIndex={0}
							>
								<div
									className="flex size-10 shrink-0 items-center justify-center rounded-full"
									style={{
										background:
											item.id === currentConversation?.id
												? styles.primary
												: styles.surfaceHigh,
									}}
								>
									<span
										className="font-semibold text-sm"
										style={{
											color:
												item.id === currentConversation?.id
													? "white"
													: styles.tertiary,
										}}
									>
										{item.title.charAt(0).toUpperCase()}
									</span>
								</div>

								<span
									className="flex-1 truncate font-medium text-[14px]"
									style={{
										color:
											item.id === currentConversation?.id
												? styles.primary
												: styles.onSurface,
									}}
								>
									{item.title}
								</span>

								<DropdownMenu
									onOpenChange={(open) => setMenuOpenId(open ? item.id : null)}
									open={menuOpenId === item.id}
								>
									<DropdownMenuTrigger asChild>
										<button
											className="flex size-8 items-center justify-center rounded-lg bg-transparent transition-colors"
											onClick={(e) => e.stopPropagation()}
											style={{
												color: styles.tertiary,
											}}
											type="button"
										>
											<MoreVertical className="size-4" />
										</button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										className="min-w-[120px]"
										style={{
											background: styles.surfaceHigh,
											borderColor: "rgba(219,194,176,0.15)",
										}}
									>
										<DropdownMenuItem
											className="cursor-pointer gap-2"
											onClick={(e) => {
												e.stopPropagation();
												deleteConversation(item.id);
												setMenuOpenId(null);
											}}
											style={{
												color: "#ef4444",
											}}
										>
											<Trash2 className="size-4" />
											<span>Delete</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Footer */}
			<div
				className="border-t px-4 pt-4 pb-0"
				style={{ borderColor: "rgba(219,194,176,0.15)" }}
			>
				<div className="flex items-center gap-3">
					<div
						className="flex size-11 shrink-0 items-center justify-center rounded-full"
						style={{
							background: styles.surfaceHigh,
							border: `2px solid ${styles.primary}`,
						}}
					>
						<span
							className="font-semibold text-sm"
							style={{ color: styles.primary }}
						>
							G
						</span>
					</div>
					<div className="flex-1">
						<p
							className="font-semibold text-[14px]"
							style={{ color: styles.onSurface }}
						>
							Guest User
						</p>
						<p className="text-xs" style={{ color: styles.tertiary }}>
							Tap to sign in
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
