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
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import {
	TASK_CATEGORY_ENUMS,
	TASK_PRIORITY_ENUMS,
	TASK_STATUS_ENUMS,
} from "@/constants/task-enums";
import { type CreateTaskInput, createTaskSchema } from "@/lib/validations/task";
import { CardTable } from "../../_components/card-table";
import { useCreateTask, useTasks } from "../../_hooks/use-task";
import { CellCategory } from "./cell-category";
import { CellPriority } from "./cell-priority";
import { CellStatus } from "./cell-status";

// --- Cleaned Create Task Modal with Content ---
function CreateTaskButton() {
	const [open, setOpen] = useState(false);
	const { trigger: createTask, isMutating: isCreating } = useCreateTask();

	const form = useForm<CreateTaskInput>({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			title: "",
			status: "To Do",
			priority: "MEDIUM",
			category: "WORK",
			content: "",
			// Placeholder for deprecated fields required by schema
			header: "AUTO_GEN",
			type: "General",
		},
	});

	async function onSubmit(data: CreateTaskInput) {
		try {
			await createTask(data);
			setOpen(false);
			form.reset();
		} catch (e) {
			console.error("Submission error:", e);
		}
	}

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button
					className="gap-2 shadow-sm transition-all hover:shadow-md"
					size="sm"
				>
					<IconPlus className="h-4 w-4" /> Create
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader className="pb-2">
					<DialogTitle className="font-bold text-2xl text-slate-900 tracking-tight">
						New Task
					</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						{/* Title */}
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex items-center gap-2 font-semibold text-slate-700">
										<IconLetterT className="text-slate-400" size={18} /> Title
									</FormLabel>
									<FormControl>
										<Input
											className="h-10 border-slate-200 focus-visible:ring-slate-400"
											placeholder="e.g., Finalize Q1 Report"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							{/* Status */}
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-2 font-semibold text-slate-700">
											<IconActivity className="text-slate-400" size={18} />{" "}
											Status
										</FormLabel>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}
										>
											<FormControl>
												<SelectTrigger className="h-10 border-slate-200 bg-slate-50/50">
													<SelectValue placeholder="Status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{TASK_STATUS_ENUMS.map((s) => (
													<SelectItem key={s.key} value={s.key}>
														{s.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							{/* Priority */}
							<FormField
								control={form.control}
								name="priority"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-2 font-semibold text-slate-700">
											<IconFlag className="text-slate-400" size={18} /> Priority
										</FormLabel>
										<Select
											defaultValue={field.value ?? undefined}
											onValueChange={field.onChange}
										>
											<FormControl>
												<SelectTrigger className="h-10 border-slate-200 bg-slate-50/50">
													<SelectValue placeholder="Priority" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{TASK_PRIORITY_ENUMS.map((p) => (
													<SelectItem key={p.key} value={p.key}>
														{p.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
						</div>

						{/* Category */}
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex items-center gap-2 font-semibold text-slate-700">
										<IconTag className="text-slate-400" size={18} /> Category
									</FormLabel>
									<Select
										defaultValue={field.value ?? undefined}
										onValueChange={field.onChange}
									>
										<FormControl>
											<SelectTrigger className="h-10 border-slate-200 bg-slate-50/50">
												<SelectValue placeholder="Select Category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{TASK_CATEGORY_ENUMS.map((c) => (
												<SelectItem key={c.key} value={c.key}>
													{c.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>

						{/* Content / Description */}
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex items-center gap-2 font-semibold text-slate-700">
										<IconAlignLeft className="text-slate-400" size={18} />{" "}
										Content
									</FormLabel>
									<FormControl>
										<Textarea
											className="min-h-[100px] resize-none border-slate-200 focus-visible:ring-slate-400"
											placeholder="Add details about this task..."
											{...field}
											value={field.value ?? ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="pt-4">
							{/* Submit Button: Consistent with Trigger style */}
							<Button
								className="h-12 w-full bg-slate-900 font-extrabold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-[0.98]"
								disabled={isCreating}
								type="submit"
							>
								{isCreating ? (
									<IconLoader className="mr-2 h-5 w-5 animate-spin" />
								) : (
									<IconPlus className="mr-2 h-5 w-5" />
								)}
								Confirm Creation
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

// --- List View Component ---
export default function TaskTable({
	variant,
}: {
	variant?: "default" | "ghost";
}) {
	const columns = useMemo<ColumnDef<any>[]>(
		() => [
			{
				accessorKey: "title",
				id: "title",
				header: "Title",
				cell: ({ row }) => (
					<Link
						className="font-medium text-slate-900 hover:text-blue-600 hover:underline"
						href={`/console/tasks/${row.original.id}`}
					>
						{row.original.title}
					</Link>
				),
			},
			{
				accessorKey: "priority",
				id: "priority",
				header: "Priority",
				cell: ({ row }) => <CellPriority value={row.original.priority} />,
			},
			{
				accessorKey: "status",
				id: "status",
				header: "Status",
				cell: ({ row }) => <CellStatus value={row.original.status} />,
			},
			{
				accessorKey: "category",
				id: "category",
				header: "Category",
				cell: ({ row }) => <CellCategory value={row.original.category} />,
			},
			{
				id: "actions",
				header: "",
				cell: ({ row }) => (
					<div className="flex justify-end">
						<Link
							className="rounded-md px-2 py-1 font-black text-[10px] text-slate-400 uppercase tracking-wider hover:bg-slate-100 hover:text-slate-900"
							href={`/console/tasks/${row.original.id}`}
						>
							Detail
						</Link>
					</div>
				),
			},
		],
		[],
	);

	return (
		<CardTable
			columns={columns}
			header="Tasks"
			toolbar={<CreateTaskButton />}
			useDataHook={useTasks}
			variant={variant}
		/>
	);
}
