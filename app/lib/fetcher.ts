export interface ApiResponse<T> {
	success: boolean;
	data: T;
	message?: string;
	error?: { message: string };
}

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
	let result: ApiResponse<T>;
	try {
		result = await res.json();
	} catch (e) {
		throw new Error("network error.");
	}

	// response status not 200, or business error.
	if (!res.ok || !result.success) {
		throw new Error(result.error?.message || result.message || "request fail.");
	}

	return result.data;
}
