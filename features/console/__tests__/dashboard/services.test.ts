import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/db", () => ({ db: {} }));

import { db } from "@/db";
import {
	queryMAU,
	queryRetentionRate,
} from "@/features/console/dashboard/services";

function mockChain<T>(data: T) {
	const chain = {
		from: vi.fn().mockReturnThis(),
		where: vi.fn().mockReturnThis(),
		orderBy: vi.fn().mockReturnThis(),
	};
	return new Proxy(chain, {
		get(target, prop, receiver) {
			if (prop === "then") {
				return (resolve: (value: unknown) => void) =>
					Promise.resolve(data).then(resolve);
			}
			return Reflect.get(target, prop, receiver);
		},
	});
}

beforeEach(() => {
	vi.clearAllMocks();
});

describe("queryMAU", () => {
	it("returns current and previous month counts", async () => {
		let callCount = 0;
		(db as any).select = vi.fn().mockImplementation(() => {
			callCount++;
			if (callCount === 1) return mockChain([{ current: 10 }]);
			return mockChain([{ previous: 8 }]);
		});

		const result = await queryMAU();
		expect(result).toEqual({ current: 10, previous: 8 });
	});

	it("defaults to 0 when counts are null", async () => {
		let callCount = 0;
		(db as any).select = vi.fn().mockImplementation(() => {
			callCount++;
			if (callCount === 1) return mockChain([{ current: null }]);
			return mockChain([{ previous: null }]);
		});

		const result = await queryMAU();
		expect(result).toEqual({ current: 0, previous: 0 });
	});
});

describe("queryRetentionRate", () => {
	it("calculates retention rates", async () => {
		let callCount = 0;
		(db as any).select = vi.fn().mockImplementation(() => {
			callCount++;
			// Current retained, current cohort, previous retained, previous cohort
			if (callCount === 1) return mockChain([{ retained: 5 }]);
			if (callCount === 2) return mockChain([{ cohort: 8 }]);
			if (callCount === 3) return mockChain([{ retained: 4 }]);
			return mockChain([{ cohort: 7 }]);
		});

		const result = await queryRetentionRate();
		expect(result.current).toBeCloseTo(62.5); // 5/8 * 100
		expect(result.previous).toBeCloseTo(57.14, 0); // 4/7 * 100
	});

	it("returns 0 when cohort is 0", async () => {
		let callCount = 0;
		(db as any).select = vi.fn().mockImplementation(() => {
			callCount++;
			if (callCount === 1) return mockChain([{ retained: 0 }]);
			if (callCount === 2) return mockChain([{ cohort: 0 }]);
			if (callCount === 3) return mockChain([{ retained: 0 }]);
			return mockChain([{ cohort: 0 }]);
		});

		const result = await queryRetentionRate();
		expect(result.current).toBe(0);
		expect(result.previous).toBe(0);
	});
});
