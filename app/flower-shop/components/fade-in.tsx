"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";

interface FadeInProps {
	children: ReactNode;
	as?: ElementType;
	delay?: number;
	className?: string;
	viewport?: {
		once?: boolean;
		margin?: string;
	};
}

export function FadeIn({
	as,
	children,
	delay = 0,
	className,
	viewport = { once: true },
}: FadeInProps) {
	const shouldReduceMotion = useReducedMotion();

	const baseProps = {
		className,
		initial: { opacity: 0, y: 20 },
		whileInView: { opacity: 1, y: 0 },
		viewport,
		transition: {
			duration: shouldReduceMotion ? 0.2 : 0.5,
			delay,
		},
	};

	if (as === "span")
		return <motion.span {...baseProps}>{children}</motion.span>;
	if (as === "p") return <motion.p {...baseProps}>{children}</motion.p>;
	if (as === "h2") return <motion.h2 {...baseProps}>{children}</motion.h2>;
	if (as === "h3") return <motion.h3 {...baseProps}>{children}</motion.h3>;

	return <motion.div {...baseProps}>{children}</motion.div>;
}
