"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import {
	IconCheck,
	IconDots,
	IconEdit,
	IconLoader2,
	IconX,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import type * as z from "zod";
import { MarkdownWrapper } from "@/components/markdown-wrapper";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
	TASK_CATEGORY_ENUMS,
	TASK_PRIORITY_ENUMS,
	TASK_STATUS_ENUMS,
} from "@/constants/task-enums";
import { createTaskSchema } from "@/lib/validations/task";
import { useTask, useUpdateTask } from "../../_hooks/use-task";
import { CellCategory } from "../_components/cell-category";
import { CellPriority } from "../_components/cell-priority";
import { CellStatus } from "../_components/cell-status";
import { DeleteTaskButton } from "../_components/delete-task-button";

type TaskFormValues = z.infer<typeof createTaskSchema>;

interface EditableFieldProps {
	isEditing: boolean;
	render: () => React.ReactNode;
	editRender: () => React.ReactNode;
}

const EditableField = ({
	isEditing,
	render,
	editRender,
}: EditableFieldProps) => {
	return isEditing ? editRender() : render();
};

// ==================== 1. Optimized Title Field ====================

function TaskTitleField({
	form,
	isEditing,
}: {
	form: UseFormReturn<any>;
	isEditing: boolean;
}) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (isEditing && textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
			textareaRef.current.focus();
		}
	}, [isEditing]);

	return (
		<FormField
			control={form.control}
			name="title"
			render={({ field }) => (
				<div className="w-full">
					{isEditing ? (
						<textarea
							{...field}
							className="w-full resize-none border-none bg-transparent p-0 font-extrabold text-2xl text-slate-900 leading-tight tracking-tight outline-none focus:ring-0 sm:text-4xl"
							onInput={(e: any) => {
								e.target.style.height = "auto";
								e.target.style.height = `${e.target.scrollHeight}px`;
							}}
							ref={textareaRef}
							rows={1}
						/>
					) : (
						<h1 className="w-full break-words font-extrabold text-2xl text-slate-900 leading-tight tracking-tight sm:text-4xl">
							{field.value}
						</h1>
					)}
				</div>
			)}
		/>
	);
}

function TaskEnumField({ form, name, isEditing, options, renderCell }: any) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<div className="shrink-0">
					<EditableField
						editRender={() => (
							<Select onValueChange={field.onChange} value={field.value ?? ""}>
								<FormControl>
									<SelectTrigger className="h-8 min-w-[100px] border-slate-200 bg-white font-bold text-[10px] uppercase">
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{options.map((opt: any) => (
										<SelectItem
											className="font-bold text-[10px] uppercase"
											key={opt.value}
											value={opt.value}
										>
											{opt.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
						isEditing={isEditing}
						render={() => renderCell(field.value)}
					/>
				</div>
			)}
		/>
	);
}

// ==================== 2. Main Page Component ====================

export default function TaskDetailPage() {
	const params = useParams<{ taskId: string }>();
	const [isEditing, setIsEditing] = useState(false);

	const { task, isLoading, error } = useTask(params.taskId);
	const { isMutating, trigger: handleUpdateTask } = useUpdateTask(
		params.taskId,
	);

	const form = useForm<TaskFormValues>({
		resolver: zodResolver(createTaskSchema),
		values: task as TaskFormValues,
	});

	const onSave = async (data: TaskFormValues) => {
		try {
			await handleUpdateTask(data);
			setIsEditing(false);
		} catch (e) {
			console.error(e);
		}
	};

	if (isLoading) return <TaskDetailSkeleton />;
	if (error || !task)
		return (
			<div className="p-10 text-center font-bold text-slate-500">
				Task not found.
			</div>
		);

	return (
		<div className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-10">
			<Form {...form}>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSave)}>
					<div className="flex items-start justify-between gap-3">
						<div className="min-w-0 flex-1">
							<TaskTitleField form={form} isEditing={isEditing} />
						</div>

						<div className="flex shrink-0 items-center gap-1 sm:pt-1">
							{isEditing ? (
								<div className="fade-in zoom-in-95 flex animate-in items-center gap-1.5">
									<Button
										className="h-8 px-2 text-slate-500"
										onClick={() => {
											setIsEditing(false);
											form.reset();
										}}
										size="sm"
										type="button"
										variant="ghost"
									>
										<IconX size={18} /> Cancel
									</Button>
									<Button
										className="h-8 bg-slate-900 px-3 font-bold text-white shadow-sm"
										disabled={isMutating}
										size="sm"
										type="submit"
									>
										{isMutating ? (
											<IconLoader2 className="animate-spin" size={14} />
										) : (
											<IconCheck size={18} />
										)}
										Update
									</Button>
								</div>
							) : (
								<div className="flex items-center gap-1">
									<Button
										className="hidden h-9 items-center border-slate-200 px-3 sm:flex"
										onClick={() => setIsEditing(true)}
										size="sm"
										type="button"
										variant="outline"
									>
										<IconEdit className="mr-1.5" size={16} />
										Edit
									</Button>

									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												className="h-9 w-9 p-0 text-slate-500"
												size="sm"
												variant="ghost"
											>
												<IconDots size={20} />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-36">
											<DropdownMenuItem
												className="font-medium sm:hidden"
												onClick={() => setIsEditing(true)}
											>
												<IconEdit className="mr-2" size={16} />
												Edit Task
											</DropdownMenuItem>
											<DeleteTaskButton
												taskId={String(task.id)}
												taskTitle={task.title}
												variant="dropdown"
											/>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							)}
						</div>
					</div>

					<div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
						<TaskEnumField
							form={form}
							isEditing={isEditing}
							name="status"
							options={TASK_STATUS_ENUMS}
							renderCell={(v: any) => <CellStatus value={v} />}
						/>
						<TaskEnumField
							form={form}
							isEditing={isEditing}
							name="priority"
							options={TASK_PRIORITY_ENUMS}
							renderCell={(v: any) => <CellPriority value={v} />}
						/>
						<TaskEnumField
							form={form}
							isEditing={isEditing}
							name="category"
							options={TASK_CATEGORY_ENUMS}
							renderCell={(v: any) => <CellCategory value={v} />}
						/>
					</div>

					<Separator className="opacity-40" />

					<div className="mt-2">
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<EditableField
									editRender={() => (
										<Textarea
											{...field}
											className="min-h-[350px] resize-none border-none bg-transparent p-0 text-base leading-relaxed focus-visible:ring-0 sm:min-h-[500px]"
											placeholder="Details..."
											value={field.value ?? ""}
										/>
									)}
									isEditing={isEditing}
									render={() => (
										<div className="prose prose-slate prose-sm sm:prose-base max-w-none text-slate-700">
											{field.value ? (
												<MarkdownWrapper>{field.value}</MarkdownWrapper>
											) : (
												<p className="text-slate-300 italic">No description.</p>
											)}
										</div>
									)}
								/>
							)}
						/>
					</div>
				</form>
			</Form>
		</div>
	);
}

function TaskDetailSkeleton() {
	return (
		<div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-8">
			<div className="flex items-start justify-between gap-4">
				<Skeleton className="h-10 w-2/3" />
				<Skeleton className="h-9 w-9 rounded-md" />
			</div>
			<div className="flex gap-2">
				<Skeleton className="h-7 w-20" />
				<Skeleton className="h-7 w-20" />
			</div>
			<Separator />
			<Skeleton className="h-64 w-full rounded-xl" />
		</div>
	);
}
