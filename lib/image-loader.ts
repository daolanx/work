interface LoaderProps {
	src: string;
	width: number;
	quality?: number;
}

export default function myImageLoader({ src, width, quality }: LoaderProps) {
	const isProd = process.env.NODE_ENV === "production";
	const isExternal = src.startsWith("http");

	// External images: Use original URL
	if (isExternal) {
		return src;
	}

	// Development: return src with params (Next.js requires width to be used)
	if (!isProd) {
		return `${src}?w=${width}&q=${quality || 75}`;
	}

	// Clean path: remove leading slash for consistency
	const normalizedSrc = src.startsWith("/") ? src.slice(1) : src;

	// Production URL: Relative path to trigger Cloudflare Worker
	return `/remote-assets/${normalizedSrc}?w=${width}&q=${quality || 75}`;
}
