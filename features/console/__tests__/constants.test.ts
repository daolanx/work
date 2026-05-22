import { describe, expect, it } from "vitest";
import {
	AUTH_CONFIG,
	isPublicPath,
	NAVIGATION_CONFIG,
} from "@/features/console/constants";

describe("AUTH_CONFIG", () => {
	it("has correct login path", () => {
		expect(AUTH_CONFIG.loginPath).toBe("/auth/login");
	});

	it("has correct auth prefix", () => {
		expect(AUTH_CONFIG.authPathPrefix).toBe("/auth/");
	});

	it("has correct default redirect", () => {
		expect(AUTH_CONFIG.defaultRedirectPath).toBe("/console");
	});
});

describe("isPublicPath", () => {
	it("returns true for exact public paths", () => {
		expect(isPublicPath("/")).toBe(true);
		expect(isPublicPath("/ai-chat")).toBe(true);
		expect(isPublicPath("/landing")).toBe(true);
		expect(isPublicPath("/flower-shop")).toBe(true);
	});

	it("returns true for auth-related paths", () => {
		expect(isPublicPath("/auth/login")).toBe(true);
		expect(isPublicPath("/auth/register")).toBe(true);
		expect(isPublicPath("/auth/reset-password")).toBe(true);
	});

	it("returns true for docs paths", () => {
		expect(isPublicPath("/docs/getting-started")).toBe(true);
	});

	it("returns true for legal paths", () => {
		expect(isPublicPath("/legal/privacy")).toBe(true);
		expect(isPublicPath("/legal/terms")).toBe(true);
	});

	it("returns true for API auth paths", () => {
		expect(isPublicPath("/api/auth/signin")).toBe(true);
		expect(isPublicPath("/api/auth/callback")).toBe(true);
	});

	it("returns true for AI chat API", () => {
		expect(isPublicPath("/api/ai-chat")).toBe(true);
		expect(isPublicPath("/api/ai-chat/stream")).toBe(true);
	});

	it("returns false for protected paths", () => {
		expect(isPublicPath("/console")).toBe(false);
		expect(isPublicPath("/console/tasks")).toBe(false);
		expect(isPublicPath("/console/admin")).toBe(false);
		expect(isPublicPath("/settings")).toBe(false);
	});

	it("returns false for random paths", () => {
		expect(isPublicPath("/some-random-page")).toBe(false);
	});

	it("does not match partial prefixes", () => {
		expect(isPublicPath("/authentication")).toBe(false);
		expect(isPublicPath("/documentation")).toBe(false);
	});
});

describe("NAVIGATION_CONFIG", () => {
	it("is an array of nav groups", () => {
		expect(Array.isArray(NAVIGATION_CONFIG)).toBe(true);
		expect(NAVIGATION_CONFIG.length).toBeGreaterThan(0);
	});

	it("has Platform group with expected items", () => {
		const platform = NAVIGATION_CONFIG.find((g) => g.label === "nav.platform");
		expect(platform).toBeDefined();
		expect(platform?.items.length).toBeGreaterThanOrEqual(2);
	});

	it("has Console nav item", () => {
		const platform = NAVIGATION_CONFIG.find((g) => g.label === "nav.platform");
		const consoleItem = platform?.items.find((i) => i.label === "nav.console");
		expect(consoleItem).toBeDefined();
		expect(consoleItem?.url).toBe("/console");
	});

	it("has Tasks nav item", () => {
		const platform = NAVIGATION_CONFIG.find((g) => g.label === "nav.platform");
		const tasksItem = platform?.items.find((i) => i.label === "nav.tasks");
		expect(tasksItem).toBeDefined();
		expect(tasksItem?.url).toBe("/console/tasks");
	});

	it("has Admin group with User Management", () => {
		const admin = NAVIGATION_CONFIG.find((g) => g.label === "nav.admin");
		expect(admin).toBeDefined();
		const userMgmt = admin?.items.find(
			(i) => i.label === "nav.user-management",
		);
		expect(userMgmt).toBeDefined();
		expect(userMgmt?.url).toBe("/console/admin");
		expect(userMgmt?.roles).toContain("admin");
	});
});
