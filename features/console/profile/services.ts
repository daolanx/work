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
	});

	return result.docs.map((site) => ({
		title: site.title ?? "",
		description: site.description ?? "",
		keywords: (site.keywords ?? []).map((kw) => kw.keyword ?? ""),
		previewUrl: site.previewUrl ?? "",
		webUrl: site.webUrl ?? "",
		sourceUrl: site.sourceUrl ?? "",
		isDeveloping: site.isDeveloping ?? false,
	}));
}
