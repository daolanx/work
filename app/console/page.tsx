import { lazy, Suspense } from "react";
import { SummaryCards } from "./_components/summary-cards";

const VisitorChart = lazy(() =>
	import("./_components/vistior-chart").then((mod) => ({
		default: mod.VisitorChart,
	})),
);

const TaskTable = lazy(() =>
	import("./tasks/_components/task-table").then((mod) => ({
		default: mod.default,
	})),
);

export default function ConsolePage() {
	return (
		<div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
			<SummaryCards />

			<Suspense
				fallback={
					<div className="h-[350px] animate-pulse rounded-xl bg-muted" />
				}
			>
				<VisitorChart />
			</Suspense>

			<Suspense
				fallback={
					<div className="h-[400px] animate-pulse rounded-xl bg-muted" />
				}
			>
				<TaskTable />
			</Suspense>
		</div>
	);
}
