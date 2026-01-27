"use client";
import TaskTable from "../_components/task-table";

export default function ConsolePage() {
	return (
		<div className="flex flex-col gap-4 px-4 md:gap-6 md:px-6">
			<TaskTable variant="ghost" />
		</div>
	);
}
