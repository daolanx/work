"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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
import { LOGIN_TYPE, type LoginType } from "../constants";
import { type ActionResult, type LoginInput, loginSchema } from "../schemas";
import { loginDemoUser, loginUser } from "../services";
import { PasswordInput } from "./password-input";

// ── Login form ───────────────────────────────────────────────
interface LoginFormProps {
	onLoginingStart?: () => void;
	onLoginingEnd?: () => void;
}

const LoginForm = ({ onLoginingStart, onLoginingEnd }: LoginFormProps) => {
	const router = useRouter();
	const t = useTranslations("console");
	const [loginType, setLoginType] = useState<LoginType | null>(null);
	const isLogging = loginType !== null;
	const [errorMessage, setErrorMessage] = useState("");

	const form = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const login = async (
		execLogin: (data?: LoginInput) => Promise<ActionResult>,
		type: LoginType,
		data?: LoginInput,
	) => {
		setErrorMessage("");
		setLoginType(type);
		onLoginingStart?.();

		try {
			const result = await execLogin(data);
			if (result.success) {
				router.push("/console");
				return;
			}
			setErrorMessage(result.message || t("auth.login-failed"));
		} catch (err) {
			setErrorMessage(
				err instanceof Error ? err.message : t("auth.unexpected-error"),
			);
		} finally {
			setLoginType(null);
			onLoginingEnd?.();
		}
	};

	const onSubmit = async (data: LoginInput) => {
		await login(loginUser, LOGIN_TYPE.normal, data);
	};

	const onSubmitWithDemoAccount = async () => {
		await login(loginDemoUser, LOGIN_TYPE.demo);
	};

	return (
		<Form {...form}>
			<form className="w-full space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
				<FormError message={errorMessage} />

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("auth.email")}</FormLabel>
							<FormControl>
								<Input
									disabled={isLogging}
									placeholder="you@example.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("auth.password")}</FormLabel>
							<FormControl>
								<PasswordInput
									{...field}
									disabled={isLogging}
									hideStrength={false}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="mt-4 flex flex-col gap-3">
					<Button
						className="h-11 w-full cursor-pointer"
						disabled={isLogging}
						type="submit"
					>
						{isLogging && loginType === LOGIN_TYPE.normal ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								{t("auth.logging-in")}
							</>
						) : (
							t("auth.sign-in")
						)}
					</Button>

					<div className="group relative">
						<div className="absolute -inset-0.5 animate-tilt rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-30 blur transition duration-1000 group-hover:opacity-60 group-hover:duration-200" />
						<Button
							className="group relative h-11 w-full cursor-pointer overflow-hidden border-none bg-background transition-all duration-300 hover:bg-background/90"
							disabled={isLogging}
							onClick={onSubmitWithDemoAccount}
							type="button"
							variant="outline"
						>
							<span className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
							<div className="flex items-center justify-center gap-2 font-bold tracking-wide">
								{isLogging && loginType === LOGIN_TYPE.demo ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin text-purple-600" />
										{t("auth.please-wait")}
									</>
								) : (
									<>
										<Sparkles
											className="animate-pulse text-purple-500"
											size={16}
										/>
										<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
											{t("auth.quick-demo")}
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
