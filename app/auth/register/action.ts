"use server";

import { APIError } from "better-auth/api";
import { AUTH_CONFIG } from "@/lib/auth/paths";
import {
	type ActionResult,
	type RegisterInput,
	registerSchema,
} from "@/lib/auth/schemas";
import { auth } from "@/lib/auth/server";

/**
 * Server Action to handle user registration
 */
export async function registerUser(
	formData: RegisterInput,
): Promise<ActionResult> {
	// 1. Server-side validation
	const parsed = registerSchema.safeParse(formData);
	if (!parsed.success) {
		return {
			success: null,
			error: { reason: parsed.error.issues[0]?.message || "Invalid input" },
		};
	}

	const { email, password, name } = parsed.data;

	try {
		// 2. Create the user
		// We don't use asResponse: true here to keep the better-auth internal handling clean
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
	} catch (error: any) {
		console.log("err", error);
		// 3. Handle Specific Better-Auth API Errors
		const status = error.status || error.statusCode;
		if (status === "UNPROCESSABLE_ENTITY" || status === 422) {
			// Better-auth usually puts the specific reason in the body
			const message =
				error.body?.message || "Email already exists or invalid data.";

			return {
				error: { reason: message },
				success: null,
			};
		}

		// Fallback for other API Errors
		if (error instanceof APIError) {
			return {
				error: { reason: error.message },
				success: null,
			};
		}

		// 4. Critical Error Logging
		console.error("Registration Error:", error);
		return {
			error: { reason: "An unexpected error occurred." },
			success: null,
		};
	}
}
