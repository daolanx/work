"use client";

import { motion, useReducedMotion } from "motion/react";

interface FadeInWrapperProps {
	children: React.ReactNode;
	delay?: number;
	reverse?: boolean;
	className?: string;
}

export default function FadeInWrapper({
	children,
	className,
	reverse: _reverse,
	delay,
}: FadeInWrapperProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			initial={shouldReduceMotion ? undefined : { opacity: 0 }}
			transition={
				shouldReduceMotion
					? undefined
					: {
							duration: 0.2,
							delay: delay,
							ease: "easeInOut",
							type: "spring",
							stiffness: 260,
							damping: 20,
						}
			}
			viewport={{ once: true }}
			whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
		>
			{children}
		</motion.div>
	);
}
