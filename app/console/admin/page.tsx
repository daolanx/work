"use client";

import { Loader2, RefreshCcw, ShieldAlert, Users } from "lucide-react";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// shadcn/ui components
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "../_hooks/useUser";
// Custom hooks and components
import { UsersTable } from "./_components/users-table";
import { useAdminUsers } from "./_hooks/use-admin-users";

/**
 * AdminDashboard Component
 * Handles user management, permission checking, and data fetching.
 */
export default function AdminDashboard() {
	const { user, isLoading: isUserLoading } = useUser();
	const { users, isLoading, fetchUsers, actions } = useAdminUsers();

	// Fetch users only if the authenticated user has admin privileges
	useEffect(() => {
		if (user?.role === "admin") {
			fetchUsers();
		}
	}, [user, fetchUsers]);

	/**
	 * 1. LOADING STATE
	 * Uses Skeleton screens to prevent layout shift and improve perceived performance.
	 */
	if (isUserLoading) {
		return (
			<div className="space-y-4 p-4">
				<div className="flex items-center justify-between">
					<Skeleton className="h-8 w-[200px]" />
					<Skeleton className="h-9 w-[100px]" />
				</div>
				<Card>
					<CardHeader>
						<Skeleton className="h-6 w-[150px]" />
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Using a fixed array of unique strings instead of index */}
						{["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"].map((id) => (
							<Skeleton className="h-12 w-full rounded-md" key={id} />
						))}
					</CardContent>
				</Card>
			</div>
		);
	}

	/**
	 * 2. UNAUTHORIZED STATE
	 * Renders a destructive alert if the user is not an admin or not logged in.
	 */
	if (user && user.role !== "admin") {
		return (
			<div className="flex h-[400px] items-center justify-center p-6 text-center">
				<Alert className="max-w-md" variant="destructive">
					<ShieldAlert className="h-4 w-4" />
					<AlertTitle>Access Denied</AlertTitle>
					<AlertDescription>
						You do not have the required permissions to view this dashboard.
						Please contact your system administrator if you believe this is an
						error.
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	/**
	 * 3. MAIN DASHBOARD RENDER
	 */
	return (
		<Card className="border-none shadow-none">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
				<div className="space-y-1">
					<CardTitle className="flex items-center gap-2 font-bold text-2xl">
						<Users className="h-6 w-6 text-primary" />
						User Management
					</CardTitle>
					<CardDescription>
						Manage system users, assign roles, and monitor account status.
					</CardDescription>
				</div>

				<Button
					className="transition-all active:scale-95"
					disabled={isLoading}
					onClick={fetchUsers}
					size="sm"
					variant="outline"
				>
					{isLoading ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<RefreshCcw className="mr-2 h-4 w-4" />
					)}
					Refresh
				</Button>
			</CardHeader>

			<CardContent>
				{/* Table handles empty states internally based on the users array */}
				<UsersTable actions={actions} currentUserId={user.id} users={users} />
			</CardContent>
		</Card>
	);
}
