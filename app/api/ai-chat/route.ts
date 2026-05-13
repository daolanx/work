import {
	ConversationRequestSchema,
	streamChatCompletion,
} from "@/features/ai-chat/queries";

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const parsed = ConversationRequestSchema.safeParse(json);

		if (!parsed.success) {
			return new Response(
				JSON.stringify({
					error: "Invalid request parameters",
					details: parsed.error,
				}),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		const result = streamChatCompletion(parsed.data);
		return result.toUIMessageStreamResponse();
	} catch (e) {
		console.error("API Error:", e);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
