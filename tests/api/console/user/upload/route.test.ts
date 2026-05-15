import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
	headers: vi.fn().mockResolvedValue(new Map()),
}));
vi.mock("@/features/console/auth/lib/server", () => ({
	auth: { api: { getSession: vi.fn() } },
}));
vi.mock("@/features/console/user/lib/r2", () => ({
	r2: { send: vi.fn() },
}));

import { POST } from "@/app/api/console/user/upload/route";
import { auth } from "@/features/console/auth/lib/server";
import { r2 } from "@/features/console/user/lib/r2";

const mockSession = { user: { id: "user-1" } };
const getSessionMock = auth.api.getSession as unknown as ReturnType<
	typeof vi.fn
>;
const r2SendMock = r2.send as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
	vi.clearAllMocks();
	getSessionMock.mockResolvedValue(mockSession);
	r2SendMock.mockResolvedValue({});
});

function req(formData?: FormData) {
	return new Request("http://localhost:3000/api/console/user/upload", {
		method: "POST",
		body: formData,
	});
}

describe("POST /api/console/user/upload", () => {
	it("returns 401 when not authenticated", async () => {
		getSessionMock.mockResolvedValue(null);

		const fd = new FormData();
		fd.append("file", new File(["test"], "test.png", { type: "image/png" }));
		const res = await POST(req(fd));
		const body = await res.json();

		expect(res.status).toBe(401);
		expect(body.error).toBe("Unauthorized");
	});

	it("returns 400 when no file provided", async () => {
		const res = await POST(req(new FormData()));
		const body = await res.json();

		expect(res.status).toBe(400);
		expect(body.error).toBe("No file uploaded");
	});

	it("uploads file and returns fileUrl", async () => {
		const file = new File(["content"], "avatar.png", { type: "image/png" });
		const fd = new FormData();
		fd.append("file", file);

		const res = await POST(req(fd));
		const body = await res.json();

		expect(res.status).toBe(200);
		expect(body.fileUrl).toContain("avatars/user-1/");
		expect(r2SendMock).toHaveBeenCalledOnce();
	});
});
