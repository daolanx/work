import { describe, expect, it } from "vitest";
import { AUTH_CONFIG, isPublicPath } from "@/lib/auth/paths";

describe("lib/auth/paths", () => {
	describe("AUTH_CONFIG", () => {
		it("exports expected auth paths", () => {
			expect(AUTH_CONFIG.loginPath).toBe("/auth/login");
			expect(AUTH_CONFIG.authPathPrefix).toBe("/auth/");
			expect(AUTH_CONFIG.defaultRedirectPath).toBe("/console");
		});
	});

	describe("isPublicPath", () => {
		it("returns true for exact public paths", () => {
			expect(isPublicPath("/")).toBe(true);
			expect(isPublicPath("/ai-chat")).toBe(true);
			expect(isPublicPath("/landing")).toBe(true);
		});

		it("returns true for auth prefix", () => {
			expect(isPublicPath("/auth/login")).toBe(true);
			expect(isPublicPath("/auth/register")).toBe(true);
		});

		it("returns true for /docs/ prefix", () => {
			expect(isPublicPath("/docs/intro")).toBe(true);
		});

		it("returns true for /legal prefix", () => {
			expect(isPublicPath("/legal/privacy")).toBe(true);
		});

		it("returns true for /api/auth/ prefix", () => {
			expect(isPublicPath("/api/auth/signin")).toBe(true);
		});

		it("returns false for protected paths", () => {
			expect(isPublicPath("/console")).toBe(false);
			expect(isPublicPath("/console/tasks")).toBe(false);
			expect(isPublicPath("/profile")).toBe(false);
		});
	});
});
