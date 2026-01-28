"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	IconCheck,
	IconCircleCheckFilled,
	IconEdit,
	IconLoader,
	IconLoader2,
	IconTarget,
	IconX,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { createTaskSchema, type Task } from "@/lib/validations/task";
import { useTask, useUpdateTask } from "../../_hooks/use-task";
import { DeleteTaskButton } from "../_components/delete-task-button";

// --- Context & Helper Components ---
interface DetailContextValue {
	isEditing: boolean;
}

const DetailContext = createContext<DetailContextValue>({
	isEditing: false,
});

// 修改：移除 id 字段，因为 id 在 URL 中，不需要在表单中
const taskFormSchema = createTaskSchema; // 不需要扩展 id
type TaskFormValues = z.infer<typeof taskFormSchema>;

interface EditableFieldProps {
	form: UseFormReturn<TaskFormValues>;
	name: keyof TaskFormValues;
	label: string;
	type?: React.HTMLInputTypeAttribute;
}

interface StatusSelectFieldProps {
	form: UseFormReturn<TaskFormValues>;
}

interface MetricFieldProps {
	form: UseFormReturn<TaskFormValues>;
	name: keyof TaskFormValues;
	label: string;
	icon: React.ReactNode;
}

interface ActionButtonsProps {
	isMutating: boolean;
	onEdit: () => void;
	onCancel: () => void;
	extra?: React.ReactNode;
}

export default function TaskDetailPage() {
	const params = useParams<{ taskId: string }>();
	const [isEditing, setIsEditing] = useState(false);

	const { task, isLoading, error } = useTask(params.taskId);
	const { isMutating, trigger: handleUpdateTask } = useUpdateTask(
		params.taskId,
	);

	const form = useForm<TaskFormValues>({
		resolver: zodResolver(taskFormSchema),
		values: task
			? {
				header: task.header,
				reviewer: task.reviewer || "", // 确保 reviewer 不是 null
				type: task.type,
				status: task.status as "To Do" | "In Process" | "Done" | "Canceled",
				target: task.target,
				limit: task.limit,
			}
			: undefined,
	});

	const onSubmit = async (data: TaskFormValues) => {
		try {
			await handleUpdateTask(data);
			setIsEditing(false);
		} catch (e) {
			console.error("Update failed", e);
		}
	};

	if (isLoading) return <TaskDetailSkeleton />;
	if (error || !task)
		return (
			<div className="p-10 text-center text-muted-foreground">
				Task not found.
			</div>
		);

	return (
		<DetailContext.Provider value={{ isEditing }}>
			<div className="flex flex-col gap-6 px-4 py-8 lg:px-12">
				<Form {...form}>
					<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
						{/* Header Section */}
						<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
							<div className="flex items-center gap-3">
								<h2 className="font-bold text-3xl tracking-tight">
									{isEditing ? "Edit Task" : task.header}
								</h2>
								{!isEditing && <StatusBadge status={task.status} />}
							</div>

							<div className="flex items-center gap-2">
								<ActionButtons
									extra={
										<DeleteTaskButton
											taskId={task.id}
											taskTitle={task.header}
										/>
									}
									isMutating={isMutating}
									onCancel={() => {
										setIsEditing(false);
										form.reset();
									}}
									onEdit={() => setIsEditing(true)}
								/>
							</div>
						</div>

						<p className="font-mono text-[11px] text-muted-foreground">
							Last Update: {new Date(task.updatedAt).toLocaleString()}
						</p>

						<Separator />

						<Card className="border-none bg-slate-50/50 shadow-none">
							<CardContent className="grid gap-8 p-6">
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
									<EditableField form={form} label="Title" name="header" />
									<EditableField form={form} label="Type" name="type" />
									<EditableField form={form} label="Reviewer" name="reviewer" />
									<EditableStatusSelect form={form} />
								</div>

								<Separator className="opacity-50" />

								<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
									<MetricField
										form={form}
										icon={<IconTarget className="text-blue-500" size={20} />}
										label="Target"
										name="target"
									/>
									<MetricField
										form={form}
										icon={<IconTarget className="text-orange-500" size={20} />}
										label="Limit"
										name="limit"
									/>
								</div>
							</CardContent>
						</Card>
					</form>
				</Form>
			</div>
		</DetailContext.Provider>
	);
}

