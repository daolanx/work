/**
 * Remote Assets Proxy Worker
 * Efficiently routes requests to R2 storage or triggers Cloudflare Image Resizing.
 */

export default {
	async fetch(request, env, _ctx) {
		const url = new URL(request.url);
		const { pathname, searchParams } = url;

		// 1. Check if the request targets the defined remote asset prefix
		if (pathname.startsWith(env.REMOTE_PREFIX)) {
			// Normalize path by removing the prefix and leading slash
			let originPath = pathname.replace(env.REMOTE_PREFIX, "");
			if (originPath.startsWith("/")) originPath = originPath.slice(1);

			// Determine if the asset is an image based on file extension
			const isImage = /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(originPath);
			const width = searchParams.get("w");

			// 2. Handle Image Resizing requests
			// Uses Cloudflare's built-in Image Resizing via fetch()
			if (isImage && width) {
				const staticResUrl = `${env.R2_DOMAIN}/${originPath}`;
				return fetch(staticResUrl, {
					headers: request.headers,
					cf: {
						image: {
							width: parseInt(width, 10),
							quality: parseInt(searchParams.get("q") || "75", 10),
							format: "auto",
							fit: "scale-down",
						},
						cacheEverything: true,
						cacheTtl: 31536000, // 1 year cache TTL
					},
				});
			}

			// 3. Handle standard static assets (JS, CSS, etc.)
			// Access R2 directly via Service Binding to eliminate network latency
			const object = await env.R2_BUCKET.get(originPath);

			if (!object) {
				return new Response("Not Found", { status: 404 });
			}

			// Prepare headers for the response
			const headers = new Headers();
			object.writeHttpMetadata(headers); // Preserve content-type/encoding metadata
			headers.set("etag", object.httpEtag);

			// Apply aggressive caching for hashed Next.js static assets or general assets
			if (pathname.includes("/_next/static/")) {
				headers.set("Cache-Control", "public, max-age=31536000, immutable");
			} else {
				headers.set("Cache-Control", "public, max-age=31536000");
			}

			// Return the object body as a stream
			return new Response(object.body, { headers });
		}

		// 4. Fallback: Passthrough to the main origin (e.g., Vercel)
		return fetch(request);
	},
};
