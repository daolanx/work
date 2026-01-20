import { getLocale } from "next-intl/server";
import type { Locale } from "@/app/i18n/config";

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
		keywords: ["Next.js", "Twindcss", "MagicUI", "Motion"],

		en: {
			title: "Landing Page",
			description: "Responsive Brand Landing Page with Minimalist Animations.",
		},
		zh: {
			title: "品牌落地页",
			description: "品牌落地页，能响应式展现信息，具备少量的动态效果。",
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
		previewUrl: "/images/console-page.webp",
		webUrl: "/console",
		sourceUrl: "https://github.com/daolanx/work/tree/main/app/console",
		keywords: ["Shadcn/ui", "Drizzle", "Neon", "SWR"],
		en: {
			title: "Console Page",
			description:
				"Console Page, including a left-side menu and a right-side panel; permission management, data requests, and parallel loading.",
		},
		zh: {
			title: "控制台页面",
			description:
				"控制台页面, 包含左侧菜单和右侧面板, 权限管理，数据请求，并行加载。",
		},
	},
	{
		previewUrl: "/images/e-commerce-page.webp",
		webUrl: "x",
		sourceUrl: "x",
		isDeveloping: true,
		keywords: ["State Logic", "API", "Components"],
		en: {
			title: "E-commerce Page",

			description:
				"A high-performance storefront featuring complex state management and seamless shopping cart interactions. Responsive e-commerce interface optimized for core web vitals and conversion-driven UX.",
		},
		zh: {
			title: "电商页",
			description:
				"高性能电商前端，具备复杂的购物车状态管理和无缝交互。响应式界面针对核心 Web 指标优化，助力高转化率的交互体验。",
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
