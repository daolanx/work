import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
	/**
	 * IMPORTANT: Point this to your Worker path on the MAIN domain.
	 * This ensures all JS/CSS are served from demo.daolanx.com/remote-assets/
	 */
	assetPrefix: isProd ? "https://demo.daolanx.com/remote-assets" : undefined,

	images: {
		loader: "custom",
		loaderFile: "./lib/image-loader.ts",
		// Keep your sizes as they will be passed as 'w' parameter to the loader
		deviceSizes: [480, 640, 828, 1120, 1920],
		imageSizes: [64, 256],
	},

	transpilePackages: ["recharts", "react-smooth", "shiki"],
	experimental: {
		optimizeCss: true,
		optimizePackageImports: [
			"lucide-react",
			"recharts",
			"@tabler/icons-react",
			"motion/react",
			"motion/react-m",
		],
	},
	reactCompiler: true,
	turbopack: {
		resolveAlias: {
			"../build/polyfills/polyfill-module": "./lib/modern-polyfill.js",
			"next/dist/build/polyfills/polyfill-module": "./lib/modern-polyfill.js",
		},
	},
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
