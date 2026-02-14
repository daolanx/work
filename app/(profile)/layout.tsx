import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export default async function ProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

	return (
		<NextIntlClientProvider messages={messages} locale={locale}>
			{children}
		</NextIntlClientProvider>
	);
}
