"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import "react-image-crop/dist/ReactCrop.css";
import { IconCheck, IconEdit, IconLoader2, IconX } from "@tabler/icons-react";

// UI Components
import { Button } from "@/components/ui/button";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { UpdateUserSchema } from "@/lib/auth/schemas";
// Business Logic
import { useUser } from "../_hooks/useUser";
import { AvatarUploader } from "./_components/avatar-uploader";

export default function AccountPage() {
	const { user, isLoading, updateUser, isMutating } = useUser();

	if (isLoading) return <AccountSkeleton />;

	return (
		<div className="flex max-w-5xl flex-col gap-8 px-4 py-8 lg:px-12">
			{/* Header */}
			<div className="space-y-1">
				<h2 className="font-bold text-3xl tracking-tight">Profile</h2>
				<p className="text-muted-foreground text-sm">
					Manage your public profile settings.
				</p>
			</div>

			<Separator className="my-2" />

			<div className="grid gap-12">
				{/* Section 1: Avatar */}
				<SectionLayout
					description="Your avatar is visible to everyone on the platform."
					title="Avatar"
				>
					<AvatarUploader
						fallbackName={user?.name}
						onSave={(url) => updateUser({ image: url, id: user.id })}
						src={user?.image}
					/>
				</SectionLayout>

				<Separator className="opacity-50" />

				{/* Section 2: Display Name */}
				<SectionLayout
					description="The name that will be displayed on your profile."
					title="Display Name"
				>
					<InlineEditField
						fieldName="name"
						initialValue={user?.name || ""}
						isPending={isMutating} // Injecting specific validation schema
						onSave={(val) => updateUser({ name: val, id: user.id })}
						schema={UpdateUserSchema.shape.name}
					/>
				</SectionLayout>
			</div>
		</div>
	);
}

interface SectionLayoutProps {
	title: string;
	description: string;
	children: React.ReactNode;
}

function SectionLayout({ title, description, children }: SectionLayoutProps) {
	return (
		<section className="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div className="space-y-1">
				<h3 className="font-semibold text-lg">{title}</h3>
				<p className="text-muted-foreground text-sm">{description}</p>
			</div>
			<div className="flex items-start md:col-span-2">{children}</div>
		</section>
	);
}

interface InlineEditFieldProps {
	initialValue: string;
	fieldName: string;
	schema: z.ZodType<any>;
	onSave: (value: string) => Promise<any>;
	isPending?: boolean;
	type?: string;
}

function InlineEditField({
	initialValue,
	fieldName,
	schema,
	onSave,
	isPending = false,
	type = "text",
}: InlineEditFieldProps) {
	const [isEditing, setIsEditing] = useState(false);

	const formSchema = z.object({ [fieldName]: schema });

	const form = useForm({
		resolver: zodResolver(formSchema),
		values: { [fieldName]: initialValue },
		mode: "onChange",
	});

	const handleSubmit = async (data: any) => {
		try {
			await onSave(data[fieldName]);
			setIsEditing(false);
		} catch (error) {
			console.error("Submission error:", error);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		form.reset();
	};

	if (isEditing) {
		return (
			<Form {...form}>
				<form
					className="flex w-full max-w-md items-start gap-2"
					onSubmit={form.handleSubmit(handleSubmit)}
				>
					<FormField
						control={form.control}
						name={fieldName}
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormControl>
									<Input
										{...field}
										autoFocus
										className="focus-visible:ring-1"
										disabled={isPending}
										type={type}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex items-center gap-1">
						<Button
							className="h-9 w-9 text-primary hover:bg-primary/10"
							disabled={isPending}
							size="icon"
							type="submit"
							variant="outline"
						>
							{isPending ? (
								<IconLoader2 className="h-4 w-4 animate-spin" />
							) : (
								<IconCheck className="h-4 w-4" />
							)}
						</Button>
						<Button
							className="h-9 w-9"
							disabled={isPending}
							onClick={handleCancel}
							size="icon"
							type="button"
							variant="ghost"
						>
							<IconX className="h-4 w-4" />
						</Button>
					</div>
				</form>
			</Form>
		);
	}

	return (
		<div className="group flex items-center gap-3 rounded-md py-1.5 pr-2 transition-colors hover:bg-slate-50/50">
			<span className="font-medium text-md text-slate-900">
				{initialValue || <span className="text-slate-400 italic">Not set</span>}
			</span>
			<div className="opacity-0 transition-opacity group-hover:opacity-100">
				<div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900">
					<IconEdit
						className="h-3.5 w-3.5"
						onClick={() => setIsEditing(true)}
					/>
				</div>
			</div>
		</div>
	);
}

function AccountSkeleton() {
	return (
		<div className="flex max-w-5xl flex-col gap-8 px-4 py-8 lg:px-12">
			<Skeleton className="h-10 w-48" />
			<Separator />
			<div className="space-y-12">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<Skeleton className="h-20 w-full" />
					<Skeleton className="h-24 w-24 rounded-full md:col-span-2" />
				</div>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<Skeleton className="h-20 w-full" />
					<Skeleton className="h-10 w-full max-w-md md:col-span-2" />
				</div>
			</div>
		</div>
	);
}
