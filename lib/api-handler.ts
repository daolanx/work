import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

// ---- Core types ----

type RouteHandler<P = Record<string, string>> = (
	req: NextRequest,
	ctx: { params: P },
) => Promise<Response>;

/**
 * A middleware receives a handler and returns a new handler
 * with additional behavior (error handling, auth, logging, etc.)
 */
type Middleware = <P>(handler: RouteHandler<P>) => RouteHandler<P>;

// ---- Middlewares ----

/** Allow requests from any origin by setting CORS headers */
const withCors: Middleware = (handler) => async (req, ctx) => {
	const origin = req.headers.get("origin") ?? "*";
	const headers = {
		"Access-Control-Allow-Origin": origin,
		"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
		"Access-Control-Allow-Credentials": "true",
	};

	if (req.method === "OPTIONS") {
		return new NextResponse(null, { status: 204, headers });
	}

	const res = await handler(req, ctx);
	for (const [key, value] of Object.entries(headers)) {
		res.headers.set(key, value);
	}
	return res;
};

/** Catch any unhandled error and return a consistent JSON error response */
const withErrorHandling: Middleware = (handler) => async (req, ctx) => {
	try {
		return await handler(req, ctx);
	} catch (err: any) {
		console.error("[api.error]", err.statusCode || 500, err.message);
		return NextResponse.json(
			{ success: false, message: err.message || "Internal Server Error" },
			{ status: err.statusCode || 500 },
		);
	}
};

/** Validate session and inject user/session into context */
const withAuth: Middleware = (handler) => async (req, ctx) => {
	const resSession = await getSession();

	if (!resSession) {
		return NextResponse.json(
			{ success: false, message: "Unauthorized" },
			{ status: 401 },
		);
	}

	return await handler(req, {
		...ctx,
		user: resSession.user,
		session: resSession.session,
	} as any);
};

// ---- Composition ----
/**
 * Compose middlewares into a single handler.
 * Execution order: the rightmost middleware wraps the outermost layer.
 *
 * chain([withAuth, withErrorHandling]) produces:
 *   withErrorHandling(withAuth(handler))
 *
 * Request flow:
 *   → withErrorHandling (catches all errors)
 *     → withAuth (validates session)
 *       → your handler (business logic)
 *     ← back through withAuth
 *   ← back through withErrorHandling
 */

function chain(middlewares: Middleware[]) {
	return <P>(
		handler: (req: NextRequest, ctx: any) => Promise<Response>,
	): RouteHandler<P> => {
		return middlewares.reduce(
			(composed, middleware) => middleware(composed),
			handler as any,
		) as RouteHandler<P>;
	};
}

// ---- Exports ----

/** Public endpoint: error handling only */
export const api = chain([withErrorHandling]);

/** Public endpoint: error handling + CORS (allow cross-origin requests) */
export const corsApi = chain([withCors, withErrorHandling]);

/** Protected endpoint: error handling + auth */
// the execution order is from right to left: withErrorHandling -> withAuth
export const authApi = chain([withAuth, withErrorHandling]);

/** Protected endpoint: error handling + auth + CORS */
export const authCorsApi = chain([withCors, withAuth, withErrorHandling]);
