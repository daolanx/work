"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import useSWR from "swr";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { fetcher } from "@/lib/fetcher";

const VISITOR_KEY = "visitors-profile";

type VisitorStat = { date: string; desktop: number; mobile: number };

export function VisitorChart() {
	const t = useTranslations("console");
	const locale = useLocale();
	const isMobile = useIsMobile();
	const [timeRange, setTimeRange] = useState("90d");

	const chartConfig = {
		visitors: { label: t("dashboard.visitors") },
		desktop: { label: t("dashboard.desktop"), color: "var(--primary)" },
		mobile: { label: t("dashboard.mobile"), color: "var(--primary)" },
	} satisfies ChartConfig;

	const TIME_RANGES = [
		{ value: "90d", label: t("dashboard.last-3-months"), days: 90 },
		{ value: "30d", label: t("dashboard.last-30-days"), days: 30 },
		{ value: "7d", label: t("dashboard.last-7-days"), days: 7 },
	] as const;
	const { data, isLoading } = useSWR<VisitorStat[]>(VISITOR_KEY, () =>
		fetcher<VisitorStat[]>("/api/console/user/visitors"),
	);

	useEffect(() => {
		if (isMobile) setTimeRange("7d");
	}, [isMobile]);

	const filteredData = useMemo(() => {
		if (!data) return [];
		const referenceDate = new Date("2024-06-30");
		const range = TIME_RANGES.find((r) => r.value === timeRange);
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - (range?.days || 90));

		return data.filter(
			(item: { date: string }) => new Date(item.date) >= startDate,
		);
	}, [data, timeRange, TIME_RANGES]);

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardTitle>{t("dashboard.total-visitors")}</CardTitle>
				<CardDescription>
					<span className="@[540px]/card:block hidden">
						{t("dashboard.total-visitors-desc")}
					</span>
					<span className="@[540px]/card:hidden">
						{t("dashboard.last-3-months")}
					</span>
				</CardDescription>
				<CardAction>
					<ToggleGroup
						className="*:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex hidden"
						onValueChange={(v) => v && setTimeRange(v)}
						type="single"
						value={timeRange}
						variant="outline"
					>
						{TIME_RANGES.map((range) => (
							<ToggleGroupItem key={range.value} value={range.value}>
								{range.label}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
					<Select onValueChange={setTimeRange} value={timeRange}>
						<SelectTrigger
							className="flex @[767px]/card:hidden w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
							size="sm"
						>
							<SelectValue placeholder={t("dashboard.last-3-months")} />
						</SelectTrigger>
						<SelectContent className="rounded-xl">
							{TIME_RANGES.map((range) => (
								<SelectItem
									className="rounded-lg"
									key={range.value}
									value={range.value}
								>
									{range.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>

			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				{isLoading ? (
					<div className="h-[250px] w-full animate-pulse rounded-lg bg-muted/50" />
				) : (
					<ChartContainer className="h-[250px] w-full" config={chartConfig}>
						<AreaChart data={filteredData}>
							<defs>
								<linearGradient id="fillDesktop" x1="0" x2="0" y1="0" y2="1">
									<stop
										offset="5%"
										stopColor="var(--color-desktop)"
										stopOpacity={1}
									/>
									<stop
										offset="95%"
										stopColor="var(--color-desktop)"
										stopOpacity={0.1}
									/>
								</linearGradient>
								<linearGradient id="fillMobile" x1="0" x2="0" y1="0" y2="1">
									<stop
										offset="5%"
										stopColor="var(--color-mobile)"
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor="var(--color-mobile)"
										stopOpacity={0.1}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid vertical={false} />
							<XAxis
								axisLine={false}
								dataKey="date"
								minTickGap={32}
								tickFormatter={(val) =>
									new Date(val).toLocaleDateString(locale, {
										month: "short",
										day: "numeric",
									})
								}
								tickLine={false}
								tickMargin={8}
							/>
							<ChartTooltip
								content={
									<ChartTooltipContent
										indicator="dot"
										labelFormatter={(val) =>
											new Date(val).toLocaleDateString(locale, {
												month: "short",
												day: "numeric",
											})
										}
									/>
								}
								cursor={false}
							/>
							<Area
								animationDuration={1000}
								dataKey="mobile"
								fill="url(#fillMobile)"
								isAnimationActive={true}
								stackId="a"
								stroke="var(--color-mobile)"
								type="natural"
							/>
							<Area
								animationDuration={1200}
								dataKey="desktop"
								fill="url(#fillDesktop)"
								isAnimationActive={true}
								stackId="a"
								stroke="var(--color-desktop)"
								type="natural"
							/>
						</AreaChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	);
}
