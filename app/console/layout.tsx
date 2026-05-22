import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Toaster } from "sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/features/console/components/layouts/header";
import { AppSidebar } from "@/features/console/components/layouts/sidebar";
import { SWRProvider } from "@/features/console/components/providers/swr-provider";

export default async function ConsoleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<SWRProvider>
				<Toaster position="top-center" richColors visibleToasts={1} />
				<SidebarProvider
					style={
						{
							"--sidebar-width": "calc(var(--spacing) * 72)",
							"--header-height": "calc(var(--spacing) * 12)",
						} as React.CSSProperties
					}
				>
					<AppSidebar variant="inset" />
					<SidebarInset>
						<Header />
						<div className="flex flex-1 flex-col">
							<div className="@container/main flex flex-1 flex-col gap-2">
								{children}
							</div>
						</div>
					</SidebarInset>
				</SidebarProvider>
			</SWRProvider>
		</NextIntlClientProvider>
	);
}
