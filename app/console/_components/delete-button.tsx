"use client";

import { Loader2, Trash2Icon } from "lucide-react";
import type React from "react";
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
import { cn } from "@/lib/utils";

export interface DeleteButtonProps {
	isLoading: boolean;
	label?: ReactNode;
	dialogTitle: ReactNode;
	dialogDescription: ReactNode;
	onConfirm: () => void | Promise<void>;
	variant?: ButtonProps["variant"];
	className?: string;
	asChild?: boolean;
	children?: React.ReactNode;
}

export function DeleteButton({
	dialogTitle,
	dialogDescription,
	onConfirm,
	isLoading,
	label = "Delete",
	variant = "destructive",
	className,
	asChild = false,
	children,
}: DeleteButtonProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				{asChild ? (
					children
				) : (
					<Button
						className={cn(className)}
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
				)}
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
