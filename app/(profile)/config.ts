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
	locale: {
		en: SiteContent;
		zh: SiteContent;
	};
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
		locale: {
			en: {
				title: "Landing Page",
				description:
					"Responsive, High-Performance, and Cost-Effective: Optimizing Speed and Costs with Cloudflare R2 and Workers.",
			},
			zh: {
				title: "品牌落地页",
				description:
					"支持响应式且性能优秀性价比高，使用 Cloudflare R2 和 Worker 优化速度和成本。",
			},
		},
	},
	{
		previewUrl: "/images/console-page.webp",
		webUrl: "/console",
		sourceUrl: "https://github.com/daolanx/work/tree/main/app/console",
		keywords: ["Shadcn", "Drizzle", "Neon", "SWR", "Better-Auth", "Creem"],
		locale: {
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
	},

	{
		previewUrl: "/images/flower-shop.webp",
		webUrl: "/flower-shop",
		sourceUrl: "https://github.com/daolanx/work/tree/main/app/flower-shop",
		isDeveloping: false,
		keywords: ["Next.js", "Tailwind CSS", "Motion", "Figma", "Claude Code"],
		locale: {
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
		locale: {
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
	},
];

export async function getSites(): Promise<Site[]> {
	const lang = (await getLocale()) as Locale;
	return sites.map((site) => {
		const { locale, ...rest } = site;
		return {
			...rest,
			...locale[lang],
		};
	});
}
