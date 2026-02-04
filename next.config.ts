import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
	assetPrefix: isProd ? "https://assets.daolanx.me" : undefined,
	images: {
		loader: "custom",
		loaderFile: "./lib/image-loader.ts",
	},
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
