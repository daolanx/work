import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/constants";
import { LOCALES } from "@/i18n/constants";

export type Portfolio = {
	id: number;
	title: string;
	keywords: string[];
	description: string;
	previewUrl: string;
	webUrl: string;
	sourceUrl: string;
	isDeveloping?: boolean;
};

export async function getPortfolios(
	lang?: string | null,
): Promise<Portfolio[]> {
	const locale =
		lang && LOCALES.includes(lang as Locale)
			? (lang as Locale)
			: ((await getLocale()) as Locale);
	const payload = await getPayload({ config });

	const result = await payload.find({
		collection: "sites",
		sort: "_order",
		depth: 1,
		locale,
	});

	return result.docs.map((site) => {
		const preview = site.preview as { url?: string } | null | undefined;
		return {
			id: Number(site.id),
			title: site.title ?? "",
			description: site.description ?? "",
			keywords: (site.keywords ?? "")
				.split(",")
				.map((kw: string) => kw.trim())
				.filter(Boolean),
			previewUrl: preview?.url ?? "",
			webUrl: site.webUrl ?? "",
			sourceUrl: site.sourceUrl ?? "",
			isDeveloping: site.isDeveloping ?? false,
		};
	});
}
