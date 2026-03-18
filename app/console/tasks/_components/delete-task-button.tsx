"use client";

import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DeleteButton } from "../../_components/delete-button";
import { useDeleteTask } from "../../_hooks/use-task";

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
	const router = useRouter();
	const { trigger, isMutating } = useDeleteTask(taskId);

	const handleDelete = async () => {
		try {
			await trigger();
			router.push("/console/tasks");
		} catch (err) {
			console.error("Deletion failed:", err);
		}
	};

	const dialogConfig = {
		dialogTitle: "Delete Task?",
		dialogDescription: (
			<>
				Are you sure you want to delete <strong>{taskTitle}</strong>? This
				action cannot be undone.
			</>
		),
		isLoading: isMutating,
		onConfirm: handleDelete,
	};

	if (variant === "dropdown") {
		return (
			<DeleteButton asChild {...dialogConfig}>
				<DropdownMenuItem
					className={cn(
						"cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600",
						className,
					)}
					onSelect={(e) => e.preventDefault()}
				>
					<Trash2Icon className="mr-2 h-4 w-4" />
					<span>Delete Task</span>
				</DropdownMenuItem>
			</DeleteButton>
		);
	}

	return (
		<DeleteButton
			{...dialogConfig}
			className={cn("text-slate-400 hover:text-red-600", className)}
			label="Delete"
			variant="outline"
		/>
	);
}
