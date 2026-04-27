interface LoaderProps {
	src: string;
	width: number;
	quality?: number;
}

export default function myImageLoader({ src, width, quality }: LoaderProps) {
	const isProd = process.env.NODE_ENV === "production";
	const isExternal = src.startsWith("http");

	// Local development or External images: Use original URL
	if (!isProd || isExternal) {
		return src;
	}

	// Clean path: remove leading slash for consistency
	const normalizedSrc = src.startsWith("/") ? src.slice(1) : src;

	// Production URL: Relative path to trigger Cloudflare Worker
	return `/remote-assets/${normalizedSrc}?w=${width}&q=${quality || 75}`;
}
