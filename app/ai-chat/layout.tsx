import { Bot } from "lucide-react";
import { IconGithub } from "@/components/auth/icon-github";

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="mx-auto flex h-screen max-w-4xl flex-col">
			<header className="sticky top-0 mb-2 flex flex w-full items-center justify-between border-b-1 border-b-gray-300 bg-white p-4 dark:bg-background">
				<div className="flex items-center">
					<Bot className="mr-2 text-current" />
					<h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text font-bold text-2xl text-transparent">
						AI Chat
					</h1>
				</div>
				<IconGithub />
			</header>
			{children}
			<footer>
				<p className="p-4 text-gray-600 text-sm">
					&copy; {new Date().getFullYear()} Dax INC. All rights reserved.
				</p>
			</footer>
		</div>
	);
}
