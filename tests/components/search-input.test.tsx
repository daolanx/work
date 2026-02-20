/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchInput } from "@/components/search-input";

describe("SearchInput Component", () => {
	it("should render with the provided placeholder and default value", () => {
		render(
			<SearchInput
				defaultValue="Initial"
				onSearch={vi.fn()}
				placeholder="Search users..."
			/>,
		);

		const input = screen.getByPlaceholderText(
			"Search users...",
		) as HTMLInputElement;
		expect(input.value).toBe("Initial");
	});

	it("should call onSearch with trimmed value when Enter is pressed", async () => {
		const onSearch = vi.fn();
		render(
			<SearchInput
				defaultValue=""
				onSearch={onSearch}
				placeholder="Search..."
			/>,
		);
		const input = screen.getByPlaceholderText("Search...");
		await userEvent.type(input, "  query  ");
		await userEvent.keyboard("{Enter}");
		expect(onSearch).toHaveBeenCalledTimes(1);
		expect(onSearch).toHaveBeenCalledWith("query");
	});

	it("should call onSearch when search icon is clicked", async () => {
		const onSearch = vi.fn();
		render(
			<SearchInput
				defaultValue="test"
				onSearch={onSearch}
				placeholder="Search..."
			/>,
		);
		const icon = document.querySelector(".cursor-pointer");
		expect(icon).toBeTruthy();
		await userEvent.click(icon!);
		expect(onSearch).toHaveBeenCalledWith("test");
	});

	it("should clear input and call onSearch with empty string when clear button is clicked", async () => {
		const onSearch = vi.fn();
		render(
			<SearchInput
				defaultValue="something"
				onSearch={onSearch}
				placeholder="Search..."
			/>,
		);
		const clearButton = screen.getByRole("button", { name: /clear/i });
		await userEvent.click(clearButton);
		const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
		expect(input.value).toBe("");
		expect(onSearch).toHaveBeenCalledWith("");
	});

	it("should sync internal value when defaultValue prop changes", () => {
		const onSearch = vi.fn();
		const { rerender } = render(
			<SearchInput
				defaultValue="first"
				onSearch={onSearch}
				placeholder="Search..."
			/>,
		);
		const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
		expect(input.value).toBe("first");
		rerender(
			<SearchInput
				defaultValue="second"
				onSearch={onSearch}
				placeholder="Search..."
			/>,
		);
		expect(input.value).toBe("second");
	});
});
