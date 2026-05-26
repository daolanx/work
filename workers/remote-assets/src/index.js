/**
 * Remote Assets Proxy Worker
 *
 * Routes requests matching REMOTE_PREFIX to an R2 custom domain,
 * with optional Cloudflare Edge image resizing (?w= & ?q= params).
 * Successful responses (2xx) are cached at the CDN edge for 1 year;
 * errors (4xx/5xx) are not cached.
 */

const CACHE_TTL = 31536000;

export default {
	async fetch(request, env) {
		// 1. CORS preflight
		if (request.method === "OPTIONS") {
			return new Response(null, {
				headers: { "Access-Control-Allow-Origin": "*" },
			});
		}

		const url = new URL(request.url);
		const { pathname, searchParams } = url;

		// 2. Route matching
		const routes = [
			{
				prefix: env.MEDIA_PREFIX,
				domain: env.UPLOADS_R2_DOMAIN,
				key: "medias",
			},
			{ prefix: env.REMOTE_PREFIX, domain: env.R2_DOMAIN },
		];
		const match = routes.find((r) => pathname.startsWith(r.prefix));
		if (!match) return fetch(request);

		// 3. Build R2 origin URL
		const suffix = pathname.slice(match.prefix.length).replace(/^\//, "");
		const originPath = match.key ? `${match.key}/${suffix}` : suffix;
		const targetUrl = `${match.domain}/${originPath}`;

		const startTime = Date.now();

		// 4. Edge cache config — 1 year for success, no cache for errors
		const cfConfig = {
			cacheEverything: true,
			cacheTtlByStatus: {
				"200-299": CACHE_TTL,
				"400-599": 0,
			},
		};

		// 5. Image resizing via Cloudflare Edge
		const isImage = /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(originPath);
		const w = searchParams.get("w");
		const q = searchParams.get("q");
		if (isImage && w) {
			const width = parseInt(w, 10);
			const quality = parseInt(q || "75", 10);
			if (Number.isFinite(width) && width > 0) {
				cfConfig.image = {
					width,
					quality: Number.isFinite(quality) && quality > 0 ? quality : 75,
					format: "auto",
					fit: "scale-down",
				};
			}
		}

		// 6. Fetch from R2 (no client headers — pure static resources don't need them)
		const response = await fetch(targetUrl, { cf: cfConfig });

		// 7. Build final response with debug headers
		const finalResponse = new Response(response.body, response);

		finalResponse.headers.set("Access-Control-Allow-Origin", "*");
		finalResponse.headers.set(
			"Cache-Control",
			response.ok ? `public, max-age=${CACHE_TTL}, immutable` : "no-store",
		);
		finalResponse.headers.set(
			"Server-Timing",
			`total;dur=${Date.now() - startTime}`,
		);
		finalResponse.headers.set(
			"X-Cache",
			response.headers.get("cf-cache-status") || "MISS",
		);

		return finalResponse;
	},
};
