"use client";

import { SummaryCards } from "@/app/console/components/summary-cards";
import TaskTable from "@/app/console/components/task-table";
import { VisitorChart } from "@/app/console/components/vistior-chart";

export default function ConsolePage() {
	return (
		<div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
			<SummaryCards />
			<VisitorChart />
			<TaskTable />
		</div>
	);
}
