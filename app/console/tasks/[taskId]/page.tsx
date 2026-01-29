"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SelectLabel } from "@radix-ui/react-select";
import {
	IconCheck,
	IconDots,
	IconEdit,
	IconLoader2,
	IconX,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import type * as z from "zod";
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
/** * REUSED COMPONENTS
 * These handle the domain-specific logic (colors, icons, labels)
 */
import { CellStatus } from "../_components/cell-status";
import { DeleteTaskButton } from "../_components/delete-task-button";
import { MarkdownWrapper } from "@/components/markdown-wrapper";

type TaskFormValues = z.infer<typeof createTaskSchema>;

// ==================== 1. Core Abstraction ====================

interface EditableFieldProps {
	isEditing: boolean;
	render: React.ReactNode;
	editRender: React.ReactNode;
}

/**
 * Switcher component to toggle between View and Edit modes
 */
const EditableField = ({
	isEditing,
	render,
	editRender,
}: EditableFieldProps) => {
	return isEditing ? <>{editRender}</> : <>{render}</>;
};

// ==================== 2. Specialized Fields ====================

/**
 * Unified Enum Field: Uses injected "renderCell" for viewing
 */
interface TaskEnumFieldProps {
	form: UseFormReturn<any>;
	name: "status" | "priority" | "category";
	isEditing: boolean;
	options: { key: string; label: string }[];
	renderCell: (value: any) => React.ReactNode;
}

function TaskEnumField({
	form,
	name,
	isEditing,
	options,
	renderCell,
}: TaskEnumFieldProps) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<EditableField
					editRender={
						<Select onValueChange={field.onChange} value={field.value ?? ""}>
							<FormControl>
								{/* 移除 SelectLabel，因为它不能在这里直接使用 */}
								<SelectTrigger className="h-9 w-fit min-w-[140px] border border-slate-200 bg-white px-3 font-bold text-[11px] uppercase shadow-sm transition-all focus:ring-slate-900">
									<SelectValue />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectGroup>
									<SelectLabel className="px-2 py-1.5 text-[10px] text-slate-400 uppercase">
										Choose {field.name}
									</SelectLabel>
									{options.map((opt) => (
										<SelectItem
											className="font-bold text-[11px] uppercase"
											key={opt.key}
											value={opt.key}
										>
											{opt.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					}
					isEditing={isEditing}
					render={renderCell(field.value)}
				/>
			)}
		/>
	);
}

/**
 * Title Field: Large typography with native input for editing
 */
function TaskTitleField({
	form,
	isEditing,
}: {
	form: UseFormReturn<any>;
	isEditing: boolean;
}) {
	return (
		<FormField
			control={form.control}
			name="title"
			render={({ field }) => (
				<EditableField
					editRender={
						<input
							{...field}
							className="flex-1 border-none bg-transparent px-0 py-1 font-extrabold text-4xl placeholder:text-slate-200 focus:outline-none"
						/>
					}
					isEditing={isEditing}
					render={
						<h1 className="flex-1 break-all font-extrabold text-4xl text-slate-900 leading-tight tracking-tight">
							{field.value}
						</h1>
					}
				/>
			)}
		/>
	);
}

/**
 * Content Field: Markdown preview (simple div) vs Textarea
 */
function TaskContentField({
	form,
	isEditing,
}: {
	form: UseFormReturn<any>;
	isEditing: boolean;
}) {
	return (
		<FormField
			control={form.control}
			name="content"
			render={({ field }) => (
				<EditableField
					editRender={
						<FormItem>
							<FormControl>
								<Textarea
									{...field}
									className="min-h-[500px] resize-none border-none bg-transparent p-0 font-mono text-base leading-relaxed shadow-none focus-visible:ring-0"
									placeholder="Task description (Markdown supported)..."
									value={field.value ?? ""}
								/>
							</FormControl>
						</FormItem>
					}
					isEditing={isEditing}
					render={
						<div className="prose prose-slate prose-lg min-h-[200px] max-w-none whitespace-pre-wrap py-2 text-slate-700">

							{field.value ? <MarkdownWrapper>{field.value}</MarkdownWrapper> : (
								<span className="text-slate-300 italic">
									No content provided.
								</span>
							)}
						</div>
					}
				/>
			)}
		/>
	);
}

// ==================== 3. Main Page Component ====================

export default function TaskDetailPage() {
	const params = useParams<{ taskId: string }>();
	const [isEditing, setIsEditing] = useState(false);

	// Data Hooks
	const { task, isLoading, error } = useTask(params.taskId);
	const { isMutating, trigger: handleUpdateTask } = useUpdateTask(
		params.taskId,
	);

	const form = useForm<TaskFormValues>({
		resolver: zodResolver(createTaskSchema),
		values: task as TaskFormValues,
	});

	console.log("Form Errors:", form.formState.errors);

	const onSave = async (data: TaskFormValues) => {
		try {
			await handleUpdateTask(data);
			setIsEditing(false);
		} catch (e) {
			console.error("Save failed:", e);
		}
	};

	if (isLoading) return <TaskDetailSkeleton />;
	if (error || !task)
		return (
			<div className="p-10 text-center font-bold text-muted-foreground">
				Task not found.
			</div>
		);

	return (
		<div className="mx-auto w-full  px-4 py-10 lg:px-24">
			<Form {...form}>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSave)}>
					{/* Header Actions */}
					<div className="flex items-start justify-between gap-4">
						<TaskTitleField form={form} isEditing={isEditing} />

						<div className="flex shrink-0 items-center gap-1 pt-1">
							{isEditing ? (
								<div className="fade-in zoom-in-95 flex animate-in gap-1 duration-200">
									<Button
										className="h-8 w-8 p-0 text-slate-400 hover:text-red-500"
										onClick={() => {
											setIsEditing(false);
											form.reset();
										}}
										size="sm"
										type="button"
										variant="ghost"
									>
										<IconX size={18} />
									</Button>
									<Button
										className="h-8 rounded-lg bg-slate-900 px-4 font-bold text-white text-xs shadow-lg transition-all active:scale-95"
										disabled={isMutating}
										size="sm"
										type="submit"
									>
										{isMutating ? (
											<IconLoader2 className="animate-spin" size={14} />
										) : (
											<IconCheck className="mr-1" size={14} />
										)}
										Save
									</Button>
								</div>
							) : (
								<div className="flex gap-2">
									<Button
										className="cursor-pointer text-slate-600 transition-colors hover:text-slate-900"
										onClick={() => setIsEditing(true)}
										size="sm"
										type="button"
										variant="outline"
									>
										<IconEdit /> Edit
									</Button>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button className="h-8 w-8 p-0" size="sm" variant="ghost">
												<IconDots size={18} />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
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

					{/* Meta Information - Reusing List View Logic */}
					<div className="flex gap-3">
						<TaskEnumField
							form={form}
							isEditing={isEditing}
							name="status"
							options={TASK_STATUS_ENUMS}
							renderCell={(val) => <CellStatus value={val} />}
						/>

						<TaskEnumField
							form={form}
							isEditing={isEditing}
							name="priority"
							options={TASK_PRIORITY_ENUMS}
							renderCell={(val) => <CellPriority value={val} />}
						/>
						<TaskEnumField
							form={form}
							isEditing={isEditing}
							name="category"
							options={TASK_CATEGORY_ENUMS}
							renderCell={(val) => <CellCategory value={val} />}
						/>
					</div>

					<Separator className="opacity-50" />

					{/* Task Content */}
					<TaskContentField form={form} isEditing={isEditing} />
				</form>
			</Form>
		</div>
	);
}

// ==================== 4. Skeleton UI ====================

function TaskDetailSkeleton() {
	return (
		<div className="mx-auto w-full space-y-10 px-4 py-10 lg:px-24">
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<Skeleton className="h-12 w-2/3 rounded-lg" />
					<div className="flex gap-2">
						<Skeleton className="h-8 w-8 rounded-md" />
						<Skeleton className="h-8 w-8 rounded-md" />
					</div>
				</div>
			</div>
			<Separator />
			<div className="space-y-4">
				<div className="flex gap-4">
					<Skeleton className="h-6 w-24 rounded-full" />
					<Skeleton className="h-6 w-24 rounded-full" />
				</div>
				<Skeleton className="h-[400px] w-full rounded-xl" />
			</div>
		</div>
	);
}
