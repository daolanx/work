"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { FormError, FormSuccess } from "@/components/ui/form-messages";
import { authClient } from "@/lib/auth/client";
import {
	type ResetPasswordInput,
	resetPasswordSchema,
} from "@/lib/auth/schemas";

export function ResetPasswordForm({
	onLoading = () => {},
}: {
	onLoading?: (loading: boolean) => void;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [serverState, setServerState] = useState<{
		success?: string;
		error?: string;
	}>({});

	const form = useForm<ResetPasswordInput>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: { password: "", confirmPassword: "" },
	});

	const { isSubmitting } = form.formState;

	// Sync loading state with parent
	useEffect(() => {
		onLoading?.(isSubmitting);
	}, [isSubmitting, onLoading]);

	// 1. Token Validation View
	if (!token) {
		return (
			<div className="fade-in flex animate-in flex-col items-center gap-6 py-4 duration-500">
				<div className="rounded-full bg-destructive/10 p-4 text-destructive">
					<AlertCircle size={40} />
				</div>
				<div className="space-y-2 text-center">
					<h3 className="font-bold text-foreground text-xl">Missing Token</h3>
					<p className="mx-auto max-w-[280px] text-muted-foreground text-sm">
						The reset link is invalid or has expired. Please request a new one.
					</p>
				</div>
				<Button asChild className="w-full">
					<Link href="/auth/login">Back to Sign In</Link>
				</Button>
			</div>
		);
	}

	const onSubmit = async (data: ResetPasswordInput) => {
		setServerState({});
		try {
			await authClient.resetPassword(
				{
					newPassword: data.password,
					token,
				},
				{
					onSuccess: () => {
						setServerState({ success: "Your password has been updated." });
						setTimeout(() => router.push("/auth/login"), 2500);
					},
					onError: (ctx) => {
						setServerState({ error: ctx.error.message });
					},
				},
			);
		} catch (err) {
			setServerState({ error: "An unexpected error occurred." });
		}
	};

	return (
		<Form {...form}>
			<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
				<FormSuccess message={serverState.success || ""} />
				<FormError message={serverState.error || ""} />

				{!serverState.success ? (
					<>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
									<FormControl>
										<PasswordInput {...field} disabled={isSubmitting} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<PasswordInput
											{...field}
											disabled={isSubmitting}
											hideStrength
											placeholder="Repeat new password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							className="h-12 w-full font-bold uppercase tracking-wide"
							disabled={isSubmitting}
							type="submit"
						>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-5 w-5 animate-spin" />
									Updating...
								</>
							) : (
								"Update Password"
							)}
						</Button>
					</>
				) : (
					<div className="fade-in slide-in-from-bottom-2 flex animate-in flex-col items-center gap-4 py-4 duration-500">
						<div className="rounded-full bg-emerald-500/10 p-4">
							<CheckCircle2
								className="text-emerald-500"
								size={48}
								strokeWidth={1.5}
							/>
						</div>
						<div className="text-center">
							<p className="font-bold text-lg">Success!</p>
							<p className="text-muted-foreground text-sm">
								Redirecting to login shortly...
							</p>
						</div>
					</div>
				)}
			</form>
		</Form>
	);
}
