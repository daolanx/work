"use client";

import { useRouter } from "next/navigation";
import { DeleteButton } from "../../_components/delete-button";
import { useDeleteTask } from "../../_hooks/use-task";

interface DeleteTaskButtonProps {
	taskId: string;
	taskTitle: string;
}

export function DeleteTaskButton({ taskId, taskTitle }: DeleteTaskButtonProps) {
	const router = useRouter();

	const { trigger, isMutating } = useDeleteTask(taskId);

	const handleDelete = async () => {
		try {
			await trigger();
			// Only navigate back if the deletion was successful
			router.push("/console/tasks");
		} catch (err) {
			// Errors are handled by the toast in useDeleteTask hook
			console.error("Deletion failed:", err);
		}
	};

	return (
		<DeleteButton
			dialogDescription={
				<>
					Are you sure you want to delete <strong>{taskTitle}</strong>? This
					action cannot be undone.
				</>
			}
			dialogTitle="Delete Task?"
			isLoading={isMutating}
			label="Delete"
			onConfirm={handleDelete}
		/>
	);
}
