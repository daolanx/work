import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/constants";

export type Site = {
	title: string;
	keywords: string[];
	description: string;
	previewUrl: string;
	webUrl: string;
	sourceUrl: string;
	isDeveloping?: boolean;
};

export async function getSites(): Promise<Site[]> {
	const lang = (await getLocale()) as Locale;
	const payload = await getPayload({ config });

	const result = await payload.find({
		collection: "sites",
		locale: lang,
		sort: "_order",
		depth: 1,
	});

	return result.docs.map((site: any) => {
		const preview = site.preview as { url?: string } | null | undefined;
		return {
			title: site.title ?? "",
			description: site.description ?? "",
			keywords: (site.keywords ?? "")
				.split(",")
				.map((kw) => kw.trim())
				.filter(Boolean),
			previewUrl: preview?.url ?? "",
			webUrl: site.webUrl ?? "",
			sourceUrl: site.sourceUrl ?? "",
			isDeveloping: site.isDeveloping ?? false,
		};
	});
}
