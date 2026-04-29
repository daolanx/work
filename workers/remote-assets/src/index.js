export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const { pathname, searchParams } = url;

		if (!pathname.startsWith(env.REMOTE_PREFIX)) return fetch(request);

		const startTime = Date.now();
		const originPath = pathname
			.slice(env.REMOTE_PREFIX.length)
			.replace(/^\//, "");
		const isImage = /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(originPath);
		const width = searchParams.get("w");

		const sourceResponse =
			isImage && width
				? await getResizedImage(request, env, originPath, searchParams)
				: await getStaticAssets(request, env, originPath);

		const headers = new Headers(sourceResponse.headers);
		headers.set("Cache-Control", "public, max-age=31536000, immutable");
		headers.set("Server-Timing", `total;dur=${Date.now() - startTime}`);
		headers.set(
			"X-Cache",
			sourceResponse.headers.get("cf-cache-status") || "MISS",
		);

		return new Response(sourceResponse.body, {
			status: sourceResponse.status,
			statusText: sourceResponse.statusText,
			headers,
		});
	},
};

function prepareUpstreamHeaders(request) {
	const headers = new Headers(request.headers);
	headers.delete("host");
	return headers;
}

async function getResizedImage(request, env, path, params) {
	const w = Math.min(Math.max(parseInt(params.get("w") || "0", 10), 1), 4096);
	const q = Math.min(Math.max(parseInt(params.get("q") || "75", 10), 1), 100);

	return await fetch(`${env.R2_DOMAIN}/${path}`, {
		headers: prepareUpstreamHeaders(request),
		cf: {
			image: { width: w, quality: q, format: "auto", fit: "scale-down" },
			cacheEverything: true,
			cacheTtl: 31536000,
		},
	});
}

async function getStaticAssets(request, env, path) {
	return await fetch(`${env.R2_DOMAIN}/${path}`, {
		headers: prepareUpstreamHeaders(request),
		cf: {
			cacheEverything: true,
			cacheTtl: 31536000,
		},
	});
}
