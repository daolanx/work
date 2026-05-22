import { Loader2 } from "lucide-react";
import { useId, useState } from "react";
import type { SWRMutationResponse } from "swr/mutation";
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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

// --- Type definitions ---
// Narrow the SWR Mutation type so trigger always accepts an Arg parameter
type BaseMutation<Arg> = Omit<
	SWRMutationResponse<any, any, any, Arg>,
	"trigger"
> & {
	trigger: (args: Arg) => Promise<any>;
};

// ------------------------------------------------------------------
// 1. Mutation — direct trigger without confirmation
// ------------------------------------------------------------------
interface MutationProps<Arg> {
	mutation: BaseMutation<Arg>;
	payload: Arg;
	children: (props: {
		isMutating: boolean;
		trigger: (e?: any) => void;
	}) => React.ReactNode;
}

function Mutation<Arg>({ mutation, payload, children }: MutationProps<Arg>) {
	const handleTrigger = (e?: React.SyntheticEvent) => {
		e?.preventDefault();
		e?.stopPropagation();
		mutation.trigger(payload);
	};

	return (
		<>{children({ isMutating: mutation.isMutating, trigger: handleTrigger })}</>
	);
}

// ------------------------------------------------------------------
// 2. ConfirmMutation — trigger with a confirmation dialog
// ------------------------------------------------------------------
interface ConfirmMutationProps<Arg> {
	mutation: BaseMutation<Arg>;
	payload: Arg;
	title: React.ReactNode;
	description: React.ReactNode;
	confirmText?: string;
	media?: React.ReactNode;
	onSuccess?: () => void | Promise<void>;
	// Render prop for the trigger, or pass ReactNode directly
	children: (props: { isMutating: boolean }) => React.ReactNode;
}

function ConfirmMutation<Arg>({
	mutation,
	payload,
	title,
	description,
	confirmText = "Confirm",
	media,
	onSuccess,
	children,
}: ConfirmMutationProps<Arg>) {
	const [open, setOpen] = useState(false);

	const handleConfirm = async (e: React.MouseEvent) => {
		e.preventDefault();
		// Wait for the mutation to complete before closing the dialog
		await mutation.trigger(payload);
		setOpen(false);
		await onSuccess?.();
	};

	return (
		<AlertDialog onOpenChange={setOpen} open={open}>
			<AlertDialogTrigger asChild>
				{children({ isMutating: mutation.isMutating })}
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					{media && <AlertDialogMedia>{media}</AlertDialogMedia>}
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={mutation.isMutating}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={mutation.isMutating}
						onClick={handleConfirm}
						variant="destructive"
					>
						{mutation.isMutating && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						{confirmText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

// ------------------------------------------------------------------
// 3. PromptMutation — trigger with a form input dialog
// ------------------------------------------------------------------
interface PromptMutationProps<Arg> {
	mutation: any;
	title: React.ReactNode;
	description?: React.ReactNode;
	confirmText?: string;
	getPayload: (formData: FormData) => Arg;
	content: React.ReactNode;
	children: (props: { isMutating: boolean }) => React.ReactNode;
}

function PromptMutation<Arg>({
	mutation,
	title,
	description,
	confirmText = "Submit",
	getPayload,
	content,
	children,
}: PromptMutationProps<Arg>) {
	const [open, setOpen] = useState(false);
	const formId = useId();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const payload = getPayload(formData);
		await mutation.trigger(payload);
		setOpen(false);
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				{children({ isMutating: mutation.isMutating })}
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>

				<form className="space-y-4 py-4" id={formId} onSubmit={handleSubmit}>
					{content}
				</form>

				<DialogFooter>
					<Button
						disabled={mutation.isMutating}
						onClick={() => setOpen(false)}
						type="button"
						variant="outline"
					>
						Cancel
					</Button>
					<Button disabled={mutation.isMutating} form={formId} type="submit">
						{mutation.isMutating && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						{confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export { Mutation, ConfirmMutation, PromptMutation };
