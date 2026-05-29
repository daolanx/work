import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG, isPublicPath } from "@/lib/auth-config";

export function proxyAuth(request: NextRequest): NextResponse | null {
	const { pathname } = request.nextUrl;
	const isLoggedIn = !!getSessionCookie(request);

	if (isPublicPath(pathname)) {
		if (isLoggedIn && pathname.startsWith(AUTH_CONFIG.authPathPrefix)) {
			return NextResponse.redirect(
				new URL(AUTH_CONFIG.defaultRedirectPath, request.url),
			);
		}
		return null;
	}

	if (!isLoggedIn) {
		const loginUrl = new URL(AUTH_CONFIG.loginPath, request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return null;
}
