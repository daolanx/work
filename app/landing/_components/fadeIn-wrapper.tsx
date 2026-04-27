"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

interface FadeInWrapperProps {
	children: React.ReactNode;
	delay?: number;
	className?: string;
}

export default function FadeInWrapper({
	children,
	className,
	delay,
}: FadeInWrapperProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<m.div
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
		</m.div>
	);
}
