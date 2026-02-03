import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
	assetPrefix: isProd ? "https://assets.daolanx.me" : undefined,
	images: {
		loader: "custom", // 🚀 关键：启用自定义加载器
		loaderFile: "./lib/image-loader.ts", // 指定加载器文件路径
	},
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
