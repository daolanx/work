"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Navbar from "./navbar";
import ToolBar from "./toolbar";

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 w-full py-6 transition-all duration-300",
				isScrolled && "bg-white/70 shadow-sm backdrop-blur-md dark:bg-black/70",
			)}
		>
			<section className="section-max-width-wrapper flex items-center justify-between">
				<div className="flex">
					<h1 className="whitespace-nowrap bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text font-extrabold text-2xl text-transparent">
						Midaland
					</h1>
					<Navbar />
				</div>
				<ToolBar />
			</section>
		</header>
	);
}
