"use client";

import { setCookie } from "cookies-next";
import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, LOCALES } from "@/i18n/constants";

export default function LocaleSwitch() {
	const locale = useLocale();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<button
			aria-label="Switch language"
			className="cursor-pointer p-1 text-neutral-600 transition-colors hover:text-neutral-900 disabled:cursor-not-allowed dark:text-neutral-400 dark:hover:text-neutral-100"
			disabled={isPending}
			onClick={handleLocaleSwitch}
			type="button"
		>
			<Languages
				className={isPending ? "animate-pulse opacity-50" : ""}
				size={20}
			/>
		</button>
	);

	function handleLocaleSwitch() {
		const newLocale = LOCALES.find((l) => l !== locale) || DEFAULT_LOCALE;
		setCookie(LOCALE_COOKIE_NAME, newLocale, { path: "/" });

		startTransition(() => {
			router.refresh();
		});
	}
}
