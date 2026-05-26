import dynamic from "next/dynamic";
import { Suspense } from "react";
import {
	SummaryCards,
	SummaryCardsSkeleton,
} from "@/features/console/dashboard/components/summary-cards";

const VisitorChart = dynamic(
	() =>
		import("@/features/console/dashboard/components/vistior-chart").then(
			(mod) => ({
				default: mod.VisitorChart,
			}),
		),
	{
		loading: () => <div className="h-87.5 animate-pulse rounded-xl bg-muted" />,
	},
);

const TaskTable = dynamic(
	() =>
		import("@/features/console/task/components/task-table").then((mod) => ({
			default: mod.default,
		})),
	{
		loading: () => <div className="h-100 animate-pulse rounded-xl bg-muted" />,
	},
);

export default function ConsolePage() {
	return (
		<div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
			<Suspense fallback={<SummaryCardsSkeleton />}>
				<SummaryCards />
			</Suspense>
			<VisitorChart />
			<TaskTable />
		</div>
	);
}
