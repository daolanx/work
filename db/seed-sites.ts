import "dotenv/config";

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

const sitesData = [
	{
		webUrl: "/landing",
		sourceUrl: "https://github.com/daolanx/work/tree/main/app/landing",
		isDeveloping: false,
		keywords: "Next.js,TwindCSS,MagicUI,Motion,Cloudflare",
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
	{
		webUrl: "/console",
		sourceUrl: "https://github.com/daolanx/work/tree/main/app/console",
		isDeveloping: false,
		keywords: "Shadcn,Drizzle,Neon,SWR,Better-Auth,Creem",
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
		webUrl: "/flower-shop",
		sourceUrl: "https://github.com/daolanx/work/tree/main/app/flower-shop",
		isDeveloping: false,
		keywords: "Next.js,Tailwind CSS,Motion,Figma,Claude Code",
		en: {
			title: "E-commerce Page",
			description:
				"Responsive and accessible flower shop e-commerce platform, achieving high-fidelity design-to-code reproduction via Claude Code and Figma MCP.",
		},
		zh: {
			title: "电商页面",
			description:
				"花店电商页面，响应式设计，支持无障碍访问，使用 Claude Code + Figma MCP 实现设计稿高精度还原。",
		},
	},
	{
		webUrl: "/ai-chat",
		sourceUrl: "https://github.com/daolanx/work/tree/main/app/ai-chat",
		isDeveloping: false,
		keywords: "Next.js,Vercel AI SDK,OpenRouter SDK,Stitch,Claude Code",
		en: {
			title: "AI Chat Page",
			description:
				"AI chat interface featuring streaming responses, built with Stitch UI and powered by Claude Code for intelligent coding assistance.",
		},
		zh: {
			title: "AI 对话页",
			description:
				"AI 对话界面，支持流式响应输入,使用 Stitch 设计页面和 Claude Code 辅助开发。",
		},
	},
];

async function seedSites() {
	// Clear existing data
	await sql`DELETE FROM payload.sites_locales`;
	await sql`DELETE FROM payload.sites`;
	await sql`DELETE FROM payload.media`;
	console.log("Cleared existing sites, locales, and media records.");

	// Create placeholder media records
	const imageNames = [
		"landing-page.webp",
		"console-page-v2.webp",
		"flower-shop.webp",
		"ai-chat-page.webp",
	];

	const mediaIds: number[] = [];
	for (const name of imageNames) {
		const result = await sql`
			INSERT INTO payload.media (filename, alt, updated_at, created_at)
			VALUES (${name}, ${name.replace(".webp", "").replace(/-/g, " ")}, NOW(), NOW())
			RETURNING id
		`;
		mediaIds.push(Number(result[0].id));
		console.log(`  ✓ media: ${name} (id: ${result[0].id})`);
	}

	// Insert sites and their localized content
	for (let i = 0; i < sitesData.length; i++) {
		const site = sitesData[i];
		const previewId = mediaIds[i];
		const order = String(i + 1).padStart(5, "0");

		// Insert site record
		const siteResult = await sql`
			INSERT INTO payload.sites (_order, preview_id, web_url, source_url, is_developing, keywords)
			VALUES (${order}, ${previewId}, ${site.webUrl}, ${site.sourceUrl}, ${site.isDeveloping}, ${site.keywords})
			RETURNING id
		`;
		const siteId = Number(siteResult[0].id);

		// Insert English locale
		await sql`
			INSERT INTO payload.sites_locales (title, description, _locale, _parent_id)
			VALUES (${site.en.title}, ${site.en.description}, 'en', ${siteId})
		`;

		// Insert Chinese locale
		await sql`
			INSERT INTO payload.sites_locales (title, description, _locale, _parent_id)
			VALUES (${site.zh.title}, ${site.zh.description}, 'zh', ${siteId})
		`;

		console.log(`  ✓ ${site.en.title}`);
	}

	console.log(`\nSeeded ${sitesData.length} sites with localized content.`);
}

seedSites()
	.then(() => process.exit(0))
	.catch((e) => {
		console.error("Seed failed:", e);
		process.exit(1);
	});
