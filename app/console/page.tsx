"use client";

import { SummaryCards } from "./_components/summary-cards";
import { VisitorChart } from "./_components/vistior-chart";
import TaskTable from "./tasks/_components/task-table";

export default function ConsolePage() {
	return (
		<div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
			<SummaryCards />
			<VisitorChart />
			<TaskTable />
		</div>
	);
}
