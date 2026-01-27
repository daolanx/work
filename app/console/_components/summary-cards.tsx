"use client";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

async function querySummeryCards() {
	return {
		success: true,
		data: [
			{
				id: "total-revenue",
				label: "Total Revenue",
				amount: 1250.0,
				currency: "USD",
				changePercentage: 0.125,
				period: "last 6 months",
			},
			{
				id: "new-customers",
				label: "New Customers",
				amount: 1234,
				changePercentage: -0.2,
				period: "this period",
			},
			{
				id: "active-accounts",
				label: "Active Accounts",
				amount: 45678,
				changePercentage: 0.125,
				period: "engagement targets",
			},
			{
				id: "growth-rate",
				label: "Growth Rate",
				amount: 0.045,
				changePercentage: 0.045,
				period: "growth projections",
			},
		],
	};
}

export async function SummaryCards() {
	const { success, data } = await querySummeryCards();

	return (
		<div className="grid @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
			{success &&
				data.map((card) => {
					const isPositive = card.changePercentage > 0;
					const TrendIcon = isPositive ? IconTrendingUp : IconTrendingDown;

					return (
						<Card className="@container/card" key={card.id}>
							<CardHeader>
								<CardDescription>{card.label}</CardDescription>
								<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
									${card.amount}
								</CardTitle>
								<CardAction>
									{/* Dynamic color and icon based on trend */}
									<Badge
										className={
											isPositive
												? "border-emerald-200 bg-emerald-50/50 text-emerald-600"
												: "border-rose-200 bg-rose-50/50 text-rose-600"
										}
										variant="outline"
									>
										<TrendIcon className="mr-1 size-3.5" />
										{isPositive ? "+" : ""}
										{card.changePercentage * 100}%
									</Badge>
								</CardAction>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1.5 text-sm">
								<div
									className={`line-clamp-1 flex gap-2 font-medium ${isPositive ? "text-emerald-600" : "text-rose-600"}`}
								>
									{isPositive ? "Trending up" : "Trending down"} this month
									<TrendIcon className="size-4" />
								</div>
								<div className="text-muted-foreground">
									Compared to {card.period}
								</div>
							</CardFooter>
						</Card>
					);
				})}
		</div>
	);
}
