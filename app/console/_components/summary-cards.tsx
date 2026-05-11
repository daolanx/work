import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export async function SummaryCards() {
	const { success, data } = await querySummeryCards();

	return (
		<div className="grid @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
			{success &&
				data.map((card) => (
					<Card className="@container/card" key={card.id}>
						<CardHeader className="flex justify-between">
							<CardTitle className="font-normal">{card.label}</CardTitle>
							<CardDescription>
								<TrendBadge value={card.monthlyChange} />
							</CardDescription>
						</CardHeader>
						<CardContent>
							<FormattedAmount amount={card.amount} unit={card.unit} />
						</CardContent>
					</Card>
				))}
		</div>
	);
}

async function querySummeryCards() {
	return {
		success: true,
		data: [
			{
				id: "mrr",
				label: "MRR",
				amount: 326.25,
				unit: "$",
				monthlyChange: 0.125,
			},
			{
				id: "retention-rate",
				label: "Retention",
				amount: 9.27,
				unit: "%",
				monthlyChange: -0.2,
			},
			{
				id: "conversion-rate",
				label: "Conversion",
				amount: 5.23,
				unit: "%",
				monthlyChange: 0.125,
			},
			{
				id: "mau",
				label: "MAU",
				amount: 93,
				monthlyChange: 0.045,
			},
		],
	};
}

function FormattedAmount({
	amount,
	unit,
}: {
	amount: number;
	unit: string | undefined;
}) {
	const displayValueFormater = {
		$: {
			renderDisplay(amount: number) {
				return `$${amount.toFixed(2)}`;
			},
		},
		"%": {
			renderDisplay(amount: number) {
				return `${amount.toFixed(2)}%`;
			},
		},
		default: {
			renderDisplay(amount: number) {
				return `${amount}`;
			},
		},
	};

	const renderDisplay = displayValueFormater[unit ?? "default"].renderDisplay;
	return (
		<p className="font-semibold @[250px]/card:text-3xl text-2xl">
			{renderDisplay(amount)}
		</p>
	);
}

function TrendBadge({ value }: { value: number }) {
	const config = {
		up: {
			class: "border-emerald-200 bg-emerald-50/50 text-emerald-600",
			icon: IconTrendingUp,
			flag: "+",
		},
		down: {
			icon: IconTrendingDown,
			class: "border-rose-200 bg-rose-50/50 text-rose-600",
			flag: "",
		},
	};

	const trendConfig = value > 0 ? config.up : config.down;
	const Icon = trendConfig.icon;

	return (
		<Badge className={trendConfig.class}>
			<Icon className="mr-1 size-3.5" />
			{trendConfig.flag}
			{value * 100}%
		</Badge>
	);
}
