import { Home as HomeIcon } from "lucide-react";

export const revalidate = 3600;

import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import ThemeSwitch from "@/components/ui/theme-switch";
import { DemoCard } from "@/features/console/profile/components/demo-card";
import { FadeIn } from "@/features/console/profile/components/fade-in";
import LocaleSwitch from "@/features/console/profile/components/locale-switch";
import { getSites } from "@/features/console/profile/services";

const metadataBase = new URL("https://demo.daolanx.com");

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("profile");
	const title = t("gallery-title");
	const description = t("intro");

	return {
		title,
		description,
		metadataBase,
		alternates: {
			canonical: "/",
		},
		openGraph: {
			title,
			description,
			url: "/",
			siteName: "Dax's Demo Gallery",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
	};
}

async function SiteList() {
	const t = await getTranslations("profile");
	const sites = await getSites();

	return (
		<div className="space-y-12">
			{sites.map((site, index) => (
				<FadeIn delay={0.1 + index * 0.1} key={site.id}>
					<DemoCard>
						{/* Title */}
						<div className="px-8 pt-8">
							<h2 className="font-semibold text-2xl text-neutral-900 md:text-3xl dark:text-neutral-100">
								{site.title}
							</h2>
						</div>

						{/* Image Container */}
						{site.previewUrl && (
							<div className="relative mx-8 mt-6 aspect-[21/9] overflow-hidden border border-neutral-200 dark:border-neutral-800">
								<Image
									alt={`${site.title} - ${site.description}`}
									className="cursor-default object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
									fetchPriority={index === 0 ? "high" : "auto"}
									fill
									priority={index === 0}
									sizes="(max-width: 1024px) calc(100vw - 96px), 928px"
									src={site.previewUrl}
								/>
							</div>
						)}

						{/* Description */}
						<div className="mt-6 px-8">
							<p className="whitespace-pre-line text-neutral-500 leading-relaxed dark:text-neutral-400">
								{site.description}
							</p>
						</div>

						{/* Tags & Actions */}
						<div className="px-8 pb-8">
							<div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-neutral-100 border-t pt-6 dark:border-neutral-800">
								<div className="flex flex-wrap gap-2">
									{site.keywords.map((keyword, ki) => (
										<span
											className="bg-neutral-100 px-3 py-1.5 font-medium text-neutral-600 text-xs tracking-wide dark:bg-neutral-800 dark:text-neutral-400"
											key={`${site.id}-${ki}`}
										>
											{keyword}
										</span>
									))}
								</div>
								<div className="flex items-center gap-3">
									<a
										className="border border-neutral-300 px-4 py-2 text-neutral-900 text-sm transition-colors hover:bg-blue-700 hover:text-white dark:border-neutral-600 dark:text-neutral-100 dark:hover:bg-blue-600 dark:hover:text-white"
										href={site.sourceUrl}
										rel="noopener noreferrer"
										target="_blank"
									>
										{t("view-source")}
									</a>
									<a
										className="border border-neutral-300 px-4 py-2 text-neutral-900 text-sm transition-colors hover:bg-neutral-900 hover:text-white dark:border-neutral-600 dark:text-neutral-100 dark:hover:bg-white dark:hover:text-neutral-900"
										href={site.webUrl}
										rel="noopener noreferrer"
										target="_blank"
									>
										{t("view-site")}
									</a>
								</div>
							</div>
						</div>
					</DemoCard>
				</FadeIn>
			))}
		</div>
	);
}

function SiteListSkeleton() {
	return (
		<div className="space-y-12">
			{Array.from({ length: 4 }).map((_, i) => (
				<div
					className="animate-pulse rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
					key={i}
				>
					<div className="mx-8 mt-8 h-8 w-1/3 rounded bg-neutral-200 dark:bg-neutral-700" />
					<div className="mx-8 mt-6 aspect-[21/9] rounded bg-neutral-200 dark:bg-neutral-700" />
					<div className="mx-8 mt-6 space-y-2 px-0">
						<div className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-700" />
						<div className="h-4 w-2/3 rounded bg-neutral-200 dark:bg-neutral-700" />
					</div>
					<div className="mx-8 mt-6 flex gap-2 pb-8">
						<div className="h-6 w-16 rounded bg-neutral-200 dark:bg-neutral-700" />
						<div className="h-6 w-16 rounded bg-neutral-200 dark:bg-neutral-700" />
						<div className="h-6 w-16 rounded bg-neutral-200 dark:bg-neutral-700" />
					</div>
				</div>
			))}
		</div>
	);
}

export default async function Home() {
	const t = await getTranslations("profile");

	return (
		<main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
			{/* Header - Fixed at top, full width */}
			<header className="sticky top-0 z-50 flex items-center justify-between border-neutral-200 border-b bg-neutral-50/80 px-6 py-4 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/80">
				<a
					className="p-1 text-neutral-900 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300"
					href="https://www.daolanx.com/"
					rel="noopener noreferrer"
					target="_blank"
					title={t("home-title")}
				>
					<HomeIcon size={20} />
				</a>
				<div className="flex items-center gap-4">
					<ThemeSwitch />
					<LocaleSwitch />
				</div>
			</header>

			<div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
				{/* Hero */}
				<FadeIn className="mb-16 text-center" delay={0}>
					<h1 className="mb-6 font-semibold text-5xl text-neutral-900 tracking-tight md:text-7xl dark:text-neutral-100">
						{t("gallery-title")}
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-neutral-500 leading-relaxed md:text-xl dark:text-neutral-400">
						<span className="font-serif italic"> {t("intro")} 🛠️ ❤️ </span>
					</p>
				</FadeIn>

				{/* Demo Cards */}
				<Suspense fallback={<SiteListSkeleton />}>
					<SiteList />
				</Suspense>

				{/* Footer */}
				<FadeIn delay={0.4}>
					<footer className="mt-20 border-neutral-200 border-t pt-8 dark:border-neutral-800">
						<div className="flex flex-col items-center gap-1">
							<div className="flex flex-wrap items-center justify-center gap-x-3 text-neutral-500 text-sm dark:text-neutral-400">
								<span>Dax © 2026</span>
								<span
									aria-hidden="true"
									className="text-neutral-300 dark:text-neutral-600"
								>
									|
								</span>
								<nav aria-label="Footer Links" className="flex gap-x-3">
									{[
										{
											href: "https://github.com/daolanx",
											label: "GitHub",
										},
										{
											href: "https://x.com/daolanx",
											label: "Twitter",
										},
										{
											href: "mailto:daolanx.dev@gmail.com",
											label: "Email",
										},
									].map((item) => (
										<a
											className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
											href={item.href}
											key={item.label}
											{...(item.href.startsWith("http")
												? { rel: "noopener noreferrer", target: "_blank" }
												: {})}
										>
											{item.label}
										</a>
									))}
								</nav>
							</div>
						</div>
					</footer>
				</FadeIn>
			</div>
		</main>
	);
}
