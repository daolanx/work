import config from "@payload-config";
import { RootPage } from "@payloadcms/next/views";

const importMap = {};

type Args = {
	params: Promise<{
		segments: string[];
	}>;
	searchParams: Promise<{
		[key: string]: string | string[];
	}>;
};

export default async function Page({ params, searchParams }: Args) {
	return (
		<RootPage
			config={config}
			importMap={importMap}
			params={params}
			searchParams={searchParams}
		/>
	);
}
