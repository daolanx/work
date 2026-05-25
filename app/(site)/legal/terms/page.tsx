import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
	return (
		<div className="container relative z-10 max-w-4xl py-20">
			<div className="mb-10 text-center">
				<h1 className="font-black text-3xl uppercase italic tracking-tighter sm:text-4xl">
					Terms of Service
				</h1>
				<p className="mt-2 font-mono text-muted-foreground text-xs uppercase tracking-widest">
					Last Updated: February 12, 2026
				</p>
			</div>

			<Card className="border-muted/40 bg-card/95 shadow-2xl backdrop-blur-xl">
				<CardContent className="prose prose-sm prose-invert max-w-none p-8 text-muted-foreground leading-relaxed sm:p-12">
					<section className="mb-8">
						<h2 className="mb-4 font-bold text-foreground text-lg uppercase tracking-tight">
							1. Acceptance of Terms
						</h2>
						<p>
							By accessing Indie Console (work.daolanx.me/console), you agree to
							be bound by these Terms of Service and all applicable laws and
							regulations.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-bold text-foreground text-lg uppercase tracking-tight">
							2. Service Description
						</h2>
						<p>
							Daolanx Studio provides a unified dashboard for independent
							developers to monitor metrics including users, revenue, and tasks.
							The service is provided "as is".
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-bold text-foreground text-lg uppercase tracking-tight">
							3. User Accounts
						</h2>
						<p>
							You are responsible for maintaining the confidentiality of your
							account and password. You agree to accept responsibility for all
							activities that occur under your account.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-bold text-foreground text-lg uppercase tracking-tight">
							4. Limitation of Liability
						</h2>
						<p>
							In no event shall Daolanx Studio be liable for any damages
							(including, without limitation, damages for loss of data or
							profit) arising out of the use or inability to use the services.
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
