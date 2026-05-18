"use server";

import { APIError } from "better-auth/api";
import { AUTH_CONFIG } from "@/features/console/constants";
import { auth } from "./lib/server";
import {
	type ActionResult,
	type LoginInput,
	loginSchema,
	type RegisterInput,
	registerSchema,
} from "./schemas";

export async function loginUser(values: LoginInput): Promise<ActionResult> {
	const validatedFields = loginSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: { reason: "Invalid input fields." },
			success: null,
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
			success: { reason: "Welcome back! Redirecting..." },
			error: null,
		};
	} catch (err) {
		if (err instanceof APIError) {
			return {
				error: { reason: err.message },
				success: null,
			};
		}

		console.error("Login Action Error:", err);
		return {
			error: { reason: "Internal server error. Please try again later." },
			success: null,
		};
	}
}

export async function registerUser(
	formData: RegisterInput,
): Promise<ActionResult> {
	const parsed = registerSchema.safeParse(formData);
	if (!parsed.success) {
		return {
			success: null,
			error: { reason: parsed.error.issues[0]?.message || "Invalid input" },
		};
	}

	const { email, password, name } = parsed.data;

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
			success: {
				reason:
					"Account created! Please check your email and click the verification link to activate your account.",
			},
			error: null,
		};
	} catch (error: unknown) {
		const err = error as {
			status?: string | number;
			statusCode?: string | number;
			body?: { message?: string };
		};
		const status = err.status || err.statusCode;
		if (status === "UNPROCESSABLE_ENTITY" || status === 422) {
			const message =
				err.body?.message || "Email already exists or invalid data.";

			return {
				error: { reason: message },
				success: null,
			};
		}

		if (error instanceof APIError) {
			return {
				error: { reason: error.message },
				success: null,
			};
		}

		console.error("Registration Error:", error);
		return {
			error: { reason: "An unexpected error occurred." },
			success: null,
		};
	}
}

export async function requestPasswordReset(
	email: string,
): Promise<ActionResult> {
	if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return {
			success: null,
			error: { reason: "Please enter a valid email address." },
		};
	}

	try {
		await auth.api.requestPasswordReset({
			body: {
				email,
				redirectTo: "/auth/reset-password",
			},
		});

		return {
			success: { reason: "A recovery link has been sent to your inbox." },
			error: null,
		};
	} catch (err) {
		if (err instanceof APIError) {
			return {
				error: { reason: err.message },
				success: null,
			};
		}

		console.error("Password Reset Error:", err);
		return {
			error: { reason: "Internal server error. Please try again later." },
			success: null,
		};
	}
}
