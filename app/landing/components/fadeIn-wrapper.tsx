"use client";

import { motion } from "motion/react";

interface FadeInWrapperProps {
	children: React.ReactNode;
	delay?: number;
	reverse?: boolean;
	className?: string;
}

export default function FadeInWrapper({
	children,
	className,
	reverse,
	delay,
}: FadeInWrapperProps) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: reverse ? -20 : 20 }}
			transition={{
				duration: 0.2,
				delay: delay,
				ease: "easeInOut",
				type: "spring",
				stiffness: 260,
				damping: 20,
			}}
			viewport={{ once: false }}
			whileInView={{ opacity: 1, y: 0 }}
		>
			{children}
		</motion.div>
	);
}
