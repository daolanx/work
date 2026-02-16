interface LoaderProps {
	src: string;
	width: number;
	quality?: number;
}

const ALL_SIZES = [64, 256, 640, 828, 1120, 1920];

export default function myImageLoader({ src, width, quality }: LoaderProps) {
	const isProd = process.env.NODE_ENV === "production";
	const isExternal = src.startsWith("http");

	// Local development or External images: Use original URL
	if (!isProd || isExternal) {
		return src;
	}

	// Find the closest larger bucket size
	const targetWidth =
		ALL_SIZES.find((s) => s >= width) || ALL_SIZES[ALL_SIZES.length - 1];

	// Clean path: remove leading slash for consistency
	const normalizedSrc = src.startsWith("/") ? src.slice(1) : src;

	// Final Production URL: Relative path to trigger Cloudflare Worker
	return `/remote-assets/${normalizedSrc}?w=${targetWidth}&q=${quality || 75}`;
}
