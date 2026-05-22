import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	queryMAU,
	queryRetentionRate,
} from "@/features/console/dashboard/services";
import {
	queryConversionRate,
	queryMRR,
} from "@/features/console/payments/lib/creem";

interface SummaryCard {
	id: string;
	label: string;
	amount: number;
	unit?: string;
	monthlyChange: number;
}

function computeChange(current: number, previous: number): number {
	return previous > 0 ? (current - previous) / previous : 0;
}

export async function SummaryCards() {
	const t = await getTranslations("console");

	const extract = <T,>(result: PromiseSettledResult<T>, fallback: T): T =>
		result.status === "fulfilled" ? result.value : fallback;

	const [mauResult, retentionResult, conversionResult, mrrResult] =
		await Promise.allSettled([
			queryMAU(),
			queryRetentionRate(),
			queryConversionRate(),
			queryMRR(),
		]);

	const mau = extract(mauResult, { current: 0, previous: 0 });
	const retention = extract(retentionResult, { current: 0, previous: 0 });
	const conversion = extract(conversionResult, { current: 0, previous: 0 });
	const mrr = extract(mrrResult, { current: 0, previous: 0 });

	const data: SummaryCard[] = [
		{
			id: "mrr",
			label: t("dashboard.mrr"),
			amount: mrr.current,
			unit: "$",
			monthlyChange: computeChange(mrr.current, mrr.previous),
		},
		{
			id: "retention-rate",
			label: t("dashboard.retention"),
			amount: Number.parseFloat(retention.current.toFixed(2)),
			unit: "%",
			monthlyChange: computeChange(retention.current, retention.previous),
		},
		{
			id: "conversion-rate",
			label: t("dashboard.conversion"),
			amount: Number.parseFloat(conversion.current.toFixed(2)),
			unit: "%",
			monthlyChange: computeChange(conversion.current, conversion.previous),
		},
		{
			id: "mau",
			label: t("dashboard.mau"),
			amount: mau.current,
			monthlyChange: computeChange(mau.current, mau.previous),
		},
	];

	return (
		<div className="grid @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
			{data.map((card) => (
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

/** Skeleton placeholder for SummaryCards while data loads via Suspense */
export function SummaryCardsSkeleton() {
	return (
		<div className="grid @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 gap-4">
			{Array.from({ length: 4 }).map((_, i) => (
				<Card className="@container/card animate-pulse" key={i}>
					<CardHeader>
						<div className="h-4 w-20 rounded bg-muted" />
						<div className="mt-2 h-5 w-16 rounded bg-muted" />
					</CardHeader>
					<CardContent>
						<div className="h-8 w-24 rounded bg-muted" />
					</CardContent>
				</Card>
			))}
		</div>
	);
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
	if (value === 0) return null;

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
