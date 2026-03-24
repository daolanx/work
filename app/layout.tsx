import Script from "next/script";
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
			<head>
				<link href="https://cloud.umami.is" rel="dns-prefetch" />
				<link href="https://fonts.googleapis.com" rel="preconnect" />
				<link
					crossOrigin="anonymous"
					href="https://fonts.gstatic.com"
					rel="preconnect"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700&family=Manrope:wght@400;500;600&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					disableTransitionOnChange
					enableSystem
				>
					{children}
				</ThemeProvider>
				<Script
					data-website-id="2008e087-18a7-43de-8901-4f580e9ddabc"
					src="https://cloud.umami.is/script.js"
					strategy="lazyOnload"
				/>
			</body>
		</html>
	);
}
