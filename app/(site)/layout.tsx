import { Epilogue, Manrope } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

const epilogue = Epilogue({
	subsets: ["latin"],
	variable: "--font-heading",
	weight: ["400", "600", "700"],
});

const manrope = Manrope({
	subsets: ["latin"],
	variable: "--font-body",
	weight: ["400", "500", "600"],
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const locale = await getLocale();

	return (
		<html
			className={cn(epilogue.variable, manrope.variable)}
			lang={locale}
			suppressHydrationWarning
		>
			<head>
				<link href="https://cloud.umami.is" rel="dns-prefetch" />
			</head>
			<body>
				<NextIntlClientProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						disableTransitionOnChange
						enableSystem
					>
						{children}
					</ThemeProvider>
				</NextIntlClientProvider>
				<Script
					data-website-id="2008e087-18a7-43de-8901-4f580e9ddabc"
					src="https://cloud.umami.is/script.js"
					strategy="lazyOnload"
				/>
			</body>
		</html>
	);
}
