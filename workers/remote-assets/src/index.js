/**
 * Remote Assets Proxy Worker
 * Efficiently routes requests to R2 storage or triggers Cloudflare Image Resizing.
 */

export default {
	async fetch(request, env, _ctx) {
		const url = new URL(request.url);
		const { pathname, searchParams } = url;

		// 1. Check if the request targets the defined remote asset prefix
		if (!pathname.startsWith(env.REMOTE_PREFIX)) {
			return fetch(request);
		}

		const originPath = pathname
			.slice(env.REMOTE_PREFIX.length)
			.replace(/^\//, "");
		const isImage = /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(originPath);
		const width = searchParams.get("w");

		// 2. Handle Image Resizing via Cloudflare edge (fetch from R2 public domain)
		if (isImage && width) {
			const w = Math.min(Math.max(parseInt(width, 10) || 0, 1), 4096);
			const q = Math.min(
				Math.max(parseInt(searchParams.get("q") || "75", 10) || 75, 1),
				100,
			);
			return fetch(`${env.R2_DOMAIN}/${originPath}`, {
				headers: request.headers,
				cf: {
					image: {
						width: w,
						quality: q,
						format: "auto",
						fit: "scale-down",
					},
					cacheEverything: true,
					cacheTtl: 31536000,
				},
			});
		}

		// 3. Handle standard static assets via R2 Service Binding (zero network latency)
		const object = await env.R2_BUCKET.get(originPath);
		if (!object) {
			return new Response("Not Found", {
				status: 404,
				headers: { "Cache-Control": "public, max-age=60" },
			});
		}

		const headers = new Headers();
		object.writeHttpMetadata(headers);
		headers.set("etag", object.httpEtag);
		headers.set("Content-Length", String(object.size));
		headers.set("Cache-Control", "public, max-age=31536000, immutable");

		return new Response(object.body, { headers });
	},
};
