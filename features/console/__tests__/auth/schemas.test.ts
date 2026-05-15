import { describe, expect, it } from "vitest";
import {
	loginSchema,
	PASSWORD_RULES,
	passwordSchema,
	registerSchema,
	resetPasswordSchema,
} from "@/features/console/auth/schemas";

describe("PASSWORD_RULES", () => {
	it("has 5 rules", () => {
		expect(PASSWORD_RULES).toHaveLength(5);
	});

	it("each rule has required fields", () => {
		for (const rule of PASSWORD_RULES) {
			expect(rule).toHaveProperty("id");
			expect(rule).toHaveProperty("regex");
			expect(rule).toHaveProperty("text");
			expect(rule.regex).toBeInstanceOf(RegExp);
		}
	});

	it("length rule validates minimum 8 characters", () => {
		const lengthRule = PASSWORD_RULES.find((r) => r.id === "length");
		expect(lengthRule).toBeDefined();
		expect(lengthRule?.validator?.("1234567")).toBe(false);
		expect(lengthRule?.validator?.("12345678")).toBe(true);
	});
});

describe("passwordSchema", () => {
	it("accepts a strong password", () => {
		const result = passwordSchema.safeParse("StrongP@ss1");
		expect(result.success).toBe(true);
	});

	it("rejects password without uppercase", () => {
		const result = passwordSchema.safeParse("lowercase1!");
		expect(result.success).toBe(false);
	});

	it("rejects password without lowercase", () => {
		const result = passwordSchema.safeParse("UPPERCASE1!");
		expect(result.success).toBe(false);
	});

	it("rejects password without number", () => {
		const result = passwordSchema.safeParse("NoNumberHere!");
		expect(result.success).toBe(false);
	});

	it("rejects password without special character", () => {
		const result = passwordSchema.safeParse("NoSpecial1a");
		expect(result.success).toBe(false);
	});

	it("rejects password shorter than 8 characters", () => {
		const result = passwordSchema.safeParse("Sh@1a");
		expect(result.success).toBe(false);
	});
});

describe("loginSchema", () => {
	it("accepts valid email and password", () => {
		const result = loginSchema.safeParse({
			email: "user@example.com",
			password: "StrongP@ss1",
		});
		expect(result.success).toBe(true);
	});

	it("rejects invalid email", () => {
		const result = loginSchema.safeParse({
			email: "not-an-email",
			password: "StrongP@ss1",
		});
		expect(result.success).toBe(false);
	});

	it("rejects missing email", () => {
		const result = loginSchema.safeParse({ password: "StrongP@ss1" });
		expect(result.success).toBe(false);
	});

	it("rejects missing password", () => {
		const result = loginSchema.safeParse({ email: "a@b.com" });
		expect(result.success).toBe(false);
	});
});

describe("registerSchema", () => {
	const validInput = {
		name: "John Doe",
		email: "john@example.com",
		password: "StrongP@ss1",
	};

	it("accepts valid registration input", () => {
		const result = registerSchema.safeParse(validInput);
		expect(result.success).toBe(true);
	});

	it("rejects name shorter than 2 characters", () => {
		const result = registerSchema.safeParse({ ...validInput, name: "J" });
		expect(result.success).toBe(false);
	});

	it("rejects name longer than 100 characters", () => {
		const result = registerSchema.safeParse({
			...validInput,
			name: "A".repeat(101),
		});
		expect(result.success).toBe(false);
	});

	it("accepts name with exactly 2 characters", () => {
		const result = registerSchema.safeParse({ ...validInput, name: "Jo" });
		expect(result.success).toBe(true);
	});

	it("rejects invalid email format", () => {
		const result = registerSchema.safeParse({
			...validInput,
			email: "bad",
		});
		expect(result.success).toBe(false);
	});
});

describe("resetPasswordSchema", () => {
	it("accepts matching passwords", () => {
		const result = resetPasswordSchema.safeParse({
			password: "StrongP@ss1",
			confirmPassword: "StrongP@ss1",
		});
		expect(result.success).toBe(true);
	});

	it("rejects mismatched passwords", () => {
		const result = resetPasswordSchema.safeParse({
			password: "StrongP@ss1",
			confirmPassword: "DifferentP@ss1",
		});
		expect(result.success).toBe(false);
	});

	it("rejects empty confirmPassword", () => {
		const result = resetPasswordSchema.safeParse({
			password: "StrongP@ss1",
			confirmPassword: "",
		});
		expect(result.success).toBe(false);
	});

	it("rejects weak password even if matching", () => {
		const result = resetPasswordSchema.safeParse({
			password: "weak",
			confirmPassword: "weak",
		});
		expect(result.success).toBe(false);
	});
});