// --- Sub-components ---

function ActionButtons({ isMutating, onEdit, onCancel, extra }: ActionButtonsProps) {
	const { isEditing } = useContext(DetailContext);

	if (isEditing) {
		return (
			<>
				<Button
					disabled={isMutating}
					onClick={onCancel}
					size="sm"
					type="button"
					variant="ghost"
				>
					<IconX className="mr-2 h-4 w-4" /> Cancel
				</Button>
				<Button disabled={isMutating} size="sm" type="submit">
					{isMutating ? (
						<IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<IconCheck className="mr-2 h-4 w-4" />
					)}
					Update
				</Button>
			</>
		);
	}

	return (
		<>
			<Button onClick={onEdit} size="sm" type="button" variant="outline">
				<IconEdit className="mr-2 h-4 w-4" /> Edit
			</Button>
			{extra}
		</>
	);
}

function EditableField({ form, name, label, type = "text" }: EditableFieldProps) {
	const { isEditing } = useContext(DetailContext);
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="space-y-1.5">
					<FormLabel className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
						{label}
					</FormLabel>
					<FormControl>
						{isEditing ? (
							<Input
								{...field}
								className="h-9 border-slate-200 bg-white"
								value={field.value ?? ""}
								onChange={(e) =>
									field.onChange(
										type === "number" ? e.target.valueAsNumber : e.target.value,
									)
								}
								type={type}
							/>
						) : (
							<p className="py-1 font-medium text-base text-slate-900 leading-snug">
								{field.value || "—"}
							</p>
						)}
					</FormControl>
					<FormMessage className="text-[10px]" />
				</FormItem>
			)}
		/>
	);
}

function EditableStatusSelect({ form }: StatusSelectFieldProps) {
	const { isEditing } = useContext(DetailContext);
	return (
		<FormField
			control={form.control}
			name="status"
			render={({ field }) => (
				<FormItem className="space-y-1.5">
					<FormLabel className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
						Status
					</FormLabel>
					<FormControl>
						{isEditing ? (
							<Select value={field.value ?? ""} onValueChange={field.onChange}>
								<SelectTrigger className="h-9 border-slate-200 bg-white">
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Done">Done</SelectItem>
									<SelectItem value="In Process">In Progress</SelectItem>
									<SelectItem value="To Do">Reviewing</SelectItem>
									<SelectItem value="Canceled">Pending</SelectItem>
								</SelectContent>
							</Select>
						) : (
							<p className="py-1 font-medium text-base text-slate-900 leading-snug">
								{field.value}
							</p>
						)}
					</FormControl>
					<FormMessage className="text-[10px]" />
				</FormItem>
			)}
		/>
	);
}

function MetricField({ form, name, label, icon }: MetricFieldProps) {
	return (
		<div className="flex items-start gap-4">
			<div className="mt-6 rounded-md border bg-white p-2 shadow-sm">
				{icon}
			</div>
			<div className="flex-1">
				<EditableField form={form} label={label} name={name} type="number" />
			</div>
		</div>
	);
}

function StatusBadge({ status }: { status: string }) {
	const isDone = status === "Done";
	return (
		<Badge
			className="flex items-center gap-1.5 py-1"
			variant={isDone ? "default" : "secondary"}
		>
			{isDone ? (
				<IconCircleCheckFilled className="size-4 fill-current text-green-400" />
			) : (
				<IconLoader className="size-4 animate-spin" />
			)}
			{status}
		</Badge>
	);
}

function TaskDetailSkeleton() {
	return (
		<div className="flex flex-col gap-8 px-4 py-8 lg:px-12">
			<div className="flex items-center justify-between">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-8 w-24" />
			</div>
			<Separator />
			<div className="grid grid-cols-4 gap-6">
				{[1, 2, 3, 4].map((i) => (
					<Skeleton className="h-20 w-full" key={i} />
				))}
			</div>
		</div>
	);
}
