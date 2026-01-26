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
import type { Site } from "../config";

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
				className="relative h-full overflow-hidden rounded-xl p-5 transition-all duration-300 hover:shadow-md md:p-6"
				gradientColor={theme === "dark" ? "#262626" : "#f5f5f5"}
			>
				{isDeveloping && (
					<div className="absolute inset-0 z-50 flex cursor-not-allowed items-center justify-center bg-white/60 backdrop-blur-[2px] dark:bg-black/40">
						<Badge className="flex gap-2 rounded-full bg-slate-900 px-4 py-1 text-sm text-white dark:bg-white dark:text-black">
							<TrafficCone className="size-4 text-orange-400" />
							Developing...
						</Badge>
					</div>
				)}

				<div className="mb-4 flex items-center justify-between border-b pb-3">
					<h3 className="font-bold font-sans text-xl tracking-tight">
						{title}
					</h3>
				</div>

				<div className="flex flex-col gap-5 md:flex-row">
					<div className="w-full shrink-0 md:w-[42%]">
						<div className="group overflow-hidden rounded-lg border bg-muted shadow-sm">
							<Image
								alt={`${title} preview`}
								className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
								height={240}
								priority
								src={previewUrl}
								width={400}
							/>
						</div>
					</div>

					<div className="flex flex-1 flex-col justify-between">
						<div>
							<p className=" text-sm leading-relaxed md:text-base">
								{description}
							</p>

							<div className="mt-3 flex flex-wrap gap-2">
								{keywords.map((keyword) => (
									<Badge
										className="rounded-md px-2 py-0 text-sm  "
										key={keyword}
										variant="secondary"
									>
										{keyword}
									</Badge>
								))}
							</div>
						</div>

						<div className="mt-6 flex flex-wrap items-center gap-3 md:justify-end">
							<Button
								asChild
								className="h-9 gap-1.5 border-blue-200 bg-blue-50/50 text-blue-600 hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-400"
								size="sm"
								variant="outline"
							>
								<Link href={webUrl} target="_blank">
									{t("view-site")} <ArrowUpRight className="size-4" />
								</Link>
							</Button>

							<Button
								asChild
								className="h-9 gap-1.5 border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400"
								size="sm"
								variant="outline"
							>
								<Link href={sourceUrl} target="_blank">
									{t("view-source")} <ArrowUpRight className="size-4" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</MagicCard>
		</motion.div>
	);
}
