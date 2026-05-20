import { type NextRequest, NextResponse } from "next/server";
import { proxyAuth } from "@/features/console/proxy";

type ProxyHandle = (request: NextRequest) => NextResponse | null;

const proxyHandlers: ProxyHandle[] = [proxyAuth];

export async function proxy(request: NextRequest) {
	for (const proxyHandler of proxyHandlers) {
		const res = proxyHandler(request);
		if (res) return res;
	}
	return NextResponse.next();
}

// Match all routes except for static files and Next.js internal routes
export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};
