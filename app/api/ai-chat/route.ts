import { streamChatCompletion } from "@/features/ai-chat/services";
import { ValidationError } from "@/lib/errors";

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const result = streamChatCompletion(json);
		return result.toUIMessageStreamResponse();
	} catch (e) {
		if (e instanceof ValidationError) {
			return new Response(
				JSON.stringify({
					error: "Invalid request parameters",
					details: e.message,
				}),
				{ status: 400, headers: { "Content-Type": "application/json" } },
			);
		}
		console.error("API Error:", e);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
