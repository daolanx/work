"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUTH_CONFIG } from "@/lib/auth/paths";
import { loginUser } from "../../app/auth/login/action";
import { FormError, FormSuccess } from "../ui/form-messages";

const schema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(1, { message: "Password is required" }),
});

type FormData = z.infer<typeof schema>;

interface LoginFormProps {
	onLoading?: (loading: boolean) => void;
}

const LoginForm = ({ onLoading }: LoginFormProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: { email: "", password: "" },
	});

	const [isVisible, setIsVisible] = useState(false);
	const [formState, setFormState] = useState<{
		success?: string;
		error?: string;
	}>({});

	const id = useId();
	const router = useRouter();

	useEffect(() => {
		onLoading?.(isSubmitting);
	}, [isSubmitting, onLoading]);

	const toggleVisibility = () => setIsVisible((prev) => !prev);

	const onSubmit = async (data: FormData) => {
		setFormState({});
		try {
			const result = await loginUser(data);
			if (result.success) {
				setFormState({ success: result.success.reason });
				router.push(AUTH_CONFIG.defaultRedirectPath);
			} else if (result.error) {
				setFormState({ error: result.error.reason });
			}
		} catch (err) {
			setFormState({ error: "An unexpected error occurred." });
		}
	};

	const handleDemoLogin = async () => {
		const email = process.env.NEXT_PUBLIC_DEMO_USER_EMAIL ?? "";
		const password = process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD ?? "";
		setValue("email", email, { shouldValidate: true });
		setValue("password", password, { shouldValidate: true });
		await handleSubmit(onSubmit)();
	};

	return (
		<form
			className="flex w-full flex-col gap-5"
			onSubmit={handleSubmit(onSubmit)}
		>
			<FormSuccess message={formState.success || ""} />
			<FormError message={formState.error || ""} />

			{/* Email & Password Fields */}
			<div className="flex flex-col gap-2">
				<Label className={isSubmitting ? "opacity-50" : ""} htmlFor="email">
					Email
				</Label>
				<Input
					disabled={isSubmitting}
					id="email"
					placeholder="you@example.com"
					type="email"
					{...register("email")}
				/>
				{errors.email && (
					<span className="text-red-500 text-xs">{errors.email.message}</span>
				)}
			</div>

			<div className="flex flex-col gap-2">
				<Label className={isSubmitting ? "opacity-50" : ""} htmlFor={id}>
					Password
				</Label>
				<div className="relative">
					<Input
						className="pe-9"
						disabled={isSubmitting}
						id={id}
						placeholder="Password"
						type={isVisible ? "text" : "password"}
						{...register("password")}
					/>
					<button
						className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground disabled:opacity-50"
						disabled={isSubmitting}
						onClick={toggleVisibility}
						type="button"
					>
						{isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
					</button>
				</div>
				{errors.password && (
					<span className="text-red-500 text-xs">
						{errors.password.message}
					</span>
				)}
			</div>

			<div className="mt-4 flex flex-col gap-3">
				{/* Primary Login Button */}
				<Button className="h-11 w-full" disabled={isSubmitting} type="submit">
					{isSubmitting ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Logging in...
						</>
					) : (
						"Sign In"
					)}
				</Button>

				{/* --- ENHANCED DEMO ACCESS BUTTON --- */}
				<div className="group relative">
					{/* Animated Background Glow */}
					<div className="absolute -inset-0.5 animate-tilt rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-30 blur transition duration-1000 group-hover:opacity-60 group-hover:duration-200"></div>

					<Button
						className="group relative h-11 w-full overflow-hidden border-none bg-background transition-all duration-300 hover:bg-background/90"
						disabled={isSubmitting}
						onClick={handleDemoLogin}
						type="button"
						variant="outline"
					>
						{/* Shimmer Effect */}
						<span className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent group-hover:animate-[shimmer_2s_infinite]" />

						<div className="flex items-center justify-center gap-2 font-bold tracking-wide">
							{isSubmitting ? (
								"Please wait..."
							) : (
								<>
									<Sparkles
										className="animate-pulse text-purple-500"
										size={16}
									/>
									<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
										Quick Demo Access
									</span>
									<Sparkles className="animate-pulse text-blue-500" size={16} />
								</>
							)}
						</div>
					</Button>
				</div>
			</div>
		</form>
	);
};

export default LoginForm;
