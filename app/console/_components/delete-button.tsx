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
import { Button, type ButtonProps } from "@/components/ui/button";

export interface DeleteButtonProps {
	/** Loading state from the mutation hook */
	isLoading: boolean;
	/** The text on the main button (defaults to "Delete") */
	label?: ReactNode;
	/** Title inside the dialog */
	dialogTitle: ReactNode;
	/** Description inside the dialog */
	dialogDescription: ReactNode;
	/** Callback to trigger the deletion logic */
	onConfirm: () => void | Promise<void>;
	/** Optional button variant customization */
	variant?: ButtonProps["variant"];
	className?: string;
}

export function DeleteButton({
	dialogTitle,
	dialogDescription,
	onConfirm,
	isLoading,
	label = "Delete",
	variant = "destructive",
	className,
}: DeleteButtonProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					className={className}
					disabled={isLoading}
					size="sm"
					variant={variant}
				>
					{isLoading ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<Trash2Icon className="mr-2 h-4 w-4" />
					)}
					{label}
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					<AlertDialogMedia className="bg-destructive/10 text-destructive">
						<Trash2Icon className="h-5 w-5" />
					</AlertDialogMedia>
					<AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
					<AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={isLoading}
						onClick={async (e) => {
							// Prevent the dialog from closing prematurely if logic is async
							e.preventDefault();
							await onConfirm();
						}}
						variant="destructive"
					>
						{isLoading ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
