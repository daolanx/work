import { Card, CardContent } from "@/components/ui/card";

export default function RefundPage() {
	return (
		<div className="container relative z-10 max-w-4xl py-20">
			<div className="mb-10 text-center">
				<h1 className="font-black text-3xl uppercase italic tracking-tighter sm:text-4xl">
					Refund Policy
				</h1>
				<p className="mt-2 font-mono text-muted-foreground text-xs uppercase tracking-widest">
					Last Updated: February 12, 2026
				</p>
			</div>

			<Card className="border-muted/40 bg-card/95 shadow-2xl backdrop-blur-xl">
				<CardContent className="prose prose-sm prose-invert max-w-none p-8 text-muted-foreground leading-relaxed sm:p-12">
					<section className="mb-8">
						<h2 className="mb-4 font-bold text-foreground text-lg uppercase tracking-tight">
							1. Digital Products
						</h2>
						<p>
							Due to the nature of digital software and immediate access to
							tools upon subscription, all sales are generally final and
							non-refundable.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-bold text-foreground text-lg uppercase tracking-tight">
							2. Free Trial
						</h2>
						<p>
							We encourage users to try our free version to ensure the tool
							meets their needs before upgrading to a Pro plan.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-bold text-foreground text-lg uppercase tracking-tight">
							3. Technical Issues
						</h2>
						<p>
							If you encounter a persistent technical error that prevents you
							from using the service, please contact us within 7 days of
							purchase for assistance or a partial refund.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-bold text-foreground text-lg uppercase tracking-tight">
							4. Contact Us
						</h2>
						<p>
							For any refund-related inquiries, please email dax@daolanx.me with
							your transaction details.
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
