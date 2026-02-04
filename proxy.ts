import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG, isPublicPath } from "@/lib/auth/paths";

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const session = getSessionCookie(request);
	const isLoggedIn = !!session;

	if (isPublicPath(pathname)) {
		if (isLoggedIn && pathname.startsWith(AUTH_CONFIG.authPathPrefix)) {
			return NextResponse.redirect(
				new URL(AUTH_CONFIG.defaultRedirectPath, request.url),
			);
		}
		return NextResponse.next();
	}

	if (!isLoggedIn) {
		const loginUrl = new URL(AUTH_CONFIG.loginPath, request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

// Match all routes except for static files and Next.js internal routes
export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
