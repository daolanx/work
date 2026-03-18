import { Toaster } from "sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { SiteHeader } from "./_components/app-sidebar/site-header";
import { SWRProvider } from "./_components/swr-provider";

export default function ConsoleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
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
					<SiteHeader />

					{/* Main content wrapper */}
					<div className="flex flex-1 flex-col">
						<div className="@container/main flex flex-1 flex-col gap-2">
							{children}
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</SWRProvider>
	);
}
