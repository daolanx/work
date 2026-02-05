// app/auth/layout.tsx
"use client";

import {
	Activity,
	CheckSquare,
	DollarSign,
	MousePointer2,
	TrendingUp,
	Users,
} from "lucide-react";
import { motion } from "motion/react"; // Changed from motion/react for standard compatibility

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

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
			{/* --- SHARED BACKGROUND LAYER --- */}
			<div className="pointer-events-none fixed inset-0 z-0">
				{/* Changed absolute to fixed to ensure it stays during scrolls */}

				{/* Grid Pattern */}
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

				{/* Dynamic Metrics */}
				<FloatingMetric className="top-[10%] left-[15%]" delay={0}>
					<TrendingUp size={14} /> <span>MRR +$1,240</span>
				</FloatingMetric>
				<FloatingMetric className="top-[40%] left-[8%]" delay={2}>
					<Users size={14} /> <span>Active Users: 8.4k</span>
				</FloatingMetric>
				<FloatingMetric className="bottom-[20%] left-[12%]" delay={4}>
					<DollarSign size={14} /> <span>New Sale: Pro Plan</span>
				</FloatingMetric>
				<FloatingMetric className="top-[25%] right-[10%]" delay={1}>
					<MousePointer2 size={14} /> <span>CTR: 3.2%</span>
				</FloatingMetric>
				<FloatingMetric className="top-[60%] right-[15%]" delay={3}>
					<CheckSquare size={14} /> <span>Todo: Deploy v2.1</span>
				</FloatingMetric>
				<FloatingMetric className="right-[20%] bottom-[10%]" delay={5}>
					<Activity size={14} /> <span>Server: 99.9% Up</span>
				</FloatingMetric>

				{/* Decorative Blobs */}
				<div className="absolute top-[20%] left-[20%] h-[300px] w-[300px] animate-pulse rounded-full bg-primary/10 blur-[100px]" />
				<div className="absolute right-[20%] bottom-[20%] h-[250px] w-[250px] rounded-full bg-blue-500/5 blur-[80px]" />
			</div>

			{/* --- CONTENT AREA --- */}
			<main className="relative z-10 flex w-full flex-col items-center bg-transparent">
				{/* bg-transparent is crucial here */}
				{children}
			</main>
		</div>
	);
}
