/**
 * Remote Assets Proxy Worker
 *
 * Routes requests matching REMOTE_PREFIX to an R2 custom domain,
 * with optional Cloudflare Edge image resizing (?w= & ?q= params).
 * All responses are cached at the CDN edge for 1 year.
 */

const CACHE_TTL = 31536000; // 1 year

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const { pathname, searchParams } = url;
		// Pass through non-proxy requests to origin
		if (!pathname.startsWith(env.REMOTE_PREFIX)) return fetch(request);

		const startTime = Date.now();
		// Strip REMOTE_PREFIX to get the original asset path (e.g. /css/style.css)
		const originPath = pathname
			.slice(env.REMOTE_PREFIX.length)
			.replace(/^\//, "");
		const isImage = /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(originPath);
		const [w, q] = [searchParams.get("w"), searchParams.get("q")];

		// Fetch from R2 custom domain; image requests go through Edge Resizing
		const sourceResponse = await fetch(`${env.R2_DOMAIN}/${originPath}`, {
			headers: request.headers,
			cf: {
				...(isImage && w
					? {
							image: {
								width: parseInt(w, 10),
								quality: parseInt(q || "75", 10),
								format: "auto",
								fit: "scale-down",
							},
						}
					: {}),
				cacheEverything: true,
				cacheTtl: CACHE_TTL,
			},
		});

		// Attach browser cache headers and debug info
		const resHeaders = new Headers(sourceResponse.headers);
		resHeaders.set("Cache-Control", `public, max-age=${CACHE_TTL}, immutable`);
		resHeaders.set("Server-Timing", `total;dur=${Date.now() - startTime}`);
		resHeaders.set(
			"X-Cache",
			sourceResponse.headers.get("cf-cache-status") || "MISS",
		);

		return new Response(sourceResponse.body, {
			status: sourceResponse.status,
			statusText: sourceResponse.statusText,
			headers: resHeaders,
		});
	},
};
