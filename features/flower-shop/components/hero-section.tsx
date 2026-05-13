"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Types
export type Category = {
	id: number;
	label: string;
	image: string;
	imageFirst: boolean;
};

// Data
const categories: Category[] = [
	{
		id: 1,
		label: "Fresh Flowers",
		image: "/images/flower-shop/hero/fresh-flowers.jpg",
		imageFirst: false,
	},
	{
		id: 2,
		label: "Live Plants",
		image: "/images/flower-shop/hero/live-plants.jpg",
		imageFirst: true,
	},
	{
		id: 3,
		label: "Dried Flowers",
		image: "/images/flower-shop/hero/dried-flowers.jpg",
		imageFirst: false,
	},
	{
		id: 4,
		label: "Fresheners",
		image: "/images/flower-shop/hero/fresheners.jpg",
		imageFirst: true,
	},
	{
		id: 5,
		label: "Aroma Candels",
		image: "/images/flower-shop/hero/aroma-candles.jpg",
		imageFirst: false,
	},
];

// Constants
const ANIMATION_DURATION = { fast: 0.3, normal: 0.6 };

// Icons
const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
	<svg fill="none" height="24" viewBox="0 0 24 24" width="24">
		<path
			d={
				direction === "left"
					? "M19 12H5M5 12L12 19M5 12L12 5"
					: "M5 12H19M19 12L12 5M19 12L12 19"
			}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		/>
	</svg>
);

// Components
function CategoryCard({ category }: { category: Category }) {
	return (
		<div
			className={cn("group flex", category.imageFirst && "flex-row-reverse")}
		>
			{/* Text Side */}
			<div
				className={cn(
					"flex aspect-square w-1/2 flex-col items-center",
					"border-primary border-t border-l",
				)}
			>
				<div className="m-auto justify-center font-medium text-4xl leading-tight">
					{category.label}
				</div>

				<button
					className="mb-6 flex cursor-pointer justify-end gap-1 font-semibold text-primary tracking-wide"
					type="button"
				>
					<span
						className={cn(
							"transition-transform duration-300",
							category.imageFirst
								? "group-hover:-translate-x-1"
								: "group-hover:translate-x-1",
						)}
					>
						{category.imageFirst && <ArrowIcon direction="left" />}
					</span>
					Shop now
					<span
						className={cn(
							"transition-transform duration-300",
							category.imageFirst
								? "group-hover:-translate-x-1"
								: "group-hover:translate-x-1",
						)}
					>
						{!category.imageFirst && <ArrowIcon direction="right" />}
					</span>
				</button>
			</div>

			{/* Image Side */}
			<div
				className={cn(
					"relative aspect-square w-1/2 overflow-hidden",
					"border-primary border-t border-l",
				)}
			>
				<div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-105">
					<Image
						alt={category.label}
						className="object-cover"
						fill
						sizes="50vw"
						src={category.image}
						unoptimized
					/>
				</div>
			</div>
		</div>
	);
}

export default function HeroSection() {
	const shouldReduceMotion = Boolean(useReducedMotion());
	const animationDuration = shouldReduceMotion
		? ANIMATION_DURATION.fast
		: ANIMATION_DURATION.normal;

	return (
		<section className="mx-auto w-full">
			<div className="flex flex-col md:divide-x md:divide-primary lg:flex-row">
				{/* Left Section */}
				<div className="flex-1 lg:sticky lg:top-[73px]">
					<div className="px-4 py-10 md:p-20">
						<div className="mb-12">
							<motion.h1
								animate={{ opacity: 1, y: 0 }}
								className="flex flex-col font-semibold text-4xl text-primary leading-tight tracking-tight lg:text-6xl"
								initial={{ opacity: 0, y: 30 }}
								style={{ willChange: "opacity, transform" }}
								transition={{ duration: animationDuration }}
							>
								<span>Kyiv</span>
								<span>
									LuxeBouquets
									<sup className="ml-1 font-medium text-2xl lg:text-4xl">®</sup>
								</span>
							</motion.h1>
							<motion.p
								animate={{ opacity: 1, y: 0 }}
								className="mt-4 text-base text-primary-muted leading-relaxed lg:text-lg"
								initial={{ opacity: 0, y: 30 }}
								style={{ willChange: "opacity, transform" }}
								transition={{ duration: animationDuration, delay: 0.1 }}
							>
								Discover Uniquely Crafted Bouquets and Gifts for Any Occasion:
								Spread Joy with Our{" "}
								<span className="italic">Online Flower</span>{" "}
								<span className="italic">Delivery Service</span>
							</motion.p>
						</div>

						<div className="flex flex-col border-primary border-t pt-6 lg:flex-row">
							{/* Hero Image */}
							<motion.div
								animate={{ opacity: 1, scale: 1 }}
								className="w-full overflow-hidden lg:w-1/2"
								initial={{ opacity: 0, scale: 0.95 }}
								style={{ willChange: "opacity, transform" }}
								transition={{ duration: animationDuration, delay: 0.2 }}
							>
								<div className="group relative aspect-square overflow-hidden">
									<div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-105">
										<Image
											alt="Hero flowers"
											className="object-cover"
											fill
											priority
											sizes="(max-width: 1024px) 100vw, 50vw"
											src="/images/flower-shop/hero/hero.jpg"
											unoptimized
										/>
									</div>
								</div>
							</motion.div>

							{/* Description */}
							<div className="flex w-full items-end border-primary md:ml-6 md:border-l lg:w-1/2">
								<div className="px-4 lg:px-6">
									<p className="text-primary-muted text-sm leading-tight">
										Experience the joy of giving with our modern floral studio.
										Order online and send fresh flowers, plants and gifts today.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right Section - Categories */}
				<div className="mt-[-1px] ml-[-1px] flex-1">
					{categories.map((category) => (
						<CategoryCard category={category} key={category.id} />
					))}
				</div>
			</div>
		</section>
	);
}
