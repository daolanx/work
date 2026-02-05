"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { registerUser } from "@/app/auth/register/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type RegisterSchema, registerSchema } from "@/lib/action-schemas";
import { FormError } from "../ui/form-messages";
import PasswordInput from "./password-input";

/**
 * Props definition to fix the TypeScript 'IntrinsicAttributes' error
 */
interface RegisterFormProps {
	onLoading?: (loading: boolean) => void;
}

const RegisterForm = ({ onLoading }: RegisterFormProps) => {
	const [formState, setFormState] = React.useState<{
		success?: string;
		error?: string;
	}>({});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
		getValues,
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: { name: "", email: "", password: "" },
	});

	/**
	 * Sync internal form submission state with parent component's pending state
	 */
	useEffect(() => {
		onLoading?.(isSubmitting);
	}, [isSubmitting, onLoading]);

	const onSubmit = async (data: RegisterSchema) => {
		setFormState({}); // Clear previous states
		const result = await registerUser(data);

		if (result.success) {
			// Server-side registration success, user should check email now
			setFormState({ success: result.success.reason });
		} else if (result.error) {
			// Display error returned from Server Action
			setFormState({ error: result.error.reason });
		}
	};

	/**
	 * Success View: Rendered after registration succeeds to guide user to their inbox
	 */
	if (formState.success) {
		return (
			<div className="flex w-full flex-col items-center justify-center space-y-4 rounded-xl border bg-card p-6 text-center">
				<div className="rounded-full bg-primary/10 p-3 text-primary">
					<MailCheck className="h-10 w-10" />
				</div>
				<div className="space-y-2">
					<h2 className="font-semibold text-2xl tracking-tight">
						Check your email
					</h2>
					<p className="text-balance text-muted-foreground text-sm">
						We sent a verification link to{" "}
						<span className="font-medium text-foreground">
							{getValues("email")}
						</span>
						. Please click the link in the email to activate your account.
					</p>
				</div>
				<div className="flex w-full flex-col gap-2 pt-2">
					<Button asChild className="w-full">
						<Link href="/auth/login">Return to Sign In</Link>
					</Button>
				</div>
			</div>
		);
	}

	/**
	 * Form View: The default registration interface
	 */
	return (
		<div className="w-full">
			<FormError message={formState.error || ""} />

			<form
				className="mt-4 flex w-full flex-col gap-5"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-col gap-2">
					<Label htmlFor="name">Name</Label>
					<Input
						autoComplete="name"
						id="name"
						placeholder="Your name"
						type="text"
						{...register("name")}
						disabled={isSubmitting}
					/>
					{errors.name && (
						<span className="text-destructive text-xs">
							{errors.name.message}
						</span>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						autoComplete="email"
						id="email"
						placeholder="you@example.com"
						type="email"
						{...register("email")}
						disabled={isSubmitting}
					/>
					{errors.email && (
						<span className="text-destructive text-xs">
							{errors.email.message}
						</span>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="password">Password</Label>
					<Controller
						control={control}
						name="password"
						render={({ field }) => (
							<PasswordInput
								disabled={isSubmitting}
								id="password"
								onChange={field.onChange}
								value={field.value}
							/>
						)}
					/>
					{errors.password && (
						<span className="text-destructive text-xs">
							{errors.password.message}
						</span>
					)}
				</div>

				<Button
					className="mt-2 w-full cursor-pointer transition-all"
					disabled={isSubmitting}
					type="submit"
				>
					{isSubmitting ? "Creating account..." : "Create Account"}
				</Button>
			</form>
		</div>
	);
};

export default RegisterForm;
