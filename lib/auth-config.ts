/**
 * Authentication routing configuration
 */
export const AUTH_CONFIG = {
	loginPath: "/auth/login",
	authPathPrefix: "/auth/",
	defaultRedirectPath: "/console",
} as const;

/**
 * Public route definitions.
 *
 * - `/foo`   — matches `/foo` exactly AND as prefix (`/foo/bar`, `/foo/bar/baz`)
 * - `/foo/*` — prefix match only, matches `/foo/bar` but NOT `/foo` alone
 * - `/`      — special case: exact match only (matches just `/`)
 *
 * Add new public routes here — one line each.
 */
export const PUBLIC_ROUTES: readonly string[] = [
	"/",
	"/ai-chat",
	"/landing",
	"/flower-shop",
	`${AUTH_CONFIG.authPathPrefix}*`,
	"/docs/*",
	"/legal",
	"/api/auth/*",
	"/api/ai-chat",
	"/api/public/*",
];

/**
 * Checks if a given pathname is publicly accessible.
 */
export function isPublicPath(pathname: string): boolean {
	return PUBLIC_ROUTES.some((route) => {
		if (route.endsWith("/*")) {
			return pathname.startsWith(route.slice(0, -1));
		}
		if (pathname === route) return true;
		if (route !== "/" && pathname.startsWith(route + "/")) return true;
		return false;
	});
}
