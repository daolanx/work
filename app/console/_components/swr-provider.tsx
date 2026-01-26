"use client";
import { toast } from "sonner";

import { SWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<SWRConfig
			value={{
				fetcher,
				onError: (err) => {
					toast.error(err.message);
				},
				shouldRetryOnError: false,
			}}
		>
			{children}
		</SWRConfig>
	);
};
