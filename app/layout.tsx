import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";

import "@/app/globals.css";

export default async function LocaleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const locale = await getLocale();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					disableTransitionOnChange
					enableSystem
				>
					<NextIntlClientProvider>{children}</NextIntlClientProvider>
				</ThemeProvider>
				<Script
					data-website-id="f6e47b9c-c1f0-4c75-9bcd-843e2630e8b3"
					src="https://cloud.umami.is/script.js"
					strategy="afterInteractive"
				/>
			</body>
		</html>
	);
}
