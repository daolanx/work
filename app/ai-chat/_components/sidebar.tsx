"use client";

import {
	ChevronLeft,
	ChevronRight,
	MessageSquarePlus,
	Trash2,
	User,
} from "lucide-react";
import { useCallback, useState } from "react";

import { useConversationsStore } from "@/hooks/use-conversations";
import { styles } from "./styles";

export function Sidebar() {
	const [collapsed, setCollapsed] = useState(false);
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const {
		conversations,
		createConversation,
		deleteConversation,
		switchConversation,
		getCurrentConversation,
	} = useConversationsStore();

	const currentConversation = getCurrentConversation();

	const toggle = useCallback(() => {
		setCollapsed((prev) => !prev);
	}, []);

	return (
		<aside
			className="flex shrink-0 flex-col border-[rgba(219,194,176,0.1)] border-r py-6 transition-all duration-300 ease-in-out"
			style={{
				background: styles.surfaceLow,
				width: collapsed ? "64px" : "288px",
				paddingLeft: collapsed ? "12px" : "24px",
				paddingRight: collapsed ? "12px" : "24px",
			}}
		>
			{/* Top row: Brand + Collapse button */}
			<div className="flex items-center justify-between">
				{!collapsed && (
					<div>
						<h2
							className="font-bold text-[20px] tracking-[-0.4px]"
							style={{
								fontFamily: "'Epilogue', sans-serif",
								color: styles.primary,
							}}
						>
							Parrot Chat
						</h2>
						<p
							className="font-medium text-[12px]"
							style={{ color: styles.onSurfaceVariant }}
						>
							Intelligence, simplified.
						</p>
					</div>
				)}
				<button
					className="flex size-8 items-center justify-center rounded-lg transition-colors"
					onClick={toggle}
					style={{
						background: styles.surfaceHigh,
						color: styles.tertiary,
					}}
					type="button"
				>
					{collapsed ? (
						<ChevronRight className="size-4" />
					) : (
						<ChevronLeft className="size-4" />
					)}
				</button>
			</div>

			{/* New Chat button */}
			<button
				className="mt-6 flex items-center justify-center gap-2 rounded-xl font-bold text-[14px] text-white transition-all active:scale-[0.98]"
				onClick={() => createConversation()}
				onMouseEnter={(e) => {
					e.currentTarget.style.background = styles.primaryDark;
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.background = styles.primary;
				}}
				style={{
					background: styles.primary,
					boxShadow: styles.shadowSm,
					padding: collapsed ? "12px" : "12px 24px",
					width: collapsed ? "40px" : "auto",
				}}
				type="button"
			>
				<MessageSquarePlus className="size-4 shrink-0" />
				{!collapsed && <span>New Chat</span>}
			</button>

			{/* Navigation */}
			{!collapsed && conversations.length > 0 && (
				<div className="mt-8 flex flex-1 flex-col overflow-y-auto">
					{/* HISTORY */}
					<div className="border-[rgba(219,194,176,0.2)] border-t py-4">
						<p
							className="mb-3 px-3 text-[10px] uppercase tracking-[1px]"
							style={{ color: styles.tertiary }}
						>
							HISTORY
						</p>
						<div className="flex flex-col gap-1">
							{conversations.map((item) => (
								<div
									className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-[14px] transition-colors"
									key={item.id}
									onClick={() => switchConversation(item.id)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											switchConversation(item.id);
										}
									}}
									onMouseEnter={() => setHoveredId(item.id)}
									onMouseLeave={() => setHoveredId(null)}
									role="button"
									style={{
										color: styles.onSurfaceVariant,
										background:
											hoveredId === item.id
												? styles.surfaceHigh
												: item.id === currentConversation?.id
													? "rgba(219, 194, 176, 0.1)"
													: "transparent",
									}}
									tabIndex={0}
								>
									<span
										className="flex-1 truncate transition-colors"
										style={
											hoveredId === item.id ||
											item.id === currentConversation?.id
												? { color: styles.primary }
												: undefined
										}
									>
										{item.title}
									</span>
									<button
										className="flex size-6 shrink-0 items-center justify-center rounded transition-all hover:bg-red-100"
										onClick={(e) => {
											e.stopPropagation();
											deleteConversation(item.id);
										}}
										style={{
											color: styles.tertiary,
											opacity: hoveredId === item.id ? 1 : 0,
										}}
										type="button"
									>
										<Trash2 className="size-3.5" />
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{/* User section */}
			{!collapsed ? (
				<div className="mt-auto border-[rgba(219,194,176,0.2)] border-t pt-6">
					<button
						className="mb-4 flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 transition-colors"
						onMouseEnter={(e) => {
							e.currentTarget.style.background = styles.surfaceHigh;
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = "transparent";
						}}
						type="button"
					>
						<div className="flex size-10 items-center justify-center rounded-full border-2 border-[rgba(174,43,0,0.1)]">
							<User className="size-5" style={{ color: styles.tertiary }} />
						</div>
						<div className="flex-1 text-left">
							<p
								className="font-semibold text-[14px]"
								style={{ color: styles.onSurface }}
							>
								Guest User
							</p>
							<p
								className="text-[12px]"
								style={{ color: styles.onSurfaceVariant }}
							>
								Casual Guest
							</p>
						</div>
					</button>
				</div>
			) : (
				/* Collapsed: just user avatar */
				<div className="mt-auto flex flex-col items-center gap-3 pt-6">
					<button
						className="flex size-10 cursor-pointer items-center justify-center rounded-full border-2 border-[rgba(174,43,0,0.1)] transition-transform hover:scale-105"
						style={{ color: styles.tertiary }}
						type="button"
					>
						<User className="size-5" />
					</button>
				</div>
			)}
		</aside>
	);
}
