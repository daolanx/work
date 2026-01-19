import { NextResponse } from "next/server";
import { api } from "@/app/lib/api-handler";
import { ApiError } from "@/app/lib/exceptions";

export const GET = api(async () => {
	await sleep(600);
	return NextResponse.json({
		success: true,
		data: Array.from({ length: 91 }, (_, i) => {
			const d = new Date("2024-04-01");
			d.setDate(d.getDate() + i);
			return {
				date: d.toISOString().split("T")[0],
				desktop: Math.floor(Math.random() * (500 - 50 + 1)) + 50,
				mobile: Math.floor(Math.random() * (550 - 100 + 1)) + 100,
			};
		}),
	});
});

async function sleep(ms: number) {
	await new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
