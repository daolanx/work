"use client";

import { SummaryCards } from "@/components/console/summary-cards";
import TaskTable from "@/components/console/task-table";
import { VisitorChart } from "@/components/console/vistior-chart";

export default function ConsolePage() {
	return (
		<div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
			<SummaryCards />
			<VisitorChart />
			<TaskTable />
		</div>
	);
}
