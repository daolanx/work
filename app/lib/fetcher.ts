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
	// 1. Execute the network request
	// Note: fetch only throws an error on network failure (e.g., DNS issues, offline)
	const res = await fetch(url, defaultOptions);

	// 2. Attempt to parse JSON response if the content type is correct
	// We do this BEFORE checking res.ok to extract error messages from the body
	let result: any;
	const contentType = res.headers.get("content-type");
	if (contentType && contentType.includes("application/json")) {
		try {
			result = await res.json();
		} catch {
			result = null;
		}
	}
	// 3. Handle HTTP Error Status Codes (e.g., 300, 400, 404, 500)
	// If res.ok is false, we throw an error with details
	if (!res.ok) {
		const errorMessage =
			result?.message || result?.error || res.statusText || "Request failed";
		const error = new Error(errorMessage) as any;
		error.statusCode = res.status; // Attach the HTTP status code (e.g., 300)
		error.data = result;
		throw error;
	}
	// 4. Handle Application-Level Business Errors
	// Even if status is 200 OK, the business logic might have failed
	if (result && result.success === false) {
		throw new Error(result.message || "Business Logic Error");
	}

	return result;
}
