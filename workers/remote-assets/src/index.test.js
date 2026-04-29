import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import worker from "./index.js";

const PREFIX = "/remote-assets/";
const BASE = "https://demo.daolanx.com";

// Hoist mocks so they're available before the worker module reference is used
const { mockFetch, mockCacheMatch, mockCachePut, mockR2Get } = vi.hoisted(
	() => ({
		mockFetch: vi.fn(),
		mockCacheMatch: vi.fn().mockResolvedValue(null),
		mockCachePut: vi.fn().mockResolvedValue(undefined),
		mockR2Get: vi.fn().mockResolvedValue(null),
	}),
);

// Set up global mocks before any test runs
beforeEach(() => {
	// Mock global caches API
	globalThis.caches = {
		default: {
			match: mockCacheMatch,
			put: mockCachePut,
		},
	};

	// Mock global fetch (used by image resizing upstream calls)
	globalThis.fetch = mockFetch;

	// Reset all mocks
	vi.clearAllMocks();

	// Default: cache miss
	mockCacheMatch.mockResolvedValue(null);
});

afterEach(() => {
	vi.restoreAllMocks();
});

// Helper to invoke the worker's fetch handler
function invokeWorker(url, envOverrides = {}, fetchOverride, ctxOverrides) {
	const req = new Request(url);
	const env = {
		REMOTE_PREFIX: PREFIX,
		R2_DOMAIN: "https://assets.daolanx.com",
		R2_BUCKET: { get: mockR2Get },
		...envOverrides,
	};
	const ctx = ctxOverrides || { waitUntil: vi.fn((p) => p) };
	return worker.fetch(req, env, ctx, fetchOverride);
}

// ─── Route Matching ─────────────────────────────────────────────

describe("route matching", () => {
	it("passes through requests that don't match REMOTE_PREFIX", async () => {
		mockFetch.mockResolvedValue(new Response("upstream-ok", { status: 200 }));
		const res = await invokeWorker(`${BASE}/other-path/file.js`);
		expect(res.status).toBe(200);
		expect(await res.text()).toBe("upstream-ok");
	});

	it("passes through root path", async () => {
		mockFetch.mockResolvedValue(new Response("root", { status: 200 }));
		const res = await invokeWorker(`${BASE}/`);
		expect(res.status).toBe(200);
	});
});

// ─── Static Assets from R2 ──────────────────────────────────────

describe("static assets from R2", () => {
	it("serves a file from R2 with correct headers", async () => {
		mockR2Get.mockResolvedValue({
			body: "body{color:red}",
			httpEtag: '"etag-123"',
			size: 15,
			writeHttpMetadata(headers) {
				headers.set("Content-Type", "text/css");
			},
		});

		const res = await invokeWorker(`${BASE}${PREFIX}css/style.css`);
		expect(res.status).toBe(200);
		expect(await res.text()).toBe("body{color:red}");
		expect(res.headers.get("ETag")).toBe('"etag-123"');
		expect(res.headers.get("Content-Length")).toBe("15");
		expect(res.headers.get("Cache-Control")).toBe(
			"public, max-age=31536000, immutable",
		);
		expect(res.headers.get("Content-Type")).toBe("text/css");
	});

	it("returns 404 when file is not in R2", async () => {
		mockR2Get.mockResolvedValue(null);

		const res = await invokeWorker(`${BASE}${PREFIX}missing.txt`);
		expect(res.status).toBe(404);
		expect(await res.text()).toBe("Not Found");
		expect(res.headers.get("Cache-Control")).toBe("no-store");
	});

	it("returns 304 when If-None-Match matches ETag", async () => {
		mockR2Get.mockResolvedValue({
			body: "console.log()",
			httpEtag: '"abc-123"',
			size: 13,
			writeHttpMetadata(headers) {
				headers.set("Content-Type", "application/javascript");
			},
		});

		const req = new Request(`${BASE}${PREFIX}file.js`, {
			headers: { "If-None-Match": '"abc-123"' },
		});
		const env = {
			REMOTE_PREFIX: PREFIX,
			R2_BUCKET: { get: mockR2Get },
		};
		const res = await worker.fetch(req, env, { waitUntil: vi.fn() });

		expect(res.status).toBe(304);
		expect(res.headers.get("ETag")).toBe('"abc-123"');
	});
});

// ─── Image Resizing ─────────────────────────────────────────────

