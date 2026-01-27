"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import {
	IconArrowLeft,
	IconCheck,
	IconCircleCheckFilled,
	IconEdit,
	IconLoader,
	IconLoader2,
	IconTarget,
	IconX,
} from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { DeleteButton } from "../../_components/delete-button";
import { useTask } from "../../_hooks/useTasks";

const taskSchema = z.object({
	header: z.string().min(2, "Header is too short"),
	reviewer: z.string().min(2, "Reviewer name is required"),
	type: z.string().min(1, "Type is required"),
	status: z.string().min(1, "Status is required"),
	target: z.number().min(0, "Must be positive"),
	limit: z.number().min(0, "Must be positive"),
});
type TaskFormValues = z.output<typeof taskSchema>;

export default function TaskDetailPage() {
	const params = useParams();
	const router = useRouter();
	const [isEditing, setIsEditing] = useState(false);

	const {
		task,
		isLoading,
		isUpdating,
		isDeleting,
		updateTask,
		deleteTask,
		error,
	} = useTask({
		taskId: params.taskId as string,
	});

	const form = useForm<TaskFormValues>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			header: "",
			reviewer: "",
			type: "",
			status: "",
			target: 0,
			limit: 0,
		},
	});

	useEffect(() => {
		if (task) {
			form.reset({
				header: task.header,
				reviewer: task.reviewer,
				type: task.type,
				status: task.status,
				target: task.target,
				limit: task.limit,
			});
		}
	}, [task, form]);

	const onSubmit = async (data: TaskFormValues) => {
		try {
			await updateTask({ ...data, id: task?.id });
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
		<div className="flex flex-col gap-6 px-4 py-8 lg:px-12">
			<Form {...form}>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
						<div className="flex items-center gap-3">
							<h2 className="font-bold text-3xl tracking-tight">
								{isEditing ? "Edit Task" : task.header}
							</h2>
							{!isEditing && (
								<Badge
									className="flex items-center gap-1.5 py-1"
									variant={task.status === "Done" ? "default" : "secondary"}
								>
									{task.status === "Done" ? (
										<IconCircleCheckFilled className="size-4 fill-current text-green-400" />
									) : (
										<IconLoader className="size-4 animate-spin" />
									)}
									{task.status}
								</Badge>
							)}
						</div>

						<div className="flex items-center gap-4">
							{isEditing ? (
								<>
									<Button
										onClick={() => {
											setIsEditing(false);
											form.reset();
										}}
										size="sm"
										type="button"
										variant="ghost"
									>
										<IconX className="mr-1 h-4 w-4" /> Cancel
									</Button>
									<Button disabled={isUpdating} size="sm" type="submit">
										{isUpdating ? (
											<IconLoader2 className="mr-1 h-4 w-4 animate-spin" />
										) : (
											<IconCheck className="mr-1 h-4 w-4" />
										)}
										Update
									</Button>
								</>
							) : (
								<>
									<Button
										onClick={() => setIsEditing(true)}
										size="sm"
										type="button"
										variant="outline"
									>
										<IconEdit className="mr-1 h-4 w-4" /> Edit
									</Button>
									<DeleteButton
										dialogDescription={`You Will Delete Task ${task.header}`}
										dialogTitle="Delete Task?"
										isDeleting={isDeleting}
										onDelete={async () => {
											await deleteTask();
											router.back();
										}}
									/>
								</>
							)}
						</div>
					</div>

					<div className="flex gap-4 font-mono text-[11px] text-muted-foreground">
						<span>
							Last Update: {new Date(task.updatedAt).toLocaleString()}
						</span>
					</div>

					<Separator />

					<Card className="border-none bg-slate-50/50 shadow-none">
						<CardContent className="grid gap-8 p-6">
							{/* Info Section */}
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
								<EditableField
									form={form}
									isEditing={isEditing}
									label="Title"
									name="header"
								/>
								<EditableField
									form={form}
									isEditing={isEditing}
									label="Type"
									name="type"
								/>
								<EditableField
									form={form}
									isEditing={isEditing}
									label="Reviewer"
									name="reviewer"
								/>

								<StatusSelectField form={form} isEditing={isEditing} />
							</div>

							<Separator className="opacity-50" />

							<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
								<MetricField
									form={form}
									icon={<IconTarget className="text-blue-500" size={20} />}
									isEditing={isEditing}
									label="Target"
									name="target"
								/>
								<MetricField
									form={form}
									icon={<IconTarget className="text-orange-500" size={20} />}
									isEditing={isEditing}
									label="Limit"
									name="limit"
								/>
							</div>
						</CardContent>
					</Card>
				</form>
			</Form>
		</div>
	);
}

function StatusSelectField({
	form,
	isEditing,
}: {
	form: UseFormReturn<TaskFormValues>;
	isEditing: boolean;
}) {
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
							<Select defaultValue={field.value} onValueChange={field.onChange}>
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

function EditableField({ form, name, label, isEditing, type = "text" }: any) {
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

function MetricField({ form, name, label, isEditing, icon }: any) {
	return (
		<div className="flex items-start gap-4">
			<div className="mt-6 rounded-md border bg-white p-2 shadow-sm">
				{icon}
			</div>
			<div className="flex-1">
				<EditableField
					form={form}
					isEditing={isEditing}
					label={label}
					name={name}
					type="number"
				/>
			</div>
		</div>
	);
}

function TaskDetailSkeleton() {
	return (
		<div className="flex flex-col gap-8 px-4 py-8 lg:px-12">
			<Skeleton className="h-8 w-32" />
			<div className="flex items-center justify-between">
				<Skeleton className="h-10 w-64" />
				<Skeleton className="h-10 w-24" />
			</div>
			<Separator />
			<div className="grid grid-cols-4 gap-6">
				{[1, 2, 3, 4].map((i) => (
					<div className="space-y-2" key={i}>
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-10 w-full" />
					</div>
				))}
			</div>
		</div>
	);
}
