import { headers } from "next/headers";
import { auth } from "@/features/console/auth/lib/server";

export type Session = typeof auth.$Infer.Session;

export async function getSession(): Promise<Session | null> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return session;
}

export async function getUserId() {
	const session = await getSession();
	if (!session?.user) throw new Error("Unauthorized");
	return session.user.id;
}
