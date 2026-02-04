/**
 * Authentication routing configuration
 */
export const AUTH_CONFIG = {
	loginPath: "/auth/login",
	authPathPrefix: "/auth/",
	defaultRedirectPath: "/console",
} as const;

/**
 * Public access configuration
 */
const PUBLIC_PATHS = {
	exact: new Set(["/", "/ai-chat", "/landing"]),
	// Paths starting with these prefixes are accessible without authentication
	prefixes: [AUTH_CONFIG.authPathPrefix, "/docs/", "/api/auth/"],
} as const;

/**
 * Checks if a given pathname is publicly accessible
 */
export function isPublicPath(pathname: string): boolean {
	return (
		PUBLIC_PATHS.exact.has(pathname) ||
		PUBLIC_PATHS.prefixes.some((prefix) => pathname.startsWith(prefix))
	);
}
