"use client";

import { ArrowUpRight, TrafficCone } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import type { Site } from "../api/profile/site";

export default function SiteCard(props: Site) {
	const { theme } = useTheme();
	const t = useTranslations("profile");
	const {
		title,
		previewUrl,
		description,
		webUrl,
		sourceUrl,
		isDeveloping,
		keywords,
	} = props;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			viewport={{ once: true, amount: 0.2 }}
			whileInView={{ opacity: 1, y: 0 }}
		>
			<MagicCard
				className="relative mb-6 rounded-xl p-6 transition-all duration-300 hover:shadow-sm"
				gradientColor={theme === "dark" ? "#000" : "#fff"}
			>
				{isDeveloping && (
					<div className="absolute inset-0 z-50 flex cursor-not-allowed items-center justify-center bg-white/60 backdrop-blur-[2px] dark:bg-black/40">
						<Badge className="rounded-sm bg-gray-600 text-sm">
							<TrafficCone className="text-orange-400" /> Developing...
						</Badge>
					</div>
				)}

				<h3 className="mb-2 mb-4 flex justify-between border-b-1 pb-2 font-bold font-sans text-xl">
					<span>{title}</span>
				</h3>

				<div className="relative space-x-4 md:flex">
					<div className="mb-4 w-3/5 shrink-0 md:w-[40%]">
						<Image
							alt="Landing Page Preview"
							className="h-auto w-full rounded-lg object-cover shadow"
							height={200}
							src={previewUrl}
							width={300}
						/>
					</div>

					<div className="flex flex-col">
						<p>{description}</p>
						<div className="mt-2 space-x-2 md:pb-16">
							{keywords.map((keyword) => (
								<Badge className="rounded-sm" key={keyword} variant="secondary">
									{keyword}
								</Badge>
							))}
						</div>
						<div className="space-x-2 pt-4 md:absolute md:right-0 md:bottom-0 md:text-right">
							<Button
								asChild
								className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/60 dark:hover:text-blue-300"
							>
								<Link href={webUrl} target="_blank">
									{t("view-site")} <ArrowUpRight />
								</Link>
							</Button>

							<Button
								asChild
								className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/60 dark:hover:text-blue-300"
							>
								<Link href={sourceUrl} target="_blank">
									{t("view-source")} <ArrowUpRight />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</MagicCard>
		</motion.div>
	);
}
