"use client";

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
import { getVisitors } from "@/features/console/actions/visitors";
import { useIsMobile } from "@/hooks/use-mobile";

const chartConfig = {
	visitors: { label: "Visitors" },
	desktop: { label: "Desktop", color: "var(--primary)" },
	mobile: { label: "Mobile", color: "var(--primary)" },
} satisfies ChartConfig;

const TIME_RANGES = [
	{ value: "90d", label: "Last 3 months", days: 90 },
	{ value: "30d", label: "Last 30 days", days: 30 },
	{ value: "7d", label: "Last 7 days", days: 7 },
] as const;

const VISITOR_KEY = "visitors-profile";

export function VisitorChart() {
	const isMobile = useIsMobile();
	const [timeRange, setTimeRange] = useState("90d");
	const { data, isLoading } = useSWR(VISITOR_KEY, getVisitors);

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
	}, [data, timeRange]);

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardTitle>Total Visitors</CardTitle>
				<CardDescription>
					<span className="@[540px]/card:block hidden">
						Total for the last 3 months
					</span>
					<span className="@[540px]/card:hidden">Last 3 months</span>
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
							<SelectValue placeholder="Last 3 months" />
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
									new Date(val).toLocaleDateString("en-US", {
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
											new Date(val).toLocaleDateString("en-US", {
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
