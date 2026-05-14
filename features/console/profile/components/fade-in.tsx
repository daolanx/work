"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface FadeInProps {
	children: ReactNode;
	delay?: number;
	className?: string;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 20 }}
			transition={{
				duration: shouldReduceMotion ? 0.2 : 0.5,
				delay,
			}}
			viewport={{ once: true }}
			whileInView={{ opacity: 1, y: 0 }}
		>
			{children}
		</motion.div>
	);
}
