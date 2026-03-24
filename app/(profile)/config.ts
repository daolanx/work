import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/config";

type SiteContent = {
	title: string;
	description: string;
};

type SiteMeta = {
	previewUrl: string;
	webUrl: string;
	sourceUrl: string;
	keywords: string[];
	isDeveloping?: boolean;
	en: SiteContent;
	zh: SiteContent;
};

export type Site = {
	title: string;
	keywords: string[];
	description: string;
	previewUrl: string;
	webUrl: string;
	sourceUrl: string;
	isDeveloping?: boolean;
};

const sites: SiteMeta[] = [
	{
		previewUrl: "/images/landing-page.webp",
		webUrl: "/landing",
		sourceUrl: "https://github.com/daolanx/work/tree/main/app/landing",
		keywords: ["Next.js", "TwindCSS", "MagicUI", "Motion", "Cloudflare"],

		en: {
			title: "Landing Page",
			description: "Responsive, performance-driven landing page.",
		},
		zh: {
			title: "品牌落地页",
			description: "具备响应性和优秀的性能的落地页。",
		},
	},
	{
		previewUrl: "/images/console-page.webp",
		webUrl: "/console",
		sourceUrl: "https://github.com/daolanx/work/tree/main/app/console",
		keywords: ["Shadcn", "Drizzle", "Neon", "SWR", "Better-Auth", "Creem"],
		en: {
			title: "Console Page",
			description:
				"Comprehensive admin dashboard with built-in auth, payments, role-based permissions, and task tracking.",
		},
		zh: {
			title: "控制台页面",
			description: "具备登录，支付，角色管理，任务管理功能的控制台。",
		},
	},

	{
		previewUrl: "/images/flower-shop.webp",
		webUrl: "/flower-shop",
		sourceUrl: "https://github.com/daolanx/demo",
		isDeveloping: false,
		keywords: ["Next.js", "Tailwind CSS", "Motion", "Figma", "Claude Code"],
		en: {
			title: "E-commerce Page",
			description:
				"Responsive and accessible flower shop e-commerce platform, \nachieving high-fidelity design-to-code reproduction via Claude Code and Figma MCP.",
		},
		zh: {
			title: "电商页面",
			description:
				"花店电商页面，响应式设计，支持无障碍访问，\n使用 Claude Code + Figma MCP 实现设计稿高精度还原。",
		},
	},

	{
		previewUrl: "/images/ai-chat-page.webp",
		webUrl: "/ai-chat",
		sourceUrl: "https://github.com/daolanx/work/tree/main/app/ai-chat",
		keywords: [
			"Next.js",
			"Vercel AI SDK",
			"OpenRouter SDK",
			"Stitch",
			"Claude Code",
		],
		en: {
			title: "AI Chat Page",

			description:
				"AI chat interface featuring streaming responses, \nbuilt with Stitch UI and powered by Claude Code for intelligent coding assistance.",
		},
		zh: {
			title: "AI 对话页",
			description:
				"AI 对话界面，支持流式响应输入,\n使用 Stitch 设计页面和 Claude Code 辅助开发。",
		},
	},
];

export async function getSites(): Promise<Site[]> {
	const locale = (await getLocale()) as Locale;
	return sites.map((site) => ({
		previewUrl: site.previewUrl,
		webUrl: site.webUrl,
		sourceUrl: site.sourceUrl,
		keywords: site.keywords,
		isDeveloping: site.isDeveloping,
		...site[locale],
	}));
}
