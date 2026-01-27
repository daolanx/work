"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	IconCircleCheckFilled,
	IconDots,
	IconEye,
	IconLoader,
	IconPlus,
	IconTrash,
} from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { type CreateTaskInput, createTaskSchema } from "@/lib/validations/task";
import { useCreateTask, useTasks } from "../_hooks/useTasks";
import { CardTable } from "./card-table";

// --- Create Task Modal Component ---
function CreateTaskDialog() {
	const [open, setOpen] = useState(false);
	const { createTask, isCreating } = useCreateTask();

	const form = useForm<CreateTaskInput>({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			header: "",
			type: "General",
			status: "To Do",
			target: 0,
			limit: 100,
			reviewer: "",
		},
	});

	async function onSubmit(data: CreateTaskInput) {
		try {
			await createTask(data);
			setOpen(false);
			form.reset();
		} catch (e) {
			// Error handled by toast in hook
		}
	}

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button size="sm">
					<IconPlus className="h-4 w-4" /> Create
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create New Task</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="header"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Header</FormLabel>
									<FormControl>
										<Input placeholder="Task title..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="General">General</SelectItem>
												<SelectItem value="Urgent">Urgent</SelectItem>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="To Do">To Do</SelectItem>
												<SelectItem value="In Process">In Process</SelectItem>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="reviewer"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Reviewer</FormLabel>
									<FormControl>
										<Input {...field} value={field.value ?? ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="pt-4">
							<Button disabled={isCreating} type="submit">
								{isCreating && (
									<IconLoader className="mr-2 h-4 w-4 animate-spin" />
								)}
								Confirm Create
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

// --- Main Page ---
export default function TaskPage() {
	const columns = useMemo<ColumnDef<any>[]>(
		() => [
			{
				accessorKey: "header",
				id: "header",
				header: "Header",
				cell: ({ row }) => {
					return (
						<Link
							className="underline-offset-4 transition-colors hover:text-primary hover:underline"
							href={`/console/tasks/${row.original.id}`}
						>
							{row.original.header}
						</Link>
					);
				},
			},
			{
				accessorKey: "type",
				id: "type",
				header: "Type",
				cell: ({ row }) => <Badge variant="outline">{row.original.type}</Badge>,
			},
			{
				accessorKey: "status",
				id: "status",
				header: "Status",
				cell: ({ row }) => (
					<Badge
						className="font-normal text-muted-foreground"
						variant="outline"
					>
						{row.original.status === "Done" ? (
							<IconCircleCheckFilled className="mr-1 size-4 fill-green-500" />
						) : (
							<IconLoader className="mr-1 size-4 animate-spin" />
						)}
						{row.original.status}
					</Badge>
				),
			},
			{
				accessorKey: "target",
				id: "target",
				header: () => <div className="text-right">Target</div>,
				cell: ({ row }) => (
					<div className="text-right tabular-nums">
						{row.original.target ?? "-"}
					</div>
				),
			},
			{ accessorKey: "reviewer", id: "reviewer", header: "Reviewer" },
			{
				id: "actions",
				header: "Actions",
				enableHiding: false,
				cell: ({ row }) => (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="h-8 w-8 p-0" variant="ghost">
								<IconDots className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem asChild>
								<Link href={`/console/tasks/${row.original.id}`}>
									<IconEye />
									Detail
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="text-destructive">
								<IconTrash /> Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				),
			},
		],
		[],
	);

	return (
		<CardTable
			columns={columns}
			header="Tasks"
			toolbar={<CreateTaskDialog />}
			useDataHook={useTasks} // Using the new component here
		/>
	);
}
