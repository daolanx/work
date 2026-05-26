import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
	assetPrefix: isProd ? "https://demo.daolanx.com/remote-assets" : undefined,
	images: {
		loader: "custom",
		loaderFile: "./lib/image-loader.ts",
		deviceSizes: [480, 640, 828, 1120, 1920],
		imageSizes: [64, 256],
	},
	transpilePackages: ["recharts", "react-smooth", "shiki"],
	experimental: {
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

const withNextIntl = createNextIntlPlugin();

// executed in order from left to right
const plugins = [withNextIntl, withPayload];

// 3. 优雅地聚合导出
export default plugins.reduce((config, plugin) => plugin(config), nextConfig);
