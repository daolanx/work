import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * Environment constants
 */
const IS_PROD = process.env.NODE_ENV === "production";
const ASSETS_DOMAIN = "https://assets.daolanx.me";

/**
 * CDN and Static Assets Configuration
 * Handles assetPrefix for JS/CSS and RemotePatterns for next/image
 */
const cdnConfig: Partial<NextConfig> = {
	// Use R2 domain for static assets in production to reduce main server load
	assetPrefix: IS_PROD ? ASSETS_DOMAIN : undefined,

	images: {
		// Set to true if not using Vercel's native image optimization to save costs
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "assets.daolanx.me",
				pathname: "/**",
			},
		],
	},
};

/**
 * Core Next.js Configuration
 */
const nextConfig: NextConfig = {
	...cdnConfig,

	// Add other standard Next.js settings here
	reactStrictMode: true,
	// compiler: { removeConsole: IS_PROD }
};

/**
 * Internationalization (i18n) Setup
 * Wraps the configuration with next-intl plugin
 */
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
