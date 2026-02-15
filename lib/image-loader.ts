interface LoaderProps {
	src: string;
	width: number;
	quality?: number;
}

/**
 * Cloudflare Image Resizing Loader for Next.js
 * Documentation: https://developers.cloudflare.com/images/transform-images/
 */
export default function myImageLoader({ src, width, quality }: LoaderProps) {
	// 1. Configure transformation parameters
	// 'format=auto' attempts to serve AVIF/WebP based on Accept headers
	// 'fit=cover' ensures the aspect ratio is maintained during resizing
	const params = [
		`width=${width}`,
		`quality=${quality || 75}`,
		`format=auto`,
		`fit=cover`,
	].join(",");

	// 2. Determine if the source is an external URL (e.g., randomuser.me)
	const isExternal = src.startsWith("http://") || src.startsWith("https://");

	// 3. Environment Handling
	// Note: /cdn-cgi/image/ only works on the deployed Cloudflare domain.
	// We bypass this in development to avoid 404s on localhost.
	if (process.env.NODE_ENV !== "production" || isExternal) {
		return src;
	}

	// 4. Construct the Cloudflare Image Resizing Edge URL
	// Base endpoint provided by your Cloudflare setup
	const cloudflareEndpoint = "https://assets.daolanx.me/cdn-cgi/image";

	/**
	 * Normalize the source path:
	 * - If External: Use the full URL as is.
	 * - If Internal: Ensure it starts with a leading slash for the R2/Origin bucket.
	 */
	const normalizedSrc = src.startsWith("/") ? src : `/${src}`;

	// Final Format: https://<domain>/cdn-cgi/image/<options>/<source>
	return `${cloudflareEndpoint}/${params}${normalizedSrc}`;
}
