import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn().mockResolvedValue((key: string) => {
		const translations: Record<string, string> = {
			"dashboard.mrr": "MRR",
			"dashboard.retention": "Retention",
			"dashboard.conversion": "Conversion",
			"dashboard.mau": "MAU",
		};
		return translations[key] || key;
	}),
}));

vi.mock("@/features/console/dashboard/services", () => ({
	queryMAU: vi.fn(),
	queryRetentionRate: vi.fn(),
}));
vi.mock("@/features/console/payments/lib/creem", () => ({
	queryConversionRate: vi.fn(),
	queryMRR: vi.fn(),
}));

import {
	SummaryCards,
	SummaryCardsSkeleton,
} from "@/features/console/dashboard/components/summary-cards";
import {
	queryMAU,
	queryRetentionRate,
} from "@/features/console/dashboard/services";
import {
	queryConversionRate,
	queryMRR,
} from "@/features/console/payments/lib/creem";

// ── Helper ──

const defaultMocks = {
	MAU: { current: 100, previous: 80 },
	retention: { current: 65.5, previous: 60.2 },
	conversion: { current: 12.3, previous: 10.1 },
	MRR: { current: 5000, previous: 4200 },
};

function setupMocks(overrides: Partial<typeof defaultMocks> = {}) {
	const m = { ...defaultMocks, ...overrides };
	vi.mocked(queryMAU).mockResolvedValue(m.MAU);
	vi.mocked(queryRetentionRate).mockResolvedValue(m.retention);
	vi.mocked(queryConversionRate).mockResolvedValue(m.conversion);
	vi.mocked(queryMRR).mockResolvedValue(m.MRR);
}

// ── SummaryCardsSkeleton ──

describe("SummaryCardsSkeleton", () => {
	it("renders 4 skeleton cards", () => {
		const html = renderToStaticMarkup(<SummaryCardsSkeleton />);
		const count = [...html.matchAll(/animate-pulse/g)].length;
		expect(count).toBe(4);
	});
});

// ── SummaryCards ──

describe("SummaryCards", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders all 4 metric labels", async () => {
		setupMocks();
		const html = renderToStaticMarkup(await SummaryCards());

		expect(html).toContain("MRR");
		expect(html).toContain("Retention");
		expect(html).toContain("Conversion");
		expect(html).toContain("MAU");
	});

	it("formats MRR with dollar sign", async () => {
		setupMocks({
			MRR: { current: 1234.56, previous: 1000 },
			MAU: { current: 0, previous: 0 },
			retention: { current: 0, previous: 0 },
			conversion: { current: 0, previous: 0 },
		});
		const html = renderToStaticMarkup(await SummaryCards());
		expect(html).toContain("$1234.56");
	});

	it("formats retention and conversion with percent", async () => {
		setupMocks({
			retention: { current: 75.123, previous: 70 },
			conversion: { current: 8.456, previous: 7 },
			MAU: { current: 0, previous: 0 },
			MRR: { current: 0, previous: 0 },
		});
		const html = renderToStaticMarkup(await SummaryCards());
		expect(html).toContain("75.12%");
		expect(html).toContain("8.46%");
	});

	it("renders MAU as plain number", async () => {
		setupMocks({
			MAU: { current: 1234, previous: 1000 },
			retention: { current: 0, previous: 0 },
			conversion: { current: 0, previous: 0 },
			MRR: { current: 0, previous: 0 },
		});
		const html = renderToStaticMarkup(await SummaryCards());
		expect(html).toContain("1234");
	});

	it("shows positive trend when value increases", async () => {
		setupMocks({
			MAU: { current: 100, previous: 80 },
			retention: { current: 0, previous: 0 },
			conversion: { current: 0, previous: 0 },
			MRR: { current: 0, previous: 0 },
		});
		const html = renderToStaticMarkup(await SummaryCards());
		expect(html).toContain("+25%");
	});

	it("shows negative trend when value decreases", async () => {
		setupMocks({
			MAU: { current: 50, previous: 100 },
			retention: { current: 0, previous: 0 },
			conversion: { current: 0, previous: 0 },
			MRR: { current: 0, previous: 0 },
		});
		const html = renderToStaticMarkup(await SummaryCards());
		expect(html).toContain("-50%");
	});

	it("falls back to 0 when query fails", async () => {
		setupMocks({
			MAU: { current: 0, previous: 0 },
			retention: { current: 0, previous: 0 },
			conversion: { current: 0, previous: 0 },
			MRR: { current: 0, previous: 0 },
		});
		vi.mocked(queryMAU).mockRejectedValue(new Error("DB error"));

		const html = renderToStaticMarkup(await SummaryCards());
		expect(html).toContain("MAU");
		expect(html).toContain("0");
	});
});
