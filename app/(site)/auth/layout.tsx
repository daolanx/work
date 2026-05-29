import ThemeSwitch from "@/components/ui/theme-switch";
import LocaleSwitch from "@/features/console/profile/components/locale-switch";
import { AuthBackground } from "./background";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
			<AuthBackground />
			<div className="absolute top-4 right-4 z-20 space-x-2">
				<ThemeSwitch />
				<LocaleSwitch />
			</div>
			<main className="relative z-10 flex w-full flex-col items-center bg-transparent">
				{children}
			</main>
		</div>
	);
}
