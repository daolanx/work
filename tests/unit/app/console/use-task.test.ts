/**
 * @vitest-environment jsdom
 */
import { renderHook } from "@testing-library/react";
import useSWR from "swr";
import { describe, expect, it, vi } from "vitest";
import { useTask, useTasks } from "@/app/console/_hooks/use-task";

const mockMutate = vi.fn();
vi.mock("swr", () => ({
	default: vi.fn((key: string) => {
		return {
			data: key?.startsWith("/api/console/tasks?")
				? { list: [], total: 0, pageIndex: 0, pageSize: 10, totalPage: 0 }
				: key?.startsWith("/api/console/tasks/") && key !== "/api/console/tasks"
					? { id: 1, title: "Task", status: "To Do" }
					: undefined,
			error: undefined,
			isLoading: false,
			mutate: mockMutate,
		};
	}),
}));

vi.mock("swr/mutation", () => ({
	default: vi.fn(() => ({
		trigger: vi.fn(),
		isMutating: false,
		data: undefined,
		error: undefined,
		reset: vi.fn(),
	})),
}));

vi.mock("sonner", () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));

describe("use-task hooks", () => {
	describe("useTasks", () => {
		it("returns res, isLoading, error, mutate", () => {
			const { result } = renderHook(() =>
				useTasks({ pageIndex: 0, pageSize: 10 }),
			);
			expect(result.current).toMatchObject({
				res: expect.any(Object),
				isLoading: false,
				mutate: expect.any(Function),
			});
			expect(result.current.res).toMatchObject({
				list: [],
				total: 0,
				pageIndex: 0,
				pageSize: 10,
				totalPage: 0,
			});
		});

		it("builds query string with default orderBy and order", () => {
			vi.mocked(useSWR).mockClear();
			renderHook(() => useTasks({ pageIndex: 0, pageSize: 10 }));
			const callKey = vi.mocked(useSWR).mock.calls[0]?.[0];
			expect(callKey).toContain("pageIndex=0");
			expect(callKey).toContain("pageSize=10");
			expect(callKey).toContain("orderBy=createdAt");
			expect(callKey).toContain("order=desc");
		});

		it("includes searchKey in query when provided", () => {
			vi.mocked(useSWR).mockClear();
			renderHook(() =>
				useTasks({ pageIndex: 0, pageSize: 10, searchKey: "test" }),
			);
			const callKey = vi.mocked(useSWR).mock.calls[0]?.[0];
			expect(callKey).toContain("searchKey=test");
		});

		it("includes columnFilters in query when provided", () => {
			vi.mocked(useSWR).mockClear();
			renderHook(() =>
				useTasks({
					pageIndex: 0,
					pageSize: 10,
					columnFilters: [
						{ id: "status", value: ["To Do", "Done"] },
						{ id: "category", value: "WORK" },
					],
				}),
			);
			const callKey = vi.mocked(useSWR).mock.calls[0]?.[0];
			expect(callKey).toMatch(/status=To%20Do|status=Done|category=WORK/);
		});

		it("includes sorting in query when provided", () => {
			vi.mocked(useSWR).mockClear();
			renderHook(() =>
				useTasks({
					pageIndex: 0,
					pageSize: 10,
					sorting: [{ id: "title", desc: true }],
				}),
			);
			const callKey = vi.mocked(useSWR).mock.calls[0]?.[0];
			expect(callKey).toContain("orderBy=title");
			expect(callKey).toContain("order=desc");
		});
	});

	describe("useTask", () => {
		it("returns task data when taskId is provided", () => {
			const { result } = renderHook(() => useTask("1"));
			expect(result.current).toMatchObject({
				task: { id: 1, title: "Task", status: "To Do" },
				isLoading: false,
				mutate: expect.any(Function),
			});
		});

		it("uses null key when taskId is undefined", () => {
			vi.mocked(useSWR).mockClear();
			renderHook(() => useTask(undefined));
			expect(useSWR).toHaveBeenCalledWith(null);
		});

		it("uses detail URL when taskId is provided", () => {
			vi.mocked(useSWR).mockClear();
			renderHook(() => useTask("42"));
			expect(useSWR).toHaveBeenCalledWith("/api/console/tasks/42");
		});
	});
});
