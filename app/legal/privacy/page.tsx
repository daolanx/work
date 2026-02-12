import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
	return (
		<div className="container relative z-10 mx-auto max-w-4xl py-20">
			<div className="mb-10 text-center">
				<h1 className="font-black text-3xl uppercase italic tracking-tighter sm:text-4xl">
					Privacy Policy
				</h1>
				<p className="mt-2 font-mono text-muted-foreground text-xs uppercase tracking-widest">
					Last Updated: February 12, 2026
				</p>
			</div>

			<Card className="border-muted/40 bg-card/95 shadow-2xl backdrop-blur-xl">
				<CardContent className="prose prose-sm prose-invert max-w-none p-8 text-muted-foreground leading-relaxed sm:p-12">
					<section className="mb-8">
						<h2 className="mb-4 font-bold text-foreground text-lg uppercase tracking-tight">
							1. Data Collection
						</h2>
						<p>
							We collect minimal information required for service delivery:
							email addresses for account management and essential technical
							logs.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-bold text-foreground text-lg uppercase tracking-tight">
							2. API Integrations
						</h2>
						<p>
							Our service connects to third-party APIs (Stripe, Google
							Analytics, etc.). We use industry-standard encryption to handle
							your API keys and never store sensitive tokens in plain text.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-bold text-foreground text-lg uppercase tracking-tight">
							3. Data Usage
						</h2>
						<p>
							Your data is used solely to populate your dashboard. We do not
							sell, rent, or share your personal or business data with third
							parties for marketing.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-bold text-foreground text-lg uppercase tracking-tight">
							4. Cookies
						</h2>
						<p>
							We use essential cookies to maintain your session and improve the
							performance of Indie Console.
						</p>
					</section>

					<div className="mt-12 border-muted/40 border-t pt-8 text-xs">
						<p className="mb-2 text-gray-500 uppercase tracking-widest">
							Inquiries & Support
						</p>
						<a
							className="font-bold transition-all hover:underline"
							href="mailto:daolanx@hotmail.com"
						>
							daolanx@hotmail.com
						</a>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
