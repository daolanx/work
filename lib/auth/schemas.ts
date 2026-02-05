import { z } from "zod";

/**
 * Base password validation - reused across Register and Password Reset
 */

export const PASSWORD_RULES = [
	{
		id: "length",
		regex: /.{8,}/,
		text: "At least 8 characters",
		validator: (val: string) => val.length >= 8,
	},
	{ id: "number", regex: /[0-9]/, text: "At least 1 number" },
	{ id: "lowercase", regex: /[a-z]/, text: "At least 1 lowercase letter" },
	{ id: "uppercase", regex: /[A-Z]/, text: "At least 1 uppercase letter" },
	{ id: "special", regex: /[^A-Za-z0-9]/, text: "At least 1 symbol" },
] as const;

export const passwordSchema = PASSWORD_RULES.reduce(
	(schema, rule) => schema.regex(rule.regex, { message: rule.text }),
	z.string(),
);

/**
 * Login Schema - loose validation (don't reveal password requirements here)
 */
export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: passwordSchema,
});

/**
 * Registration Schema - strict validation
 */
export const registerSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").max(100),
	email: z.string().email("Invalid email address"),
	password: passwordSchema,
});

// Reset Password (with confirmation check)
export const resetPasswordSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const UpdateUserSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").optional(),
	email: z.string().email("Invalid email format").optional(),
	id: z.string()
});

// Types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;


export type ActionResult<T = unknown> = {
	success: { reason: string } | null;
	error: { reason: string } | null;
	data?: T;
};
