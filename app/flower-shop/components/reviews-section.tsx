"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface Review {
	text: string;
	author: string;
}

const reviews: Review[] = [
	{
		text: "Ordered flowers online and they were the best bouquet! Impressed everyone around. Highly recommend this flower shop!",
		author: "Ronald Richards",
	},
	{
		text: "The wedding bouquet was absolutely stunning! The team understood exactly what I wanted and delivered beyond my expectations.",
		author: "Sarah Johnson",
	},
	{
		text: "Fresh flowers, fast delivery, and amazing customer service. This is now my go-to flower shop!",
		author: "Michael Chen",
	},
];

export default function ReviewsSection() {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
	const [selectedIndex, setSelectedIndex] = useState(0);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;

		const onSelect = () => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		};

		emblaApi.on("select", onSelect);
		onSelect();

		return () => {
			emblaApi.off("select", onSelect);
		};
	}, [emblaApi]);

	return (
		<section className="mx-auto w-full px-8 py-10 md:px-20 md:py-20">
			<div className="flex flex-col items-center gap-16">
				{/* Text Content */}
				<div className="flex flex-col items-center gap-6">
					{/* Google Logo + Reviews */}
					<div className="flex flex-col items-center gap-2">
						<Image
							alt="Google"
							className="h-7 w-[77px]"
							height={28}
							src="/images/flower-shop/reviews/google-logo.svg"
							unoptimized
							width={77}
						/>
						<p className="font-medium text-primary text-sm uppercase">
							Reviews
						</p>
					</div>

					{/* Heading */}
					<motion.h2
						className="font-semibold text-4xl text-primary leading-tight md:text-5xl"
						initial={{ opacity: 0, y: 30 }}
						style={{ willChange: "opacity, transform" }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						Our Clients say
					</motion.h2>
				</div>

				{/* Slider */}
				<div className="flex w-full max-w-7xl flex-col items-center gap-8">
					<div className="flex w-full items-center gap-6">
						{/* Left Arrow */}
						<motion.button
							aria-label="Previous review"
							className="flex h-8 w-8 shrink-0 rotate-180 items-center justify-center transition-opacity hover:opacity-70"
							onClick={scrollPrev}
							style={{ willChange: "transform" }}
							type="button"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<Image
								alt="Previous"
								className="h-8 w-8"
								height={32}
								src="/images/flower-shop/reviews/right-arrow.svg"
								unoptimized
								width={32}
							/>
						</motion.button>

						{/* Review Slide */}
						<div className="flex-1 overflow-hidden" ref={emblaRef}>
							<div className="flex">
								{reviews.map((review, index) => (
									<div
										className="flex min-w-0 flex-[0_0_100%] flex-col items-center justify-center gap-4 px-4 text-center"
										key={index}
									>
										<motion.p
											animate={{ opacity: 1, y: 0 }}
											className="text-2xl text-primary leading-tight md:text-3xl"
											initial={{ opacity: 0, y: 20 }}
											style={{ willChange: "opacity, transform" }}
											transition={{ duration: 0.5, delay: index * 0.1 }}
										>
											<span className="text-3xl">&quot;</span>
											<span className="font-normal italic">{review.text}</span>
											<span className="text-3xl">&quot;</span>
										</motion.p>
										<motion.p
											animate={{ opacity: 1 }}
											className="font-medium text-base text-primary"
											initial={{ opacity: 0 }}
											style={{ willChange: "opacity" }}
											transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
										>
											– {review.author}
										</motion.p>
									</div>
								))}
							</div>
						</div>

						{/* Right Arrow */}
						<motion.button
							aria-label="Next review"
							className="flex h-8 w-8 shrink-0 items-center justify-center transition-opacity hover:opacity-70"
							onClick={scrollNext}
							style={{ willChange: "transform" }}
							type="button"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<Image
								alt="Next"
								className="h-8 w-8"
								height={32}
								src="/images/flower-shop/reviews/right-arrow.svg"
								unoptimized
								width={32}
							/>
						</motion.button>
					</div>

					{/* Slide Nav - Dots */}
					<div className="flex gap-2">
						{reviews.map((_, index) => (
							<motion.button
								aria-label={`Go to slide ${index + 1}`}
								className={`h-2 w-2 rounded-full border transition-colors ${
									selectedIndex === index
										? "border-primary bg-primary"
										: "border-muted hover:bg-muted"
								}`}
								key={index}
								onClick={() => emblaApi?.scrollTo(index)}
								type="button"
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.8 }}
							/>
						))}
					</div>
				</div>

				{/* Button */}
				<motion.button
					className="flex h-14 cursor-pointer items-center justify-center border border-primary px-6 font-medium text-base text-primary uppercase tracking-widest transition-colors hover:bg-primary hover:text-white"
					initial={{ opacity: 0, y: 20 }}
					style={{ willChange: "opacity, transform" }}
					transition={{ duration: 0.5, delay: 0.6 }}
					type="button"
					viewport={{ once: true }}
					whileHover={{ scale: 1.02 }}
					whileInView={{ opacity: 1, y: 0 }}
					whileTap={{ scale: 0.98 }}
				>
					Read reviews
				</motion.button>
			</div>
		</section>
	);
}
