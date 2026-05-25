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

		// Route prefixes to their R2 bucket domains:
		// MEDIA — user-uploaded files (images, docs) from Payload CMS, stored under medias/ key prefix
		// REMOTE — static build output (Next.js pages, chunks)
		const routes = [
			{
				prefix: env.MEDIA_PREFIX,
				r2Domain: env.UPLOADS_R2_DOMAIN,
				keyPrefix: "medias",
			},
			{ prefix: env.REMOTE_PREFIX, r2Domain: env.R2_DOMAIN },
		];
		const match = routes.find((r) => pathname.startsWith(r.prefix));
		if (!match) return fetch(request);
		const { prefix, r2Domain, keyPrefix } = match;

		const startTime = Date.now();
		const suffix = pathname.slice(prefix.length).replace(/^\//, "");
		const originPath = keyPrefix ? `${keyPrefix}/${suffix}` : suffix;
		const isImage = /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(originPath);
		const [w, q] = [searchParams.get("w"), searchParams.get("q")];

		const sourceResponse = await fetch(`${r2Domain}/${originPath}`, {
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
