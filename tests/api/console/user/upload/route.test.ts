import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/session", () => ({ getSession: vi.fn() }));
vi.mock("@/features/console/user/lib/r2", () => ({
	r2: { send: vi.fn() },
}));

import { POST } from "@/app/api/console/user/upload/route";
import { r2 } from "@/features/console/user/lib/r2";
import { getSession } from "@/lib/session";

const mockSession = { user: { id: "user-1" }, session: { id: "sess-1" } };
const r2SendMock = r2.send as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
	vi.clearAllMocks();
	(getSession as ReturnType<typeof vi.fn>).mockResolvedValue(mockSession);
	r2SendMock.mockResolvedValue({});
});

function req(formData?: FormData) {
	return new NextRequest("http://localhost:3000/api/console/user/upload", {
		method: "POST",
		body: formData,
	});
}

describe("POST /api/console/user/upload", () => {
	it("returns 401 when not authenticated", async () => {
		(getSession as ReturnType<typeof vi.fn>).mockResolvedValue(null);

		const fd = new FormData();
		fd.append("file", new File(["test"], "test.png", { type: "image/png" }));
		const res = await POST(req(fd), { params: {} } as any);
		const body = await res.json();

		expect(res.status).toBe(401);
		expect(body.success).toBe(false);
	});

	it("returns 400 when no file provided", async () => {
		const res = await POST(req(new FormData()), { params: {} } as any);
		const body = await res.json();

		expect(res.status).toBe(400);
		expect(body.error).toBe("No file uploaded");
	});

	it("uploads file and returns fileUrl", async () => {
		const file = new File(["content"], "avatar.png", { type: "image/png" });
		const fd = new FormData();
		fd.append("file", file);

		const res = await POST(req(fd), { params: {} } as any);
		const body = await res.json();

		expect(res.status).toBe(200);
		expect(body.fileUrl).toContain("avatars/user-1/");
		expect(r2SendMock).toHaveBeenCalledOnce();
	});
});
