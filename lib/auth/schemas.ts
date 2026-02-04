import { z } from "zod";

/**
 * Base password validation - reused across Register and Password Reset
 */
export const passwordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters")
	.regex(/[A-Z]/, "Must contain at least one uppercase letter")
	.regex(/[a-z]/, "Must contain at least one lowercase letter")
	.regex(/[0-9]/, "Must contain at least one number")
	.regex(/[^A-Za-z0-9]/, "Must contain at least one symbol");

/**
 * Login Schema - loose validation (don't reveal password requirements here)
 */
export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

/**
 * Registration Schema - strict validation
 */
export const registerSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").max(100),
	email: z.string().email("Invalid email address"),
	password: passwordSchema,
});

export const UpdateUserSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").optional(),
	email: z.string().email("Invalid email format").optional(),
});

// Types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export type ActionResult<T = unknown> = {
	success: { reason: string } | null;
	error: { reason: string } | null;
	data?: T;
};
