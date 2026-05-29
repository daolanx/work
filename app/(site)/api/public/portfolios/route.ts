import { NextResponse } from "next/server";
import { getPortfolios } from "@/features/console/profile/services";
import { corsApi } from "@/lib/api-handler";

export const GET = corsApi(async (req) => {
	const lang = req.nextUrl.searchParams.get("lang");
	const portfolios = await getPortfolios(lang);
	return NextResponse.json(portfolios);
});
