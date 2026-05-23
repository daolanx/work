import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, LOCALES } from "@/i18n/constants";

function isValidLocale(value: string): value is (typeof LOCALES)[number] {
	return LOCALES.includes(value as (typeof LOCALES)[number]);
}

export default getRequestConfig(async () => {
	const store = await cookies();
	const value = store.get(LOCALE_COOKIE_NAME)?.value;
	const locale = value && isValidLocale(value) ? value : DEFAULT_LOCALE;
	const messages = (await import(`../messages/${locale}.json`)).default;

	return {
		locale,
		messages,
	};
});
