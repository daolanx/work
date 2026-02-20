import { format, subDays, subWeeks } from "date-fns";
import { describe, expect, it } from "vitest";
import { getRelativeTimeString } from "@/lib/date";

describe("lib/date", () => {
	describe("getRelativeTimeString", () => {
		it('returns "Today" for today date', () => {
			const today = new Date();
			expect(getRelativeTimeString(today)).toBe("Today");
			expect(getRelativeTimeString(today.toISOString())).toBe("Today");
		});

		it('returns "Yesterday" for yesterday', () => {
			const yesterday = subDays(new Date(), 1);
			expect(getRelativeTimeString(yesterday)).toBe("Yesterday");
			expect(getRelativeTimeString(yesterday.toISOString())).toBe("Yesterday");
		});

		it("returns relative string for older dates", () => {
			const threeDaysAgo = subDays(new Date(), 3);
			const result = getRelativeTimeString(threeDaysAgo);
			expect(result).toMatch(/\d (day|days) ago/);
		});

		it("returns relative string for past date (e.g. weeks or days ago)", () => {
			const twoWeeksAgo = subWeeks(new Date(), 2);
			const result = getRelativeTimeString(twoWeeksAgo);
			expect(result).toMatch(/\d+ (day|days|week|weeks) ago/);
		});
	});
});
