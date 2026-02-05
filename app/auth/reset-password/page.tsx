"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormError, FormSuccess } from "@/components/ui/form-messages";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";

const schema = z
	.object({
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" })
			.regex(/[0-9]/, { message: "Password must contain at least one number" })
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter",
			})
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			}),
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type FormData = z.infer<typeof schema>;

function ResetPasswordForm({
	onLoading,
}: {
	onLoading: (loading: boolean) => void;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [formState, setFormState] = useState<{
		success?: string;
		error?: string;
	}>({});

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: { password: "", confirmPassword: "" },
	});

	useEffect(() => {
		onLoading(isSubmitting);
	}, [isSubmitting, onLoading]);

	const onSubmit = async (data: FormData) => {
		setFormState({});
		if (!token) {
			setFormState({ error: "Invalid or expired reset token." });
			return;
		}

		await authClient.resetPassword(
			{
				newPassword: data.password,
				token,
			},
			{
				onSuccess: () => {
					setFormState({ success: "Password updated successfully." });
					setTimeout(() => router.push("/auth/login"), 2000);
				},
				onError: (ctx) => {
					setFormState({ error: ctx.error.message });
				},
			},
		);
	};

	return (
		<form
			className="flex w-full flex-col gap-6"
			onSubmit={handleSubmit(onSubmit)}
		>
			<FormSuccess message={formState.success || ""} />
			<FormError message={formState.error || ""} />

			{!formState.success ? (
				<>
					<div className="flex flex-col gap-2.5">
						<Label htmlFor="password">New Password</Label>
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
							<span className="text-red-500 text-xs">
								{errors.password.message}
							</span>
						)}
					</div>

					<div className="flex flex-col gap-2.5">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Controller
							control={control}
							name="confirmPassword"
							render={({ field }) => (
								<PasswordInput
									disabled={isSubmitting}
									hideStrength={true}
									id="confirmPassword"
									onChange={field.onChange}
									placeholder="Repeat new password"
									value={field.value}
								/>
							)}
						/>
						{errors.confirmPassword && (
							<span className="text-red-500 text-xs">
								{errors.confirmPassword.message}
							</span>
						)}
					</div>

					<Button
						className="mt-2 h-12 w-full font-semibold text-base"
						disabled={isSubmitting}
						type="submit"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-5 w-5 animate-spin" />
								Updating...
							</>
						) : (
							"Save New Password"
						)}
					</Button>
				</>
			) : (
				<div className="flex flex-col items-center gap-5 py-6">
					<CheckCircle2 className="text-primary" size={48} strokeWidth={1.5} />
					<p className="animate-pulse text-center text-muted-foreground text-sm">
						Redirecting to login...
					</p>
				</div>
			)}
		</form>
	);
}

export default function ResetPasswordPage() {
	const [isPending, setIsPending] = useState(false);

	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-background p-4 md:p-8">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className={`w-full transition-all duration-300 sm:max-w-md lg:max-w-lg ${isPending ? "pointer-events-none opacity-70" : ""}`}
				initial={{ opacity: 0, y: 10 }}
			>
				<div className="mb-10 flex flex-col items-center gap-3 text-center">
					<h1 className="font-black text-4xl uppercase italic tracking-tighter">
						Reset Password
					</h1>
					<p className="text-muted-foreground">
						Choose a strong password to protect your account.
					</p>
				</div>

				<Card className="relative overflow-hidden border-muted/40 bg-card/95 shadow-2xl backdrop-blur-xl">
					{isPending && (
						<div className="absolute top-0 right-0 left-0 h-[3px] animate-pulse bg-primary" />
					)}

					<CardContent className="px-6 pt-12 pb-10 md:px-12">
						<Suspense
							fallback={
								<div className="flex justify-center py-12">
									<Loader2
										className="animate-spin text-muted-foreground/20"
										size={32}
									/>
								</div>
							}
						>
							<ResetPasswordForm onLoading={setIsPending} />
						</Suspense>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
