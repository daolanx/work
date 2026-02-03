export default function myImageLoader({ src }: { src: string }) {
	if (src.startsWith("http") || process.env.NODE_ENV !== "production") {
		return src;
	}
	// cloudflare R2
	return `https://assets.daolanx.me${src}`;
}
