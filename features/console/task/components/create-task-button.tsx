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
import { useTranslations } from "next-intl";
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
} from "../constants";
import { useCreateTask } from "../hooks/use-task";
import { type CreateTask, createTaskSchema } from "../schemas";

export function CreateTaskButton({ onSuccess }) {
	const t = useTranslations("console");
	const [open, setOpen] = useState(false);
	const { trigger, isMutating } = useCreateTask();

	const TASK_FORM_CONFIG: FormFieldConfig<CreateTask>[] = [
		{
			name: "title",
			label: t("tasks.title"),
			type: "input",
			icon: IconLetterT,
			placeholder: t("tasks.title-placeholder"),
		},
		{
			name: "status",
			label: t("tasks.status"),
			type: "select",
			icon: IconActivity,
			options: TASK_STATUS_ENUMS,
			className: "col-span-1",
		},
		{
			name: "priority",
			label: t("tasks.priority"),
			type: "select",
			icon: IconFlag,
			options: TASK_PRIORITY_ENUMS,
			className: "col-span-1",
		},
		{
			name: "category",
			label: t("tasks.category"),
			type: "select",
			icon: IconTag,
			options: TASK_CATEGORY_ENUMS,
		},
		{
			name: "content",
			label: t("tasks.content"),
			type: "textarea",
			icon: IconAlignLeft,
			placeholder: t("tasks.content-placeholder"),
		},
	];

	const form = useForm<CreateTask>({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			title: "",
			priority: "MEDIUM",
			category: "WORK",
			content: "",
			status: "To Do",
		},
	});

	const onSubmit = async (data: CreateTask) => {
		try {
			const newTask = await trigger(data);
			setOpen(false);
			onSuccess?.(newTask.id);
			form.reset();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button size="sm">
					<IconPlus className="h-4 w-4" /> {t("tasks.create")}
				</Button>
			</DialogTrigger>
			<DialogContent aria-describedby={undefined} className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle className="font-bold text-2xl">
						{t("tasks.new-task")}
					</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<SchemaFormFields fields={TASK_FORM_CONFIG} form={form} />
						<DialogFooter className="pt-4">
							<Button
								className="h-12 w-full bg-slate-900 font-extrabold"
								disabled={isMutating}
								type="submit"
							>
								{isMutating ? (
									<IconLoader className="animate-spin" />
								) : (
									<IconPlus />
								)}{" "}
								{t("common.confirm")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
