"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconBan } from "@tabler/icons-react";
import { Ban, CheckCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { SchemaFormFields } from "@/components/forms/schema-form-fields";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Form } from "@/components/ui/form";
import { authClient } from "@/features/console/auth/lib/client";
import type { Role } from "../../constants";
import { ADMIN_USERS_KEY } from "../../constants";

type AdminUser = {
	id: string;
	email: string;
	name: string;
	role: Role;
	banned: boolean;
	image?: string;
	createdAt: string;
};

const banUserSchema = z.object({
	reason: z.string().min(1, "Reason is required"),
});

type BanUserForm = z.infer<typeof banUserSchema>;

export function UserBanToggle({ user }: { user: AdminUser }) {
	const t = useTranslations("console");
	const { mutate: globalMutate } = useSWRConfig();

	const banUser = useSWRMutation(
		ADMIN_USERS_KEY,
		async (_key, { arg }: { arg: { userId: string; reason: string } }) => {
			await authClient.admin.banUser({
				userId: arg.userId,
				banReason: arg.reason,
			});
		},
		{
			revalidate: false,
			onSuccess: () => {
				globalMutate(ADMIN_USERS_KEY);
				toast.success(t("admin.user-banned"));
			},
		},
	);

	const unbanUser = useSWRMutation(
		ADMIN_USERS_KEY,
		async (_key, { arg }: { arg: { userId: string } }) => {
			await authClient.admin.unbanUser({ userId: arg.userId });
		},
		{
			revalidate: false,
			onSuccess: () => {
				globalMutate(ADMIN_USERS_KEY);
				toast.success(t("admin.user-unbanned"));
			},
		},
	);

	if (user.banned) {
		return (
			<DropdownMenuItem
				className="font-medium text-green-600"
				disabled={unbanUser.isMutating}
				onSelect={(e) => {
					e.preventDefault();
					unbanUser.trigger({ userId: user.id });
				}}
			>
				{unbanUser.isMutating ? (
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<CheckCircle className="mr-2 h-4 w-4" />
				)}
				{t("admin.unban-user")}
			</DropdownMenuItem>
		);
	}

	return <BanUserDialog banUser={banUser} user={user} />;
}

function BanUserDialog({
	user,
	banUser,
}: {
	user: AdminUser;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	banUser: ReturnType<typeof useSWRMutation<any, any, any, any>>;
}) {
	const t = useTranslations("console");
	const [open, setOpen] = useState(false);
	const isLoading = banUser.isMutating;
	const form = useForm<BanUserForm>({
		resolver: zodResolver(banUserSchema),
		defaultValues: { reason: "" },
	});

	const handleSubmit = async (data: BanUserForm) => {
		await banUser.trigger({ userId: user.id, reason: data.reason });
		setOpen(false);
		setTimeout(() => form.reset(), 250);
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<DropdownMenuItem
					className="text-red-600"
					disabled={isLoading}
					onSelect={(e) => e.preventDefault()}
				>
					{isLoading ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<Ban className="mr-2 h-4 w-4" />
					)}
					{t("admin.ban-user")}
				</DropdownMenuItem>
			</DialogTrigger>

			<DialogContent
				aria-describedby={undefined}
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle>
						{t("admin.ban-user-title", { name: user.name })}
					</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form
						className="space-y-4 py-4"
						onSubmit={form.handleSubmit(handleSubmit)}
					>
						<SchemaFormFields
							fields={[
								{
									name: "reason",
									label: t("admin.reason"),
									type: "input",
									icon: IconBan,
									placeholder: t("admin.reason-for-ban"),
								},
							]}
							form={form}
						/>
						<DialogFooter>
							<Button
								disabled={isLoading}
								onClick={() => setOpen(false)}
								type="button"
								variant="outline"
							>
								{t("common.cancel")}
							</Button>
							<Button disabled={isLoading} type="submit">
								{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								{t("admin.confirm-ban")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
