"use client";

import { CheckCircleIcon } from "lucide-react";
import * as m from "motion/react-m";
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
import type { PricingTier } from "@/features/landing/services";
import { cn } from "@/lib/utils";

const PLAN_UI: Record<
	string,
	{
		name: string;
		info: string;
		features: Array<{ text: string; limit?: string; tooltip?: string }>;
		btn: { text: string; href: string; variant: string };
	}
> = {
	free: {
		name: "Free",
		info: "For most individuals",
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
			href: "/auth/sign-up?tier=free",
			variant: "default",
		},
	},
	pro: {
		name: "Pro",
		info: "For small businesses",
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
			href: "/auth/sign-up?tier=pro",
			variant: "purple",
		},
	},
	max: {
		name: "Max",
		info: "For large organizations",
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
			href: "/auth/sign-up?tier=max",
			variant: "default",
		},
	},
};

const PricingCards = ({ plans }: { plans: PricingTier[] }) => {
	return (
		<section>
			<TooltipProvider>
				<Tabs
					className="flex w-full flex-col items-center justify-center"
					defaultValue="monthly"
					id="pricing-tabs"
				>
					<TabsList>
						<TabsTrigger value="monthly">monthly</TabsTrigger>
						<TabsTrigger value="yearly">yearly</TabsTrigger>
					</TabsList>

					<TabsContent
						className="mx-auto grid w-full max-w-5xl grid-cols-1 flex-wrap gap-5 pt-6 md:gap-8 lg:grid-cols-3"
						value="monthly"
					>
						{plans.map((plan) => {
							const ui = PLAN_UI[plan.type];
							if (!ui) return null;
							const isHighlight = plan.type === "pro";
							return (
								<Card
									className={cn(isHighlight && "border-2 border-purple-500")}
									key={plan.type}
								>
									<CardHeader
										className={cn(
											"border-border border-b",
											isHighlight
												? "bg-purple-500/[0.08]"
												: "bg-foreground/[0.03]",
										)}
									>
										<CardTitle
											className={cn(
												!isHighlight && "text-muted-foreground",
												"font-medium text-lg",
											)}
										>
											{ui.name}
										</CardTitle>
										<CardDescription>{ui.info}</CardDescription>
										<div className="font-semibold text-3xl">
											${plan.priceMonthly}
											<span className="font-normal text-base text-muted-foreground">
												{plan.type !== "free" ? "/month" : ""}
											</span>
										</div>
									</CardHeader>
									<CardContent className="space-y-4 pt-6">
										{ui.features.map((feature) => (
											<div
												className="flex items-center gap-2"
												key={feature.text}
											>
												<CheckCircleIcon className="h-4 w-4 text-purple-500" />
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
											</div>
										))}
									</CardContent>
									<CardFooter className="mt-auto w-full">
										<Link
											className={buttonVariants({
												className:
													isHighlight &&
													"bg-purple-700 text-white hover:bg-purple-700/80",
											})}
											href={ui.btn.href}
											style={{ width: "100%" }}
										>
											{ui.btn.text}
										</Link>
									</CardFooter>
								</Card>
							);
						})}
					</TabsContent>
					<TabsContent
						className="mx-auto grid w-full max-w-5xl grid-cols-1 flex-wrap gap-5 pt-6 md:gap-8 lg:grid-cols-3"
						value="yearly"
					>
						{plans.map((plan) => {
							const ui = PLAN_UI[plan.type];
							if (!ui) return null;
							const isHighlight = plan.type === "pro";
							return (
								<Card
									className={cn(
										"flex w-full flex-col rounded-xl border-border",
										isHighlight && "border-2 border-purple-500",
									)}
									key={plan.type}
								>
									<CardHeader
										className={cn(
											"border-border border-b",
											isHighlight
												? "bg-purple-500/[0.07]"
												: "bg-foreground/[0.03]",
										)}
									>
										<CardTitle
											className={cn(
												!isHighlight && "text-muted-foreground",
												"font-medium text-lg",
											)}
										>
											{ui.name}
										</CardTitle>
										<CardDescription>{ui.info}</CardDescription>
										<h5 className="flex items-end font-semibold text-3xl">
											${plan.priceAnnually}
											<div className="font-normal text-base text-muted-foreground">
												{plan.type !== "free" ? "/year" : ""}
											</div>
											{plan.type !== "free" && (
												<m.span
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
												</m.span>
											)}
										</h5>
									</CardHeader>
									<CardContent className="space-y-4 pt-6">
										{ui.features.map((feature) => (
											<div
												className="flex items-center gap-2"
												key={feature.text}
											>
												<CheckCircleIcon className="h-4 w-4 text-purple-500" />
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
											</div>
										))}
									</CardContent>
									<CardFooter className="mt-auto w-full pt-0">
										<Link
											className={buttonVariants({
												className:
													isHighlight &&
													"bg-purple-500 text-white hover:bg-purple-500/80",
											})}
											href={ui.btn.href}
											style={{ width: "100%" }}
										>
											{ui.btn.text}
										</Link>
									</CardFooter>
								</Card>
							);
						})}
					</TabsContent>
				</Tabs>
			</TooltipProvider>
		</section>
	);
};

export default PricingCards;
