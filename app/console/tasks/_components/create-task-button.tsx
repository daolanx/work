"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	IconActivity,
	IconAlignLeft,
	IconFlag,
	IconLetterT,
	IconLoader,
	IconPlus,
	IconTag,
} from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	type FormFieldConfig,
	SchemaFormFields,
} from "@/components/forms/schema-form-fields";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import {
	TASK_CATEGORY_ENUMS,
	TASK_PRIORITY_ENUMS,
	TASK_STATUS_ENUMS,
} from "@/constants/task-enums";
import { type CreateTaskInput, createTaskSchema } from "@/lib/validations/task";
import { useCreateTask } from "../../_hooks/use-task";

const TASK_FORM_CONFIG: FormFieldConfig<CreateTaskInput>[] = [
	{
		name: "title",
		label: "Title",
		type: "input",
		icon: IconLetterT,
		placeholder: "e.g., Finalize Q1 Report",
	},
	{
		name: "status",
		label: "Status",
		type: "select",
		icon: IconActivity,
		options: TASK_STATUS_ENUMS,
		className: "col-span-1",
	},
	{
		name: "priority",
		label: "Priority",
		type: "select",
		icon: IconFlag,
		options: TASK_PRIORITY_ENUMS,
		className: "col-span-1",
	},
	{
		name: "category",
		label: "Category",
		type: "select",
		icon: IconTag,
		options: TASK_CATEGORY_ENUMS,
	},
	{
		name: "content",
		label: "Content",
		type: "textarea",
		icon: IconAlignLeft,
		placeholder: "Add details...",
	},
];

export function CreateTaskButton() {
	const [open, setOpen] = useState(false);
	const { trigger: createTask, isMutating: isCreating } = useCreateTask();

	const form = useForm<CreateTaskInput>({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			title: "",
			priority: "MEDIUM",
			category: "WORK",
			content: "",
			status: "To Do",
		},
	});

	const onSubmit = async (data: CreateTaskInput) => {
		try {
			await createTask(data);
			setOpen(false);
			form.reset();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button size="sm">
					<IconPlus className="h-4 w-4" /> Create
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle className="font-bold text-2xl">New Task</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<SchemaFormFields fields={TASK_FORM_CONFIG} form={form} />
						<DialogFooter className="pt-4">
							<Button
								className="h-12 w-full bg-slate-900 font-extrabold"
								disabled={isCreating}
								type="submit"
							>
								{isCreating ? (
									<IconLoader className="animate-spin" />
								) : (
									<IconPlus />
								)}{" "}
								Confirm
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
