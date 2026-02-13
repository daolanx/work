interface LoaderProps {
	src: string;
	width: number;
	quality?: number;
}

export default function myImageLoader({ src, width, quality }: LoaderProps) {
	const params = new URLSearchParams({
		width: width.toString(),
		quality: (quality || 75).toString(),
		format: "auto",
	});

	const path = (src.startsWith("http") || process.env.NODE_ENV !== "production")
		? src
		: `https://assets.daolanx.me${src}`;

	return `${path}?${params.toString()}`
}
