import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getSites, type Site } from "@/app/(profile)/api/profile/site";
import LocaleSwitch from "@/components/profile/localeSwitch";
import SiteCard from "@/components/profile/site-card";
import ThemeSwitch from "@/components/profile/themeSwitch";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
	title: "Dax's Profile",
	description: "Freelance Frontend Developer",
};
export default async function Home() {
	const t = await getTranslations("profile");
	const sites: Site[] = await getSites();

	return (
		<>
			<header className="mx-auto mt-4 mb-4 flex max-w-2xl justify-between px-2">
				<h1 className="font-bold text-xl md:text-2xl">{t("title")}</h1>
				<div className="flex items-center justify-between space-x-4">
					<LocaleSwitch />
					<ThemeSwitch />
				</div>
			</header>
			<main className="mx-auto max-w-2xl">
				<section className="items-center gap-x-2 pt-10 font-mono md:flex md:text-xl">
					<Image
						alt="Dax's avatar"
						className="mx-auto w-1/4 rounded-full border-4 border-r-amber-600 border-l-blue-500 p-1 md:w-[30%]"
						height={628}
						src="/profile/avatar.webp"
						width={628}
					/>
					<div>
						<p className="w-full p-4">{t("intro")}</p>
						<p className="w-full p-4">
							{" "}
							{t.rich("contact", {
								blog: (children) => (
									<Link
										className="text-blue-500 underline"
										href="https://www.daolanx.me/"
										target="_blank"
									>
										{children}
									</Link>
								),
								github: (children) => (
									<Link
										className="text-blue-500 underline"
										href="https://github.com/daolanx"
										target="_blank"
									>
										{children}
									</Link>
								),
								twitter: (children) => (
									<Link
										className="text-blue-500 underline"
										href="https://x.com/daolanx"
										target="_blank"
									>
										{children}
									</Link>
								),
								email: (children) => (
									<Link
										className="text-blue-500 underline"
										href="mailto:daolanx@hotmail.com"
									>
										{children}
									</Link>
								),
							})}
						</p>
					</div>
				</section>
				<section className="mt-8 border-slate-100 border-t p-4">
					<h2 className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text pb-6 font-bold text-transparent text-xl">
						{t("my-skills")}
					</h2>

					<ul className="flex flex-wrap gap-3">
						{[
							{
								name: "HTML",
								color: "hover:border-orange-400  hover:text-orange-600",
							},

							{
								name: "CSS",
								color: "hover:border-blue-400  hover:text-blue-600",
							},

							{
								name: "JavaScript",
								color: "hover:border-amber-400  hover:text-amber-700",
							},

							{
								name: "React",
								color: "hover:border-cyan-400  hover:text-cyan-600",
							},

							{
								name: "TailwindCSS",
								color: "hover:border-sky-400  hover:text-sky-600",
							},

							{
								name: "Next.js",
								color: "hover:border-indigo-400  hover:text-indigo-600",
							},
						].map((skill) => (
							<li key={skill.name}>
								<Badge
									className={`font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm md:px-4 md:py-1.5 md:text-base ${skill.color}
          `}
									variant="outline"
								>
									{skill.name}
								</Badge>
							</li>
						))}
					</ul>
				</section>

				<section className="mt-8 border-slate-100 border-t p-4">
					<h2 className="bg-gradient-to-r from-orange-600 to-purple-500 bg-clip-text pb-6 font-bold text-transparent text-xl">
						{t("my-projects")}
					</h2>
					{sites.map((site: Site) => (
						<SiteCard key={site.title} {...site} />
					))}
				</section>
			</main>
		</>
	);
}
