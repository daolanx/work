"use client";

import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export function NotifyBell() {
	const t = useTranslations("console");

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className="relative h-9 w-9 rounded-full transition-transform active:scale-95"
					size="icon"
					variant="ghost"
				>
					<Bell className="h-[1.1rem] w-[1.1rem] text-muted-foreground transition-colors hover:text-foreground" />
					<span className="absolute top-2.5 right-2.5 flex h-2 w-2">
						<span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
						<span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
					</span>
					<span className="sr-only">{t("header.notifications")}</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="end"
				className="fade-in zoom-in-95 w-80 animate-in overflow-hidden p-0 shadow-lg duration-200"
				sideOffset={8}
			>
				<div className="p-4">
					<div className="mb-1 flex items-center justify-between">
						<h4 className="font-semibold text-sm">
							{t("header.notifications")}
						</h4>
						<span className="rounded bg-muted px-1.5 py-0.5 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
							{t("header.new-count")}
						</span>
					</div>
					<p className="text-muted-foreground text-xs">
						{t("header.unread-messages")}
					</p>
				</div>
				<Separator />
				<div className="max-h-[300px] overflow-y-auto p-2">
					<NotificationItem
						description={t("header.system-update-desc")}
						time={t("header.time-2h")}
						title={t("header.system-update")}
					/>
					<NotificationItem
						description={t("header.new-task-assigned-desc")}
						time={t("header.time-5h")}
						title={t("header.new-task-assigned")}
					/>
				</div>
				<div className="border-t bg-muted/40 p-2 text-center">
					<button
						className="font-medium text-primary text-xs transition-all hover:underline"
						type="button"
					>
						{t("header.view-all")}
					</button>
				</div>
			</PopoverContent>
		</Popover>
	);
}

function NotificationItem({
	title,
	description,
	time,
}: {
	title: string;
	description: string;
	time: string;
}) {
	return (
		<div className="group relative flex cursor-pointer flex-col gap-1 rounded-md p-2 transition-colors hover:bg-accent">
			<div className="flex items-center justify-between">
				<span className="font-medium text-sm leading-none">{title}</span>
				<span className="text-[10px] text-muted-foreground">{time}</span>
			</div>
			<p className="line-clamp-1 text-muted-foreground text-xs">
				{description}
			</p>
		</div>
	);
}
