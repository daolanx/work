import { z } from "zod";

export type ActionResult<T = unknown> = {
	success: { reason: string } | null;
	error: { reason: string } | null;
	data?: T;
};

const passwordSchema = z
	.string()
	.min(8, { message: "Password must be at least 8 characters" })
	.regex(/[0-9]/, { message: "Password must contain at least one number" })
	.regex(/[a-z]/, {
		message: "Password must contain at least one lowercase letter",
	})
	.regex(/[A-Z]/, {
		message: "Password must contain at least one uppercase letter",
	});

export const registerSchema = z.object({
	email: z.string(),
	password: passwordSchema,
	name: z.string().min(2).max(100),
});

export const resetPasswordSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type RegisterSchema = z.infer<typeof registerSchema>;
