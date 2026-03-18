"use server";

import { APIError } from "better-auth/api";
import { AUTH_CONFIG } from "@/lib/auth/paths";
import {
	type ActionResult,
	type LoginInput,
	loginSchema,
} from "@/lib/auth/schemas";
import { auth } from "@/lib/auth/server";

/**
 * Server Action to handle user login via Better-Auth
 */
export async function loginUser(values: LoginInput): Promise<ActionResult> {
	// 1. Validate the input on the server side (Security first)
	const validatedFields = loginSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: { reason: "Invalid input fields." },
			success: null,
		};
	}

	const { email, password } = validatedFields.data;

	try {
		// 2. Attempt sign in
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
		// 3. Handle specific Better-Auth errors
		if (err instanceof APIError) {
			// Common Better-Auth error messages: "INVALID_EMAIL_OR_PASSWORD", etc.
			return {
				error: { reason: err.message },
				success: null,
			};
		}

		// 4. Fallback for unexpected errors (e.g., Database connection issues)
		console.error("Login Action Error:", err);
		return {
			error: { reason: "Internal server error. Please try again later." },
			success: null,
		};
	}
}
