/** @vitest-environment jsdom */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
	it("should render button with default variant", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByRole("button")).toBeTruthy();
	});

	it("should render button with different variants", () => {
		const { rerender } = render(<Button variant="default">Default</Button>);
		expect(screen.getByRole("button")).toBeTruthy();

		rerender(<Button variant="destructive">Destructive</Button>);
		expect(screen.getByRole("button")).toBeTruthy();

		rerender(<Button variant="outline">Outline</Button>);
		expect(screen.getByRole("button")).toBeTruthy();

		rerender(<Button variant="secondary">Secondary</Button>);
		expect(screen.getByRole("button")).toBeTruthy();

		rerender(<Button variant="ghost">Ghost</Button>);
		expect(screen.getByRole("button")).toBeTruthy();

		rerender(<Button variant="link">Link</Button>);
		expect(screen.getByRole("button")).toBeTruthy();
	});

	it("should render button with different sizes", () => {
		const { rerender } = render(<Button size="default">Default Size</Button>);
		expect(screen.getByRole("button")).toBeTruthy();

		rerender(<Button size="sm">Small</Button>);
		expect(screen.getByRole("button")).toBeTruthy();

		rerender(<Button size="lg">Large</Button>);
		expect(screen.getByRole("button")).toBeTruthy();

		rerender(<Button size="icon">Icon</Button>);
		expect(screen.getByRole("button")).toBeTruthy();
	});

	it("should render button text correctly", () => {
		render(<Button>Button Text</Button>);
		expect(screen.getByText("Button Text")).toBeTruthy();
	});
});

describe("Badge Component", () => {
	it("should render badge with default variant", () => {
		render(<Badge>Badge</Badge>);
		expect(screen.getByText("Badge")).toBeTruthy();
	});

	it("should render badge with different variants", () => {
		const variants = [
			"default",
			"secondary",
			"destructive",
			"outline",
		] as const;

		variants.forEach((variant) => {
			const { rerender } = render(
				<Badge variant={variant}>Badge {variant}</Badge>,
			);
			expect(screen.getByText(`Badge ${variant}`)).toBeTruthy();
		});
	});

	it("should render badge with custom text", () => {
		render(<Badge>Custom Badge</Badge>);
		expect(screen.getByText("Custom Badge")).toBeTruthy();
	});
});
