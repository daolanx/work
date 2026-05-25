import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";
import type React from "react";
import "@payloadcms/next/css";
import { importMap } from "./admin/importMap";

const serverFunction: ServerFunctionClient = async (args) => {
	"use server";
	return handleServerFunctions({
		...args,
		config,
		importMap,
	});
};

export default async function PayloadLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<RootLayout
			config={config}
			importMap={importMap}
			serverFunction={serverFunction}
		>
			{children}
		</RootLayout>
	);
}
