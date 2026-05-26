interface LoaderProps {
	src: string;
	width: number;
	quality?: number;
}

const siteOrigin =
	process.env.NEXT_PUBLIC_SITE_URL || "https://demo.daolanx.com";
const isProd = process.env.NODE_ENV === "production";

function buildUrl(path: string, w: number, q?: number) {
	const params = `w=${w}&q=${q || 75}`;
	if (isProd) {
		// CMS uploads: use /medias/ prefix → files.daolanx.com
		if (path.startsWith("/medias/")) {
			return `${path}?${params}`;
		}
		// Static assets: use /remote-assets/ prefix → assets.daolanx.com
		const normalized = path.startsWith("/") ? path.slice(1) : path;
		return `/remote-assets/${normalized}?${params}`;
	}
	return `${path}?${params}`;
}

export default function myImageLoader({ src, width, quality }: LoaderProps) {
	// Own CDN images: strip origin, route through optimization pipeline
	if (src.startsWith("http")) {
		try {
			const url = new URL(src);
			if (url.origin === siteOrigin) {
				return buildUrl(url.pathname, width, quality);
			}
		} catch {
			// Malformed URL, fall through
		}
		// Third-party external images: use original URL
		return src;
	}

	// Local images
	return buildUrl(src, width, quality);
}
