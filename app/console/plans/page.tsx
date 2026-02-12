"use client";

import {
	BarChart3,
	Check,
	Crown,
	ExternalLink,
	Rocket,
	Shield,
	Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TIER_STRATEGIES = {
	entry: {
		accentColor: "emerald",
		icon: <Zap className="h-5 w-5" />,
		styles: {
			border: "border-emerald-500/20 hover:border-emerald-500",
			text: "text-emerald-500",
			bg: "bg-emerald-500/10",
			button: "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border-zinc-700",
			accent: "bg-emerald-500",
			container: "",
		},
	},
	main: {
		accentColor: "blue",
		icon: <Rocket className="h-5 w-5" />,
		styles: {
			border: "border-blue-500/40 hover:border-blue-500",
			text: "text-blue-500",
			bg: "bg-blue-500/10",
			button: "bg-blue-600 hover:bg-blue-500 shadow-blue-900/20 text-white",
			accent: "bg-blue-500",
			container:
				"ring-2 ring-blue-500/50 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] scale-105 z-10",
		},
	},
	premium: {
		accentColor: "violet",
		icon: <Crown className="h-5 w-5" />,
		styles: {
			border: "border-violet-500/30 hover:border-violet-500",
			text: "text-violet-400",
			bg: "bg-violet-500/10",
			button: "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border-zinc-700",
			accent: "bg-violet-500",
			container: "",
		},
	},
};

const TIER_DATA = [
	{
		type: "entry",
		name: "Hobby",
		price: "0",
		variantId: null,
		description: "Perfect for rapid idea validation.",
		features: [
			"3 Sandbox Projects",
			"Basic Traffic Stats",
			"Global Edge Deployment",
			"IndieConsole Watermark",
		],
		cta: "Current Plan",
	},
	{
		type: "main",
		name: "Pro",
		price: "12",
		variantId: "creem_pro_123",
		description: "Scale your winning ideas into products.",
		features: [
			"Unlimited Projects",
			"No Watermark",
			"Custom Domains",
			"Priority Email Support",
		],
		cta: "Upgrade to Pro",
	},
	{
		type: "premium",
		name: "Studio",
		price: "39",
		variantId: "creem_studio_456",
		description: "Advanced controls for small teams.",
		features: [
			"3 Team Seats",
			"White-label Console",
			"Full API Access",
			"Dedicated Database",
		],
		cta: "Go Elite",
	},
];

export default function BillingPage() {
	const userPlan = "entry";
	const usage = { projects: 2, limit: 3 };

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col space-y-16 px-6 py-12">
			<section className="space-y-6">
				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
					<div>
						<h2 className="font-black text-3xl uppercase italic italic tracking-tight">
							Subscription
						</h2>
						<p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
							Current usage & billing status
						</p>
					</div>
				</div>

				<Card className="overflow-hidden backdrop-blur-md">
					<CardContent className="grid grid-cols-1 gap-12 p-8 md:grid-cols-3">
						<div className="space-y-2">
							<span className="font-mono text-[10px] text-muted-foreground uppercase">
								Active Plan
							</span>
							<div className="flex items-center gap-3">
								<div className="rounded bg-emerald-500/10 p-2 text-emerald-500">
									<Zap size={20} />
								</div>
								<div>
									<h4 className="font-black text-xl uppercase italic">
										Hobby Free
									</h4>
									<p className="text-[10px] text-muted-foreground">
										Renews on Mar 12, 2026
									</p>
								</div>
							</div>
						</div>

						<div className="space-y-3">
							<div className="flex justify-between font-mono text-[10px] uppercase">
								<span className="text-muted-foreground">Project Slots</span>
								<span className="text-foreground">
									{usage.projects} / {usage.limit}
								</span>
							</div>
							<Progress
								className="h-1.5 bg-zinc-800"
								value={(usage.projects / usage.limit) * 100}
							/>
							<p className="text-[10px] text-muted-foreground italic">
								{usage.limit - usage.projects} slot remaining. Upgrade for
								unlimited access.
							</p>
						</div>
					</CardContent>
				</Card>
			</section>

			<section className="space-y-10 border-zinc-300 border-t pt-8">
				<div className="text-center md:text-left">
					<h2 className="font-black text-3xl uppercase italic tracking-tight">
						Available Plans
					</h2>
					<p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
						Choose your performance level
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{TIER_DATA.map((tier) => {
						const strategy =
							TIER_STRATEGIES[tier.type as keyof typeof TIER_STRATEGIES];
						const isCurrent = userPlan === tier.type;

						return (
							<Card
								className={`relative h-full overflow-hidden transition-all duration-500 ${strategy.styles.container} ${strategy.styles.border}
              `}
								key={tier.name}
							>
								<div
									className={`absolute top-0 right-0 left-0 h-[2px] ${strategy.styles.accent} opacity-40`}
								/>

								<CardContent className="flex h-full flex-col p-8">
									<div
										className={`mb-6 w-fit rounded-lg p-2 ${strategy.styles.bg} ${strategy.styles.text}`}
									>
										{strategy.icon}
									</div>

									<h3
										className={`mb-1 font-black text-2xl uppercase italic tracking-tighter ${strategy.styles.text}`}
									>
										{tier.name}
									</h3>

									<div className="mb-6 flex items-baseline gap-1">
										<span className="font-black text-3xl italic">$</span>
										<span className="font-black text-5xl tracking-tighter">
											{tier.price}
										</span>
										<span className="font-mono text-[10px] text-muted-foreground uppercase">
											/mo
										</span>
									</div>

									<div className="mb-10 flex-grow space-y-4">
										{tier.features.map((feature) => (
											<div className="flex items-start gap-3" key={feature}>
												<Check
													className={`mt-0.5 h-4 w-4 shrink-0 ${strategy.styles.text}`}
												/>
												<span className="font-mono text-[11px] text-muted-foreground/80 uppercase leading-tight">
													{feature}
												</span>
											</div>
										))}
									</div>

									<Button
										className={`w-full py-6 font-black text-[11px] uppercase italic tracking-widest transition-all duration-300 ${strategy.styles.button} ${isCurrent ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
										disabled={isCurrent}
									>
										{isCurrent ? "Active" : tier.cta}
									</Button>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</section>

			{/* 底部保障 */}
			<footer className="flex justify-center gap-12 pt-4 opacity-30">
				<div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest">
					<Shield size={12} /> SSL Encrypted
				</div>
				<div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest">
					<BarChart3 size={12} /> Usage-based Billing
				</div>
			</footer>
		</div>
	);
}
