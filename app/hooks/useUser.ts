import useSWR from "swr";

// 1. 定义 fetcher 函数，它可以是原生的 fetch 或 axios
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUser() {
	// 2. 使用 useSWR
	// 如果 userId 为 null，SWR 将不会发送请求
	const {
		data: response,
		error,
		isLoading,
		mutate,
	} = useSWR("/api/user", fetcher, {
		revalidateOnFocus: false, // 可选：窗口聚焦时不自动重新请求
		dedupingInterval: 5000, // 可选：5秒内重复请求会被过滤
	});

	return {
		user: response?.data,
		isLoading,
		isError: error,
		mutate, // 手动触发更新的方法
	};
}
