interface ApiResponse<T> {
	success: boolean;
	data: T;
	error?: { message: string };
}

export default async function fetcher<T>(
	url: string,
	options?: RequestInit,
): Promise<T> {
	const res = await fetch(url, options);
	const result: ApiResponse<T> = await res.json();

	if (!res.ok || !result.success) {
		throw new Error(result.error?.message || "fetch error");
	}

	return result.data;
}
