"use client";

import { Loader2, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ConfirmMutation } from "@/features/console/components/mutations";
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
	const router = useRouter();
	const mutation = useDeleteTask(taskId);

	return (
		<ConfirmMutation
			confirmText="Delete"
			description={
				<>
					Are you sure you want to delete <strong>{taskTitle}</strong>? This
					action cannot be undone.
				</>
			}
			media={<Trash2Icon className="h-5 w-5" />}
			mutation={mutation}
			onSuccess={() => router.push("/console/tasks")}
			payload={undefined as never}
			title="Delete Task?"
		>
			{({ isMutating }) =>
				variant === "dropdown" ? (
					<DropdownMenuItem
						className={cn(
							"cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600",
							className,
						)}
						disabled={isMutating}
						onSelect={(e) => e.preventDefault()}
					>
						{isMutating ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<Trash2Icon className="mr-2 h-4 w-4" />
						)}
						<span>Delete Task</span>
					</DropdownMenuItem>
				) : (
					<Button
						className={cn("text-slate-400 hover:text-red-600", className)}
						disabled={isMutating}
						size="sm"
						variant="outline"
					>
						{isMutating ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<Trash2Icon className="mr-2 h-4 w-4" />
						)}
						Delete
					</Button>
				)
			}
		</ConfirmMutation>
	);
}
