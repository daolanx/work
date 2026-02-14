import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
	assetPrefix: isProd ? "https://assets.daolanx.me" : undefined,
	images: {
		loader: "custom",
		loaderFile: "./lib/image-loader.ts",
	},
	transpilePackages: ["recharts", "react-smooth", "shiki"],
	experimental: {
		optimizeCss: true,
		optimizePackageImports: [
			"lucide-react",
			"recharts",
			"@tabler/icons-react",
			"@radix-ui/react-icons",
		],
	},
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
