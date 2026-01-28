interface FetchError extends Error {
	statusCode?: number;
	data?: unknown;
}

const createMutationFetcher =
	(method: string) =>
	<T = any, R = any>(url: string, { arg }: { arg: R }): Promise<T> =>
		fetcher<T>(url, {
			method,
			body: arg ? JSON.stringify(arg) : undefined,
		});

export async function fetcher<T>(
	url: string,
	options?: RequestInit,
): Promise<T> {
	const method = options?.method?.toUpperCase() || "GET";
	const isGet = method === "GET";

	const defaultOptions: RequestInit = {
		...options,
		method,
		headers: {
			...(!isGet && { "Content-Type": "application/json" }),
			...options?.headers,
		},
	};

	const res = await fetch(url, defaultOptions);
	const contentType = res.headers.get("content-type");

	const result = contentType?.includes("application/json")
		? await res.json().catch(() => null)
		: null;

	if (!res.ok) {
		const errorMessage =
			result?.message || result?.error || res.statusText || "Request failed";
		const error = new Error(errorMessage) as FetchError;
		error.statusCode = res.status;
		error.data = result;
		throw error;
	}

	if (result && result.success === false) {
		throw new Error(result.message || "Business Logic Error");
	}

	return result as T;
}

export const poster = createMutationFetcher("POST");
export const patcher = createMutationFetcher("PATCH");
export const putter = createMutationFetcher("PUT");
export const deleter = createMutationFetcher("DELETE");
