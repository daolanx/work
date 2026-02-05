"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "@/components/auth/password-input";
import { type LoginInput, loginSchema } from "@/lib/auth/schemas";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AUTH_CONFIG } from "@/lib/auth/paths";
import { loginUser } from "../../app/auth/login/action";
import { FormError } from "../ui/form-messages";

const LOGIN_TYPES = {
	NORMAL: "NORMAL",
	DEMO: "DEMO",
} as const;

type LoginType = keyof typeof LOGIN_TYPES;

interface LoginFormProps {
	onLoading?: (loading: boolean) => void;
}

const LoginForm = ({ onLoading }: LoginFormProps) => {
	const [loginType, setLoginType] = useState<LoginType | null>(null);
	const [serverError, setServerError] = useState<string | null>(null);

	const router = useRouter();

	const form = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { isSubmitting } = form.formState;

	useEffect(() => {
		onLoading?.(isSubmitting);
		if (!isSubmitting) setLoginType(null);
	}, [isSubmitting, onLoading]);

	const onSubmit = async (data: LoginInput) => {
		setServerError(null);
		setLoginType(LOGIN_TYPES.NORMAL);

		try {
			const result = await loginUser(data);
			if (result.success) {
				router.push(AUTH_CONFIG.defaultRedirectPath);
			} else if (result.error) {
				setServerError(result.error.reason);
			}
		} catch (err) {
			setServerError("An unexpected error occurred.");
		}
	};

	const handleDemoLogin = async () => {
		setLoginType(LOGIN_TYPES.DEMO);
		const email = process.env.NEXT_PUBLIC_DEMO_USER_EMAIL ?? "";
		const password = process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD ?? "";

		form.setValue("email", email, { shouldValidate: true });
		form.setValue("password", password, { shouldValidate: true });

		// Manually trigger submission
		await form.handleSubmit(onSubmit)();
	};

	return (
		<Form {...form}>
			<form className="w-full space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
				<FormError message={serverError || ""} />

				{/* Email Field */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									disabled={isSubmitting}
									placeholder="you@example.com"
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
									hideStrength={false} // Set to true for a cleaner login, false for registration
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="mt-4 flex flex-col gap-3">
					{/* Sign In Button */}
					<Button
						className="h-11 w-full cursor-pointer"
						disabled={isSubmitting}
						type="submit"
					>
						{isSubmitting && loginType === LOGIN_TYPES.NORMAL ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Logging in...
							</>
						) : (
							"Sign In"
						)}
					</Button>

					{/* Demo Button with Shimmer and Tilt effects */}
					<div className="group relative">
						<div className="absolute -inset-0.5 animate-tilt rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-30 blur transition duration-1000 group-hover:opacity-60 group-hover:duration-200" />
						<Button
							className="group relative h-11 w-full cursor-pointer overflow-hidden border-none bg-background transition-all duration-300 hover:bg-background/90"
							disabled={isSubmitting}
							onClick={handleDemoLogin}
							type="button"
							variant="outline"
						>
							<span className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent group-hover:animate-[shimmer_2s_infinite]" />

							<div className="flex items-center justify-center gap-2 font-bold tracking-wide">
								{isSubmitting && loginType === LOGIN_TYPES.DEMO ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin text-purple-600" />
										Please wait...
									</>
								) : (
									<>
										<Sparkles
											className="animate-pulse text-purple-500"
											size={16}
										/>
										<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
											Quick Demo Access
										</span>
										<Sparkles
											className="animate-pulse text-blue-500"
											size={16}
										/>
									</>
								)}
							</div>
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default LoginForm;
