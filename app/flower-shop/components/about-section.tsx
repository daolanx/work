"use client";

import { motion, useReducedMotion } from "motion/react";
import { FadeIn } from "./fade-in";

export default function AboutSection() {
	const shouldReduceMotion = useReducedMotion();

	return (
		<section className="mx-auto w-full border-primary border-t">
			<div className="flex flex-col md:flex-row">
				{/* Left Side - "About us" Title */}
				<div className="flex-1 md:sticky md:top-[73px] md:h-fit md:flex-shrink-0">
					<div className="px-8 py-12 md:px-20 md:py-20">
						<motion.h2
							className="font-semibold text-4xl text-primary leading-tight md:text-5xl"
							initial={{ opacity: 0, x: -30 }}
							transition={{ duration: shouldReduceMotion ? 0.3 : 0.6 }}
							viewport={{ once: true, margin: "-50px" }}
							whileInView={{ opacity: 1, x: 0 }}
						>
							About us
						</motion.h2>
					</div>
				</div>

				{/* Right Side - Content */}
				<div className="flex-1 flex-shrink-0 border-primary border-t md:border-t-0 md:border-l">
					<div className="flex flex-col gap-16 px-8 py-12 md:px-20 md:py-20">
						{/* Text Content */}
						<div className="flex flex-col gap-6">
							{/* Overline Label */}
							<FadeIn
								as="span"
								className="font-medium text-primary text-sm uppercase leading-tight"
								delay={0.1}
							>
								Our story
							</FadeIn>

							{/* Title */}
							<FadeIn
								as="h3"
								className="font-medium text-3xl text-primary leading-tight md:text-4xl"
								delay={0.2}
							>
								Kyiv LuxeBouquets
							</FadeIn>

							{/* Description */}
							<FadeIn
								as="p"
								className="text-base text-primary-muted leading-relaxed"
								delay={0.3}
							>
								We are a modern local floral studio, which specializes in the
								design and delivery of unique bouquets. We have the best
								florists who carefully select each look, our studio cooperates
								directly with farms for growing different flowers, so we always
								have fresh flowers, which are collected by our florists in
								exquisite bouquets. We have a collection of fresh bouquets,
								collections of dried bouquets, house plants, as well as fragrant
								candles from luxury brands to create the perfect atmosphere.
								Make someone&apos;s day amazing by sending flowers, plants and
								gifts the same or next day. Ordering flowers online has never
								been easier.
							</FadeIn>
						</div>

						{/* Button */}
						<motion.button
							className="h-14 w-[175px] cursor-pointer border border-primary px-6 py-4 font-medium text-base text-primary uppercase tracking-widest transition-colors hover:bg-primary hover:text-white"
							initial={{ opacity: 0, y: 20 }}
							transition={{
								duration: shouldReduceMotion ? 0.2 : 0.5,
								delay: 0.4,
							}}
							viewport={{ once: true }}
							whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
						>
							Learn more
						</motion.button>
					</div>
				</div>
			</div>
		</section>
	);
}
