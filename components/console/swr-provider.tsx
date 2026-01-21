"use client";
import { Toaster, toast } from "sonner";

import { SWRConfig } from "swr";
import { fetcher } from "@/app/lib/fetcher";

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
