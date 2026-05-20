"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/ui/form-messages";
import { Input } from "@/components/ui/input";
import {
	type ActionResult,
	type RegisterSchema,
	registerSchema,
} from "../schemas";
import { registerUser } from "../services";
import { PasswordInput } from "./password-input";

interface RegisterFormProps {
	onRegisteringStart?: () => void;
	onRegisteringEnd?: () => void;
}

const RegisterForm = ({
	onRegisteringStart,
	onRegisteringEnd,
}: RegisterFormProps) => {
	const [resSubmit, setResSubmit] = useState<ActionResult<{ email: string }>>(
		{},
	);

	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: { name: "", email: "", password: "" },
	});

	const { isSubmitting } = form.formState;

	const onSubmit = async (data: RegisterSchema) => {
		setResSubmit({});
		onRegisteringStart?.();
		try {
			const res = await registerUser(data);
			setResSubmit({
				success: res.success,
				message: res.message,
				...(res.success ? { data: { email: data.email } } : {}),
			});
		} catch (_err) {
			setResSubmit({
				success: false,
				message: "Something went wrong. Please try again.",
			});
		} finally {
			onRegisteringEnd?.();
		}
	};

	// Success view: Guides user to their inbox
	if (resSubmit.success) {
		return (
			<div className="fade-in zoom-in-95 flex w-full animate-in flex-col items-center justify-center space-y-6 bg-card p-8 text-center duration-300">
				<div className="rounded-full bg-primary/10 p-4 text-primary">
					<MailCheck className="h-12 w-12" />
				</div>
				<div className="space-y-2">
					<h2 className="font-bold text-2xl tracking-tight">
						Check your email
					</h2>
					<p className="text-muted-foreground">
						We sent a verification link to{" "}
						<span className="font-semibold text-foreground">
							{resSubmit.data?.email}
						</span>
					</p>
				</div>
				<Button asChild className="w-full">
					<Link href="/auth/login">Back to Sign In</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="w-full">
			{!resSubmit.success && <FormError message={resSubmit.message ?? ""} />}

			<Form {...form}>
				<form
					className="mt-4 flex flex-col gap-5"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					{/* Name Field */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										autoComplete="name"
										disabled={isSubmitting}
										placeholder="John Doe"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Email Field */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										autoComplete="email"
										disabled={isSubmitting}
										placeholder="you@example.com"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Password Field */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<PasswordInput
										{...field}
										disabled={isSubmitting}
										hideStrength={false}
										placeholder="Create a password" // Registration usually shows strength
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						className="mt-2 h-11 w-full cursor-pointer font-semibold transition-all"
						disabled={isSubmitting}
						type="submit"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Creating account...
							</>
						) : (
							"Get Started"
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default RegisterForm;
