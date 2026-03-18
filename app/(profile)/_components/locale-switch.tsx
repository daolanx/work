"use client";

import { getCookie, setCookie } from "cookies-next";
import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { defaultLocale, LOCALE_COOKIE_NAME, locales } from "@/i18n/config";

export default function LanguageToggle() {
	const locale = getCookie(LOCALE_COOKIE_NAME);
	const router = useRouter();

	return <Languages className="cursor-pointer" onClick={handleLocaleSwitch} />;

	function handleLocaleSwitch() {
		const newLoacle = locales.find((temp) => temp !== locale) || defaultLocale;
		setCookie(LOCALE_COOKIE_NAME, newLoacle);
		router.refresh();
	}
}
