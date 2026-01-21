import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { querySummeryCards } from "@/app/services/console";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export async function SummaryCards() {
	const { success, data } = await querySummeryCards();

	return (
		<div className="grid @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
			{success &&
				data.map((card) => {
					return (
						<Card className="@container/card" key={card.id}>
							<CardHeader>
								<CardDescription>{card.label}</CardDescription>
								<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
									${card.amount}
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconTrendingUp />
										{card.changePercentage}%
									</Badge>
								</CardAction>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1.5 text-sm">
								<div className="line-clamp-1 flex gap-2 font-medium">
									Trending up this month <IconTrendingUp className="size-4" />
								</div>
								<div className="text-muted-foreground">
									Visitors for the last 6 months
								</div>
							</CardFooter>
						</Card>
					);
				})}
		</div>
	);
}
