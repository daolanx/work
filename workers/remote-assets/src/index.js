/**
 * Remote Assets Proxy Worker (Modular Version)
 * Efficiently handles asset routing, image resizing, and R2 storage retrieval.
 */

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const { pathname, searchParams } = url;

		// Only process requests matching the configured remote asset prefix
		if (!pathname.startsWith(env.REMOTE_PREFIX)) return fetch(request);

		// Attempt to serve from Edge Cache (Cache API)
		const cachedResponse = await getCachedResponse(request);
		if (cachedResponse) return cachedResponse;

		const originPath = pathname
			.slice(env.REMOTE_PREFIX.length)
			.replace(/^\//, "");
		const isImage = /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(originPath);
		const width = searchParams.get("w");

		let sourceResponse;

		// 4. Routing Strategy: Determine if we need Image Resizing or standard R2 fetch
		if (isImage && width) {
			sourceResponse = await handleImageResizing(
				request,
				env,
				originPath,
				searchParams,
			);
		} else {
			sourceResponse = await handleStaticAsset(request, env, originPath);
		}

		// 5. Cache the successful response (200 OK) for future requests
		if (sourceResponse.status === 200) {
			saveToCache(request, ctx, sourceResponse);
		}

		// Prepare final response with MISS header for debugging
		const headers = new Headers(sourceResponse.headers);
		headers.set("X-Cache", "MISS");

		return new Response(sourceResponse.body, {
			status: sourceResponse.status,
			statusText: sourceResponse.statusText,
			headers,
		});
	},
};

/**
 * Helper: Retrieve response from Cache API
 */
async function getCachedResponse(request) {
	const cache = caches.default;
	const cached = await cache.match(request);
	if (cached) {
		const response = new Response(cached.body, cached);
		response.headers.set("X-Cache", "HIT");
		return response;
	}
	return null;
}

/**
 * Helper: Fetch and transform image via Cloudflare Edge Resizing
 */
async function handleImageResizing(request, env, path, params) {
	const w = Math.min(Math.max(parseInt(params.get("w") || "0", 10), 1), 4096);
	const q = Math.min(Math.max(parseInt(params.get("q") || "75", 10), 1), 100);

	// Only forward necessary headers to upstream; avoid leaking client-specific headers
	const upstreamHeaders = new Headers();
	if (request.headers.has("Accept")) {
		upstreamHeaders.set("Accept", request.headers.get("Accept"));
	}
	if (request.headers.has("If-None-Match")) {
		upstreamHeaders.set("If-None-Match", request.headers.get("If-None-Match"));
	}

	const response = await fetch(`${env.R2_DOMAIN}/${path}`, {
		headers: upstreamHeaders,
		cf: {
			image: { width: w, quality: q, format: "auto", fit: "scale-down" },
		},
	});

	// Override Cache-Control to ensure consistent long-term caching across all assets
	const headers = new Headers(response.headers);
	headers.set("Cache-Control", "public, max-age=31536000, immutable");

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

/**
 * Helper: Retrieve static assets from R2 Bucket
 */
async function handleStaticAsset(request, env, path) {
	const object = await env.R2_BUCKET.get(path);

	if (!object) {
		return new Response("Not Found", {
			status: 404,
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
				"Cache-Control": "no-store",
			},
		});
	}

	// Handle Conditional GET (304 Not Modified) to save bandwidth
	if (request.headers.get("If-None-Match") === object.httpEtag) {
		return new Response(null, {
			status: 304,
			headers: { ETag: object.httpEtag },
		});
	}

	// Set necessary HTTP metadata and long-term cache headers
	const headers = new Headers();
	object.writeHttpMetadata(headers);
	headers.set("ETag", object.httpEtag);
	headers.set("Content-Length", String(object.size));
	headers.set("Cache-Control", "public, max-age=31536000, immutable");

	return new Response(object.body, { headers });
}

/**
 * Helper: Asynchronously store response in Cache API
 */
function saveToCache(request, ctx, response) {
	const cache = caches.default;
	const responseToCache = response.clone(); // Clone is required as body can only be read once
	ctx.waitUntil(cache.put(request, responseToCache));
}
