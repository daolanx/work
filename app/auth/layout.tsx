import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import LocaleSwitch from "@/features/console/profile/components/locale-switch";
import { AuthBackground } from "./background";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
				<AuthBackground />
				<div className="absolute top-4 right-4 z-20">
					<LocaleSwitch />
				</div>
				<main className="relative z-10 flex w-full flex-col items-center bg-transparent">
					{children}
				</main>
			</div>
		</NextIntlClientProvider>
	);
}
