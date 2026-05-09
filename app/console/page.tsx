import dynamic from "next/dynamic";
import { SummaryCards } from "./_components/summary-cards";

const VisitorChart = dynamic(
	() =>
		import("./_components/vistior-chart").then((mod) => ({
			default: mod.VisitorChart,
		})),
	{
		loading: () => <div className="h-87.5 animate-pulse rounded-xl bg-muted" />,
	},
);

const TaskTable = dynamic(
	() =>
		import("./tasks/_components/task-table").then((mod) => ({
			default: mod.default,
		})),
	{
		loading: () => <div className="h-100 animate-pulse rounded-xl bg-muted" />,
	},
);

export default function ConsolePage() {
	return (
		<div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
			<SummaryCards />
			<VisitorChart />
			<TaskTable />
		</div>
	);
}
