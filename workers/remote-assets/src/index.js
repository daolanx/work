/**
 * Remote Assets Proxy Worker (Final Version)
 * Utilizes Cloudflare Built-in Image Resizing & R2 Storage
 */

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const { pathname, searchParams } = url;

		// 1. Match custom prefix for remote assets
		if (pathname.startsWith(env.REMOTE_PREFIX)) {
			// Clean up path to ensure no double slashes during concatenation
			let originPath = pathname.replace(env.REMOTE_PREFIX, "");
			if (originPath.startsWith("/")) originPath = originPath.slice(1);

			const staticResUrl = `${env.R2_DOMAIN}/${originPath}`;

			const isImage = /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(originPath);
			const width = searchParams.get("w");
			const quality = searchParams.get("q") || "75";

			// 2. Trigger Image Resizing if 'w' parameter is present
			if (isImage && width) {
				return fetch(staticResUrl, {
					headers: request.headers,
					cf: {
						image: {
							width: parseInt(width),
							quality: parseInt(quality),
							format: "auto", // Auto-select best format (WebP/AVIF) based on browser support
							fit: "scale-down",
						},
					},
          cacheEverything: true,
          cacheTtl: 31536000,
				});
			}

			// 3. Standard asset request (JS, CSS, or non-resized images)
			const response = await fetch(staticResUrl, {
				headers: request.headers,
			});

			// Apply aggressive caching for hashed Next.js static assets
			if (pathname.includes("/_next/static/")) {
				const newHeaders = new Headers(response.headers);
				/**
				 * 'immutable' prevents browsers from revalidating the file,
				 * reducing server round-trips to zero for repeat visits.
				 */
				newHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
				return new Response(response.body, {
					status: response.status,
					statusText: response.statusText,
					headers: newHeaders,
				});
			}

			return response;
		}

		// 4. Passthrough all other requests to the main origin (e.g., Vercel)
		return fetch(request);
	},
};
