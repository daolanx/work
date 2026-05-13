"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { FadeIn } from "./fade-in";

export default function ServiceSection() {
	const shouldReduceMotion = useReducedMotion();

	return (
		<section className="mx-auto w-full">
			{/* Header - Full Width */}
			<div className="border-primary border-t px-2.5 py-20">
				<h2 className="text-center font-semibold text-4xl text-primary leading-tight md:text-5xl">
					Our Service
				</h2>
			</div>

			{/* Content */}
			<div className="flex flex-col border-primary border-t md:flex-row">
				{/* Left Column - Image */}
				<div className="relative aspect-square overflow-hidden border-primary border-b md:aspect-auto md:h-[560px] md:w-1/2 md:border-r md:border-b-0">
					<div className="group absolute inset-0 overflow-hidden">
						<div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-110">
							<Image
								alt="Flower Subscriptions"
								className="object-cover"
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
								src="/images/flower-shop/service/service-bg.png"
								unoptimized
							/>
						</div>
					</div>
					<div className="absolute inset-0 bg-overlay-medium" />
				</div>

				{/* Right Column - Content */}
				<div className="flex flex-col justify-center bg-white px-8 py-10 md:w-1/2 md:px-20 md:py-20">
					<div className="flex flex-col items-center gap-16">
						{/* Text Content */}
						<div className="flex w-full flex-col items-center gap-6 text-center">
							<FadeIn
								as="p"
								className="font-medium text-primary text-sm uppercase"
								delay={0.1}
							>
								service
							</FadeIn>
							<div className="flex w-full flex-col gap-4">
								<FadeIn
									as="h3"
									className="font-semibold text-4xl text-primary leading-tight md:text-5xl"
									delay={0.2}
								>
									Flower Subcriptions
								</FadeIn>
								<FadeIn
									as="p"
									className="font-medium text-lg text-primary-muted leading-relaxed"
									delay={0.3}
								>
									Experience the convenience and savings of regular flower
									deliveries with our flexible subscription service - up to 30%
									more profitable than one-time purchases.
								</FadeIn>
							</div>
						</div>

						{/* Button */}
						<motion.button
							className="flex h-14 cursor-pointer items-center justify-center border border-primary px-6 font-medium text-base text-primary uppercase tracking-widest transition-colors hover:bg-primary hover:text-white"
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
							Subscribe Now
						</motion.button>
					</div>
				</div>
			</div>
		</section>
	);
}
