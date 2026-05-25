"use client";

import { Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	RefreshTableButton,
	UsersTable,
} from "@/features/console/admin/components/users-table";

export default function AdminPage() {
	const t = useTranslations("console");

	return (
		<Card className="border-none shadow-none">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
				<div className="space-y-1">
					<CardTitle className="flex items-center gap-2 font-bold text-2xl">
						<Users className="h-6 w-6 text-primary" />
						{t("admin.user-management")}
					</CardTitle>
				</div>
				<RefreshTableButton />
			</CardHeader>
			<CardContent>
				<UsersTable />
			</CardContent>
		</Card>
	);
}