describe("image resizing", () => {
	it("calls upstream fetch with image options for image paths with width", async () => {
		mockFetch.mockResolvedValue(
			new Response("resized-image-bytes", {
				status: 200,
				headers: { "Content-Type": "image/webp" },
			}),
		);

		const res = await invokeWorker(`${BASE}${PREFIX}photos/hero.jpg?w=800`);

		expect(mockFetch).toHaveBeenCalledOnce();
		const [url, opts] = mockFetch.mock.calls[0];
		expect(url).toBe("https://assets.daolanx.com/photos/hero.jpg");
		expect(opts.cf.image).toEqual({
			width: 800,
			quality: 75,
			format: "auto",
			fit: "scale-down",
		});
		expect(res.status).toBe(200);
		expect(res.headers.get("Cache-Control")).toBe(
			"public, max-age=31536000, immutable",
		);
	});

	it("clamps width to minimum 1", async () => {
		mockFetch.mockResolvedValue(new Response("img", { status: 200 }));

		await invokeWorker(`${BASE}${PREFIX}img.png?w=-5`);
		const [, opts] = mockFetch.mock.calls[0];
		expect(opts.cf.image.width).toBe(1);
	});

	it("clamps width to maximum 4096", async () => {
		mockFetch.mockResolvedValue(new Response("img", { status: 200 }));

		await invokeWorker(`${BASE}${PREFIX}img.png?w=9999`);
		const [, opts] = mockFetch.mock.calls[0];
		expect(opts.cf.image.width).toBe(4096);
	});

	it("uses custom quality parameter", async () => {
		mockFetch.mockResolvedValue(new Response("img", { status: 200 }));

		await invokeWorker(`${BASE}${PREFIX}banner.webp?w=1200&q=90`);
		const [, opts] = mockFetch.mock.calls[0];
		expect(opts.cf.image.quality).toBe(90);
	});

	it("clamps quality to maximum 100", async () => {
		mockFetch.mockResolvedValue(new Response("img", { status: 200 }));

		await invokeWorker(`${BASE}${PREFIX}img.png?w=100&q=200`);
		const [, opts] = mockFetch.mock.calls[0];
		expect(opts.cf.image.quality).toBe(100);
	});

	it("forwards Accept header to upstream", async () => {
		mockFetch.mockResolvedValue(new Response("img", { status: 200 }));

		const req = new Request(`${BASE}${PREFIX}img.jpg?w=400`, {
			headers: { Accept: "image/avif,image/webp,*/*" },
		});
		const env = {
			REMOTE_PREFIX: PREFIX,
			R2_DOMAIN: "https://assets.daolanx.com",
			R2_BUCKET: { get: mockR2Get },
		};
		await worker.fetch(req, env, { waitUntil: vi.fn() });

		const [, opts] = mockFetch.mock.calls[0];
		expect(opts.headers.get("Accept")).toBe("image/avif,image/webp,*/*");
	});

	it("does not forward non-allowed headers to upstream", async () => {
		mockFetch.mockResolvedValue(new Response("img", { status: 200 }));

		const req = new Request(`${BASE}${PREFIX}img.png?w=100`, {
			headers: {
				Accept: "image/*",
				"X-Custom-Header": "should-not-pass",
				Authorization: "Bearer token",
			},
		});
		const env = {
			REMOTE_PREFIX: PREFIX,
			R2_DOMAIN: "https://assets.daolanx.com",
			R2_BUCKET: { get: mockR2Get },
		};
		await worker.fetch(req, env, { waitUntil: vi.fn() });

		const [, opts] = mockFetch.mock.calls[0];
		expect(opts.headers.has("X-Custom-Header")).toBe(false);
		expect(opts.headers.has("Authorization")).toBe(false);
	});

	it("does not treat non-image extensions as images even with width param", async () => {
		mockR2Get.mockResolvedValue({
			body: '{"key":"value"}',
			httpEtag: '"json-etag"',
			size: 15,
			writeHttpMetadata(headers) {
				headers.set("Content-Type", "application/json");
			},
		});

		const res = await invokeWorker(`${BASE}${PREFIX}data.json?w=100`);
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ key: "value" });
		// Should NOT have called the image resize fetch
		expect(mockFetch).not.toHaveBeenCalled();
	});
});

// ─── Caching ────────────────────────────────────────────────────

describe("caching", () => {
	it("adds X-Cache: MISS header on cache miss", async () => {
		mockR2Get.mockResolvedValue({
			body: "hello",
			httpEtag: '"e1"',
			size: 5,
			writeHttpMetadata(headers) {
				headers.set("Content-Type", "text/plain");
			},
		});

		const res = await invokeWorker(`${BASE}${PREFIX}test.txt`);
		expect(res.headers.get("X-Cache")).toBe("MISS");
	});

	it("returns cached response with X-Cache: HIT", async () => {
		const cachedBody = "cached-content";
		const cachedResponse = new Response(cachedBody, {
			status: 200,
			headers: { "Content-Type": "text/html" },
		});
		mockCacheMatch.mockResolvedValue(cachedResponse);

		const res = await invokeWorker(`${BASE}${PREFIX}page.html`);
		expect(res.headers.get("X-Cache")).toBe("HIT");
		expect(await res.text()).toBe(cachedBody);
	});

	it("does not cache non-200 responses", async () => {
		mockR2Get.mockResolvedValue(null);

		const ctx = { waitUntil: vi.fn((p) => p) };
		const res = await invokeWorker(
			`${BASE}${PREFIX}not-found.txt`,
			{},
			undefined,
			ctx,
		);
		expect(res.status).toBe(404);
		expect(res.headers.get("X-Cache")).toBe("MISS");

		// ctx.waitUntil should not have been called (no cache store for 404)
		expect(ctx.waitUntil).not.toHaveBeenCalled();
	});

	it("caches successful responses via ctx.waitUntil", async () => {
		mockR2Get.mockResolvedValue({
			body: "fresh-content",
			httpEtag: '"fresh-1"',
			size: 13,
			writeHttpMetadata(headers) {
				headers.set("Content-Type", "text/plain");
			},
		});

		const ctx = { waitUntil: vi.fn((p) => p) };
		const res = await invokeWorker(
			`${BASE}${PREFIX}fresh.txt`,
			{},
			undefined,
			ctx,
		);
		expect(res.status).toBe(200);

		// ctx.waitUntil should have been called with a cache.put promise
		expect(ctx.waitUntil).toHaveBeenCalledOnce();
	});
});
