import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";

/**
 * Infer the Session type from better-auth configuration
 */
type Session = typeof auth.$Infer.Session;

/**
 * Type definition for a handler that requires authentication
 */
type AuthHandler = (
	req: NextRequest,
	context: {
		params: any;
		user: Session["user"];
		session: Session["session"];
	},
) => Promise<any>;

/**
 * Base logic: A high-order function to catch errors and return consistent JSON responses
 */
function withErrorHandler(handler: Function) {
	return async (...args: any[]) => {
		try {
			return await handler(...args);
		} catch (err: any) {
			console.error("[api.error]", err.statusCode || 500, err.message);
			return NextResponse.json(
				{
					success: false,
					message: err.message || "Internal Server Error",
				},
				{ status: err.statusCode || 500 },
			);
		}
	};
}

/**
 * Basic API Handler: Includes error handling only.
 * Useful for public endpoints.
 */
export const api = (handler: any) => withErrorHandler(handler);

/**
 * Authenticated API Handler: Reuses error handling and injects session validation.
 * Intercepts requests if the user is not logged in.
 */
export const authApi = (handler: AuthHandler) => {
	// We wrap the logic inside withErrorHandler for maximum code reuse
	return withErrorHandler(
		async (req: NextRequest, context: { params: any }) => {
			// Better-auth requires current headers (cookies) to identify the session
			const sessionData = await auth.api.getSession({
				headers: await headers(),
			});

			// If no active session exists, block the request early
			if (!sessionData) {
				return NextResponse.json(
					{ success: false, message: "Unauthorized: Access denied" },
					{ status: 401 },
				);
			}

			// Pass control to the business logic, injecting 'user' and 'session' into context
			return await handler(req, {
				...context,
				user: sessionData.user,
				session: sessionData.session,
			});
		},
	);
};
