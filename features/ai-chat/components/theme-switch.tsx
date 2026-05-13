"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitch() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<button
			aria-label="Toggle theme"
			className="cursor-pointer p-2 transition-colors hover:opacity-70"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			style={{ color: "var(--color-on-surface)" }}
			type="button"
		>
			{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
		</button>
	);
}
