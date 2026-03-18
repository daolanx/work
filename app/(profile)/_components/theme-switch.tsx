"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line
		setMounted(true);
	}, []);

	if (!mounted) {
		// Render a placeholder or nothing to avoid the mismatch
		// This must match exactly what the server would output
		return (
			<button className="cursor-pointer" type="button">
				<div className="h-5 w-5" />
			</button>
		);
	}

	return (
		<button
			className="cursor-pointer"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			type="button"
		>
			{theme === "dark" ? (
				<Moon className="h-5 w-5" />
			) : (
				<Sun className="h-5 w-5" />
			)}
		</button>
	);
}
