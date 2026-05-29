"use server";

import { APIError } from "better-auth/api";
import { AUTH_CONFIG } from "@/lib/auth-config";
import { auth } from "./lib/server";
import {
	type ActionResult,
	type LoginInput,
	loginSchema,
	type RegisterInput,
	registerSchema,
	requestPasswordSchema,
} from "./schemas";

const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_USER_EMAIL ?? "";
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD ?? "";

export async function loginUser(values?: LoginInput): Promise<ActionResult> {
	const validatedFields = loginSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			success: false,
			message: "Invalid input fields.",
		};
	}

	const { email, password } = validatedFields.data;

	try {
		await auth.api.signInEmail({
			body: {
				email,
				password,
				callbackURL: AUTH_CONFIG.defaultRedirectPath,
			},
		});

		return {
			success: true,
			message: "Welcome back! Redirecting...",
		};
	} catch (err) {
		if (err instanceof APIError) {
			return {
				message: err.message,
				success: false,
			};
		}

		console.error("Login Action Error:", err);
		return {
			message: "Internal server error. Please try again later.",
			success: false,
		};
	}
}

export async function loginDemoUser(): Promise<ActionResult> {
	return await loginUser({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
}

export async function registerUser(
	formData: RegisterInput,
): Promise<ActionResult> {
	const validatedFields = registerSchema.safeParse(formData);
	if (!validatedFields.success) {
		return {
			success: false,
			message: validatedFields.error.issues[0]?.message || "Invalid input",
		};
	}

	const { email, password, name } = validatedFields.data;

	try {
		await auth.api.signUpEmail({
			body: {
				email,
				password,
				name,
				callbackURL: AUTH_CONFIG.defaultRedirectPath,
			},
		});

		return {
			success: true,
			message:
				"Account created! Please check your email and click the verification link to activate your account.",
		};
	} catch (error: unknown) {
		if (error instanceof APIError) {
			return {
				message: error.message || "Email already exists or invalid data.",
				success: false,
			};
		}

		console.error("Registration Error:", error);
		return {
			message: "An unexpected error occurred.",
			success: false,
		};
	}
}

export async function requestPasswordReset(
	email: string,
): Promise<ActionResult> {
	const validatedFields = requestPasswordSchema.safeParse({ email });
	if (!validatedFields.success) {
		return {
			success: false,
			message: validatedFields.error.issues[0]?.message || "Invalid email",
		};
	}

	try {
		await auth.api.requestPasswordReset({
			body: {
				email,
				redirectTo: "/auth/reset-password",
			},
		});
	} catch (err) {
		console.error("Password Reset Error:", err);
	}

	return {
		success: true,
		message: "A recovery link has been sent to your email.",
	};
}
