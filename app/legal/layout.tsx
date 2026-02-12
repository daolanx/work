"use client";

import {
	Activity,
	CheckSquare,
	DollarSign,
	MousePointer2,
	TrendingUp,
	Users,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";

/**
 * Reusable Floating Metric component for background decoration
 */
const FloatingMetric = ({
	children,
	className,
	delay = 0,
}: {
	children: React.ReactNode;
	className: string;
	delay?: number;
}) => (
	<motion.div
		animate={{
			opacity: [0, 0.15, 0.15, 0],
			y: [0, -40, -80],
			scale: [0.8, 1, 0.9],
		}}
		className={`pointer-events-none absolute hidden items-center gap-2 whitespace-nowrap rounded-full border border-primary/20 bg-primary/5 px-3 py-2 font-mono text-primary text-xs shadow-sm lg:flex ${className}`}
		initial={{ opacity: 0, scale: 0.8 }}
		transition={{ duration: 8, repeat: Infinity, ease: "linear", delay }}
	>
		{children}
	</motion.div>
);

export default function LegalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-background">
			<div className="pointer-events-none fixed inset-0 z-0">
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

				<FloatingMetric className="top-[10%] left-[15%]" delay={0}>
					<TrendingUp size={14} /> <span>MRR +$1,240</span>
				</FloatingMetric>
				<FloatingMetric className="right-[20%] bottom-[10%]" delay={5}>
					<Activity size={14} /> <span>Server: 99.9% Up</span>
				</FloatingMetric>

				<div className="absolute top-[20%] left-[20%] h-[300px] w-[300px] animate-pulse rounded-full bg-primary/10 blur-[100px]" />
			</div>

			{/* Main Content Area */}
			<main className="relative z-10 flex w-full flex-col items-center bg-transparent px-4 py-20">
				{children}
			</main>
		</div>
	);
}
