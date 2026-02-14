"use client";

import { CheckCircleIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const PLANS = [
	{
		name: "Free",
		info: "For most individuals",
		price: {
			monthly: 0,
			yearly: 0,
		},
		features: [
			{ text: "Shorten links" },
			{ text: "Up to 100 tags", limit: "100 tags" },
			{ text: "Customizable branded links" },
			{ text: "Track clicks", tooltip: "1K clicks/month" },
			{
				text: "Community support",
				tooltip: "Get answers your questions on discord",
			},
			{
				text: "AI powered suggestions",
				tooltip: "Get up to 100 AI powered suggestions",
			},
		],
		btn: {
			text: "Start for free",
			href: "/auth/sign-up?plan=free",
			variant: "default",
		},
	},
	{
		name: "Pro",
		info: "For small businesses",
		price: {
			monthly: 9,
			yearly: Math.round(9 * 12 * (1 - 0.12)),
		},
		features: [
			{ text: "Shorten links" },
			{ text: "Up to 500 tags", limit: "500 tags" },
			{ text: "Customizable branded links" },
			{ text: "Track clicks", tooltip: "20K clicks/month" },
			{ text: "Export click data", tooltip: "Upto 1K links" },
			{ text: "Priority support", tooltip: "Get 24/7 chat support" },
			{
				text: "AI powered suggestions",
				tooltip: "Get up to 500 AI powered suggestions",
			},
		],
		btn: {
			text: "Get started",
			href: "/auth/sign-up?plan=pro",
			variant: "purple",
		},
	},
	{
		name: "Business",
		info: "For large organizations",
		price: {
			monthly: 49,
			yearly: Math.round(49 * 12 * (1 - 0.12)),
		},
		features: [
			{ text: "Shorten links" },
			{ text: "Unlimited tags" },
			{ text: "Customizable branded links" },
			{ text: "Track clicks", tooltip: "Unlimited clicks" },
			{ text: "Export click data", tooltip: "Unlimited clicks" },
			{
				text: "Dedicated manager",
				tooltip: "Get priority support from our team",
			},
			{
				text: "AI powered suggestions",
				tooltip: "Get unlimited AI powered suggestions",
			},
		],
		btn: {
			text: "Contact team",
			href: "/auth/sign-up?plan=business",
			variant: "default",
		},
	},
];

const PricingCards = () => {
	return (
		<section>
			<Tabs
				className="flex w-full flex-col items-center justify-center"
				defaultValue="monthly"
			>
				<TabsList>
					<TabsTrigger value="monthly">monthly</TabsTrigger>
					<TabsTrigger value="yearly">yearly</TabsTrigger>
				</TabsList>

				<TabsContent
					className="mx-auto grid w-full max-w-5xl grid-cols-1 flex-wrap gap-5 pt-6 md:gap-8 lg:grid-cols-3"
					value="monthly"
				>
					{PLANS.map((plan) => (
						<Card
							className={cn(
								plan.name === "Pro" && "border-2 border-purple-500",
							)}
							key={plan.name}
						>
							<CardHeader
								className={cn(
									"border-border border-b",
									plan.name === "Pro"
										? "bg-purple-500/[0.08]"
										: "bg-foreground/[0.03]",
								)}
							>
								<CardTitle
									className={cn(
										plan.name !== "Pro" && "text-muted-foreground",
										"font-medium text-lg",
									)}
								>
									{plan.name}
								</CardTitle>
								<CardDescription>{plan.info}</CardDescription>
								<div className="font-semibold text-3xl">
									${plan.price.monthly}
									<span className="font-normal text-base text-muted-foreground">
										{plan.name !== "Free" ? "/month" : ""}
									</span>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								{plan.features.map((feature, _index) => (
									<div className="flex items-center gap-2" key={feature.text}>
										<CheckCircleIcon className="h-4 w-4 text-purple-500" />
										<TooltipProvider>
											<Tooltip delayDuration={0}>
												<TooltipTrigger asChild>
													<p
														className={cn(
															feature.tooltip &&
																"!border-dashed cursor-pointer border-border border-b",
														)}
													>
														{feature.text}
													</p>
												</TooltipTrigger>
												{feature.tooltip && (
													<TooltipContent>
														<p>{feature.tooltip}</p>
													</TooltipContent>
												)}
											</Tooltip>
										</TooltipProvider>
									</div>
								))}
							</CardContent>
							<CardFooter className="mt-auto w-full">
								<Link
									className={buttonVariants({
										className:
											plan.name === "Pro" &&
											"bg-purple-700 text-white hover:bg-purple-700/80",
									})}
									href={plan.btn.href}
									style={{ width: "100%" }}
								>
									{plan.btn.text}
								</Link>
							</CardFooter>
						</Card>
					))}
				</TabsContent>
				<TabsContent
					className="mx-auto grid w-full max-w-5xl grid-cols-1 flex-wrap gap-5 pt-6 md:gap-8 lg:grid-cols-3"
					value="yearly"
				>
					{PLANS.map((plan) => (
						<Card
							className={cn(
								"flex w-full flex-col rounded-xl border-border",
								plan.name === "Pro" && "border-2 border-purple-500",
							)}
							key={plan.name}
						>
							<CardHeader
								className={cn(
									"border-border border-b",
									plan.name === "Pro"
										? "bg-purple-500/[0.07]"
										: "bg-foreground/[0.03]",
								)}
							>
								<CardTitle
									className={cn(
										plan.name !== "Pro" && "text-muted-foreground",
										"font-medium text-lg",
									)}
								>
									{plan.name}
								</CardTitle>
								<CardDescription>{plan.info}</CardDescription>
								<h5 className="flex items-end font-semibold text-3xl">
									${plan.price.yearly}
									<div className="font-normal text-base text-muted-foreground">
										{plan.name !== "Free" ? "/year" : ""}
									</div>
									{plan.name !== "Free" && (
										<motion.span
											animate={{ opacity: 1, y: 0 }}
											className="ml-2 rounded-md bg-purple-500 px-2 py-0.5 font-medium text-foreground text-sm"
											exit={{ opacity: 0, y: 10 }}
											initial={{ opacity: 0, y: 10 }}
											transition={{
												duration: 0.3,
												type: "spring",
												bounce: 0.25,
											}}
										>
											-12%
										</motion.span>
									)}
								</h5>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								{plan.features.map((feature, _index) => (
									<div className="flex items-center gap-2" key={feature.text}>
										<CheckCircleIcon className="h-4 w-4 text-purple-500" />
										<TooltipProvider>
											<Tooltip delayDuration={0}>
												<TooltipTrigger asChild>
													<p
														className={cn(
															feature.tooltip &&
																"!border-dashed cursor-pointer border-border border-b",
														)}
													>
														{feature.text}
													</p>
												</TooltipTrigger>
												{feature.tooltip && (
													<TooltipContent>
														<p>{feature.tooltip}</p>
													</TooltipContent>
												)}
											</Tooltip>
										</TooltipProvider>
									</div>
								))}
							</CardContent>
							<CardFooter className="pt- mt-auto w-full">
								<Link
									className={buttonVariants({
										className:
											plan.name === "Pro" &&
											"bg-purple-500 text-white hover:bg-purple-500/80",
									})}
									href={plan.btn.href}
									style={{ width: "100%" }}
								>
									{plan.btn.text}
								</Link>
							</CardFooter>
						</Card>
					))}
				</TabsContent>
			</Tabs>
		</section>
	);
};

export default PricingCards;
