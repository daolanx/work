"use client";

import { Loader2, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useDeleteTask } from "../hooks/use-task";

interface DeleteTaskButtonProps {
	taskId: string;
	taskTitle: string;
	variant?: "default" | "dropdown";
	className?: string;
}

export function DeleteTaskButton({
	taskId,
	taskTitle,
	variant = "default",
	className,
}: DeleteTaskButtonProps) {
	const t = useTranslations("console");
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const mutation = useDeleteTask(taskId);
	const isLoading = mutation.isMutating;

	const handleConfirm = async () => {
		await mutation.trigger();
		setOpen(false);
		router.push("/console/tasks");
	};

	const trigger =
		variant === "dropdown" ? (
			<DropdownMenuItem
				className={cn(
					"cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600",
					className,
				)}
				disabled={isLoading}
				onSelect={(e) => e.preventDefault()}
			>
				{isLoading ? (
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Trash2Icon className="mr-2 h-4 w-4" />
				)}
				<span>{t("tasks.delete-task")}</span>
			</DropdownMenuItem>
		) : (
			<Button
				className={cn("text-slate-400 hover:text-red-600", className)}
				disabled={isLoading}
				size="sm"
				variant="outline"
			>
				{isLoading ? (
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Trash2Icon className="mr-2 h-4 w-4" />
				)}
				{t("common.delete")}
			</Button>
		);

	return (
		<AlertDialog onOpenChange={setOpen} open={open}>
			<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogMedia>
						<Trash2Icon className="h-5 w-5" />
					</AlertDialogMedia>
					<AlertDialogTitle>{t("tasks.delete-task-confirm")}</AlertDialogTitle>
					<AlertDialogDescription>
						{t.rich("tasks.delete-task-desc", {
							title: taskTitle,
							strong: (chunks) => <strong>{chunks}</strong>,
						})}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>
						{t("common.cancel")}
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={isLoading}
						onClick={handleConfirm}
						variant="destructive"
					>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{t("common.delete")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
