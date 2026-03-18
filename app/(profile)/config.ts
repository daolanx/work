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
			description: "Responsive with high-performance capabilities.",
		},
		zh: {
			title: "品牌落地页",
			description: "具备响应性和优秀的性能",
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
				"Includes authentication, RBAC, Payment,and task management modules.",
		},
		zh: {
			title: "控制台页面",
			description: "具备登录，支付，角色管理，任务管理功能。",
		},
	},
	{
		previewUrl: "/images/ai-chat-page.webp",
		webUrl: "/ai-chat",
		sourceUrl: "https://github.com/daolanx/work/tree/main/app/ai-chat",
		keywords: ["Next.js", "Vercel AI SDK", "OpenRouter SDK"],
		en: {
			title: "AI Chat Page",

			description:
				"AI Large Language Model (LLM) chat interface with streaming response input",
		},
		zh: {
			title: "AI 对话页",
			description: "AI 大模型对话界面，输入问题流式响应。",
		},
	},

	{
		previewUrl: "/images/flower-shop.webp",
		webUrl: "https://demo.daolanx.com/flower-shop",
		sourceUrl: "https://github.com/daolanx/demo",
		isDeveloping: false,
		keywords: ["Next.js", "Tailwind CSS", "Motion", "Figma", "Claude Code"],
		en: {
			title: "E-commerce Page",
			description:
				"A responsive and accessible flower shop e-commerce page. Developed using Claude Code and Figma-assisted coding, featuring high-fidelity design reproduction and post-development optimization.",
		},
		zh: {
			title: "电商页面",
			description:
				"花店电商页面，响应式设计，支持无障碍访问，Claude Code + Figma 辅助编程，设计稿高精度还原，加上后期优化。",
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
