"use client";

import { Loader2, Trash2Icon } from "lucide-react";
import type { ReactNode } from "react";
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

export interface DeleteButtonProps {
	isDeleting: boolean;
	label?: ReactNode;
	dialogTitle: ReactNode;
	dialogDescription: ReactNode;
	onDelete: () => void | Promise<void>;
}

export function DeleteButton({
	dialogTitle,
	dialogDescription,
	onDelete,
	isDeleting,
	label,
}: DeleteButtonProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					className="gap-2"
					disabled={isDeleting}
					size="sm"
					variant="destructive"
				>
					{isDeleting ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						<Trash2Icon className="h-4 w-4" />
					)}
					{label || "Delete"}
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					<AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
						<Trash2Icon className="h-5 w-5" />
					</AlertDialogMedia>
					<AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
					<AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting} variant="outline">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={isDeleting}
						onClick={async (e) => {
							e.stopPropagation();
							e.preventDefault();
							await onDelete();
						}}
						variant="destructive"
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
