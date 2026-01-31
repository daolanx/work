import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import LocaleSwitch from "./_components/locale-switch";
import SiteCard from "./_components/site-card";
import ThemeSwitch from "./_components/theme-switch";
import { getSites, type Site } from "./config";

const SKILLS = [
	{ name: "HTML", color: "hover:border-orange-400 hover:text-orange-600" },
	{ name: "CSS", color: "hover:border-blue-400 hover:text-blue-600" },
	{ name: "JavaScript", color: "hover:border-amber-400 hover:text-amber-700" },
	{ name: "React", color: "hover:border-cyan-400 hover:text-cyan-600" },
	{ name: "TailwindCSS", color: "hover:border-sky-400 hover:text-sky-600" },
	{ name: "Next.js", color: "hover:border-black dark:hover:border-white" },
];

export const metadata: Metadata = {
	title: "Dax's Profile",
	description: "Freelance Frontend Developer",
};

const CustomLink = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => (
	<Link
		className="text-blue-500 underline transition-opacity hover:opacity-80"
		href={href}
		rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
		target={href.startsWith("mailto") ? undefined : "_blank"}
	>
		{children}
	</Link>
);

export default async function Home() {
	const t = await getTranslations("profile");
	const sites: Site[] = await getSites();

	return (
		<div className="mx-auto max-w-6xl px-4 sm:px-6">
			<header className="flex items-center justify-between py-6">
				<h1 className="font-bold text-xl md:text-2xl">{t("title")}</h1>
				<nav className="flex items-center gap-4">
					<LocaleSwitch />
					<ThemeSwitch />
				</nav>
			</header>

			<main className="space-y-12 pb-20">
				<section className="flex flex-col items-center gap-8 pt-4 font-mono md:flex-row md:items-start md:text-xl">
					<div className="group flex-shrink-0 transition-transform duration-300 hover:rotate-3 hover:scale-105">
						<Image
							alt="Dax's avatar"
							className="h-24 w-24 rounded-full border-4 border-r-amber-600 border-l-blue-500 p-1 md:h-32 md:w-32"
							height={150}
							priority
							src="/profile/avatar.webp"
							width={150}
						/>
					</div>

					<div className="flex-1 space-y-4 text-center md:pt-2 md:text-left">
						<p className="leading-relaxed">{t("intro")}</p>
						<div className="leading-relaxed">
							{t.rich("contact", {
								blog: (c) => (
									<CustomLink href="https://www.daolanx.me/">{c}</CustomLink>
								),
								github: (c) => (
									<CustomLink href="https://github.com/daolanx">{c}</CustomLink>
								),
								twitter: (c) => (
									<CustomLink href="https://x.com/daolanx">{c}</CustomLink>
								),
								email: (c) => (
									<CustomLink href="mailto:daolanx.dev@gmail.com">
										{c}
									</CustomLink>
								),
							})}
						</div>
					</div>
				</section>

				<section className="border-slate-100 border-t pt-8 dark:border-slate-800">
					<h2 className="mb-6 inline-block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text font-bold text-transparent text-xl">
						{t("my-skills")}
					</h2>
					<ul className="flex flex-wrap gap-3">
						{SKILLS.map((skill) => (
							<li key={skill.name}>
								<Badge
									className={`cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-sm md:px-4 md:py-1.5 md:text-base ${skill.color}`}
									variant="outline"
								>
									{skill.name}
								</Badge>
							</li>
						))}
					</ul>
				</section>

				<section className="border-slate-100 border-t pt-8 dark:border-slate-800">
					<h2 className="mb-6 inline-block bg-gradient-to-r from-orange-600 to-purple-500 bg-clip-text font-bold text-transparent text-xl">
						{t("my-projects")}
					</h2>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{sites.map((site: Site) => (
							<SiteCard key={site.title} {...site} />
						))}
					</div>
				</section>
			</main>
		</div>
	);
}
