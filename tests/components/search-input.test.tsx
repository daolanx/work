/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
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
});
