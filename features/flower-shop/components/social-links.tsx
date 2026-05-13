"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface SocialLink {
	name: string;
	href?: string;
	icon: string;
}

interface SocialLinksProps {
	links: SocialLink[];
	className?: string;
}

export function SocialLinks({ links, className }: SocialLinksProps) {
	return (
		<div className={`flex gap-8 ${className ?? ""}`}>
			{links.map((social) => (
				<motion.a
					aria-label={social.name}
					className="h-6 w-6 transition-opacity hover:opacity-70"
					href={social.href ?? "#"}
					key={social.name}
					whileHover={{ scale: 1.2, rotate: 5 }}
				>
					<Image
						alt={social.name}
						className="h-6 w-6"
						height={24}
						src={social.icon}
						unoptimized
						width={24}
					/>
				</motion.a>
			))}
		</div>
	);
}
