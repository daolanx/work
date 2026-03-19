"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { FadeIn } from "./fade-in";

export default function Service2Section() {
	const shouldReduceMotion = useReducedMotion();

	return (
		<section className="relative mx-auto h-[560px] w-full overflow-hidden [clip-path:inset(0)] md:h-[640px]">
			<div className="absolute inset-0 -z-10 h-full w-full">
				<Image
					alt="Wedding & Event Decor"
					className="object-cover"
					fill
					priority
					sizes="100vw"
					src="/images/flower-shop/service2/service2-bg.png"
					unoptimized
				/>
			</div>

			<div className="relative z-10 flex h-full flex-col items-center justify-center px-8 py-10 md:px-20 md:py-20">
				<div className="flex flex-col items-center gap-16">
					{/* Text Content */}
					<div className="flex flex-col items-center gap-6 text-white">
						<FadeIn
							as="p"
							className="font-medium text-sm uppercase tracking-widest"
							delay={0.3}
						>
							service
						</FadeIn>
						<div className="flex flex-col items-center gap-4">
							<FadeIn
								as="h2"
								className="text-center font-semibold text-4xl leading-tight md:text-5xl"
								delay={0.4}
							>
								Wedding & Event Decor
							</FadeIn>
							<FadeIn
								as="p"
								className="max-w-[586px] text-center font-medium text-lg leading-relaxed opacity-90"
								delay={0.5}
							>
								Let our team of expert florists and designers create stunning,
								on-trend floral décor for your special day. Trust us to bring
								your vision to life.
							</FadeIn>
						</div>
					</div>

					{/* Button */}
					<motion.button
						className="flex h-14 cursor-pointer items-center justify-center border border-white px-8 font-semibold text-sm text-white uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black"
						initial={{ opacity: 0, y: 20 }}
						transition={{
							duration: shouldReduceMotion ? 0.2 : 0.5,
							delay: 0.6,
						}}
						type="button"
						viewport={{ once: true }}
						whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
						whileInView={{ opacity: 1, y: 0 }}
						whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
					>
						Inquire Now
					</motion.button>
				</div>
			</div>
		</section>
	);
}
