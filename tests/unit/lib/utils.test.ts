import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("lib/utils", () => {
	describe("cn", () => {
		it("merges single class", () => {
			expect(cn("foo")).toBe("foo");
		});

		it("merges multiple classes", () => {
			expect(cn("foo", "bar")).toBe("foo bar");
		});

		it("handles conditional classes", () => {
			expect(cn("base", false && "hidden", true && "visible")).toBe(
				"base visible",
			);
		});

		it("merges tailwind conflicting classes with tailwind-merge", () => {
			expect(cn("p-2", "p-4")).toBe("p-4");
		});

		it("handles undefined and null", () => {
			expect(cn("a", undefined, null, "b")).toBe("a b");
		});
	});
});
