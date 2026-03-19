"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<button className="cursor-pointer" type="button">
				<div className="h-5 w-5" />
			</button>
		);
	}

	return (
		<button
			aria-label="Toggle theme"
			className="cursor-pointer p-1 text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			type="button"
		>
			{theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
		</button>
	);
}
