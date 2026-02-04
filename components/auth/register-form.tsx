"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { registerUser } from "@/app/auth/register/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type RegisterSchema, registerSchema } from "@/lib/action-schemas";
import { AUTH_CONFIG } from "@/lib/auth/paths";
import { FormError, FormSuccess } from "../ui/form-messages";
import PasswordInput from "./password-input";

const RegisterForm = () => {
	const [formState, setFormState] = React.useState<{
		success?: string;
		error?: string;
	}>({});

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
	} = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: { name: "", email: "", password: "" },
	});

	const onSubmit = async (data: RegisterSchema) => {
		setFormState({});
		const result = await registerUser(data);
		if (result.success) {
			setFormState({ success: result.success.reason });
			router.push(AUTH_CONFIG.defaultRedirectPath);
		} else if (result.error) {
			setFormState({ error: result.error.reason });
		}
	};

	return (
		<form
			className="flex w-full flex-col gap-5"
			onSubmit={handleSubmit(onSubmit)}
		>
			<FormSuccess message={formState.success || ""} />
			<FormError message={formState.error || ""} />
			<div className="flex flex-col gap-2">
				<Label htmlFor="name">Name</Label>
				<Input
					autoComplete="name"
					id="name"
					placeholder="Your name"
					type="text"
					{...register("name")}
				/>
				{errors.name && (
					<span className="text-red-500 text-xs">{errors.name.message}</span>
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
				/>
				{errors.email && (
					<span className="text-red-500 text-xs">{errors.email.message}</span>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="password">Password</Label>
				<Controller
					control={control}
					name="password"
					render={({ field }) => (
						<PasswordInput
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
			<Button className="mt-2 w-full" disabled={isSubmitting} type="submit">
				{isSubmitting ? "Registering..." : "Register"}
			</Button>
		</form>
	);
};

export default RegisterForm;
