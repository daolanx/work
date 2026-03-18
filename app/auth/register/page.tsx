"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { OAuthButton } from "@/components/auth/oauth-button";
import RegisterForm from "@/components/auth/register-form";
import { Card, CardContent } from "@/components/ui/card";

export default function RegisterPage() {
	const [isPending, setIsPending] = useState(false);

	return (
		<div className="flex min-h-screen w-full items-center justify-center px-4">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className={`w-full transition-all duration-300 sm:max-w-[400px] md:max-w-[420px] lg:max-w-[440px] ${isPending ? "pointer-events-none opacity-70 blur-[0.3px]" : ""}`}
				initial={{ opacity: 0, y: 10 }}
			>
				<div className="mb-10 flex flex-col items-center gap-3 text-center">
					<h1 className="font-black text-4xl uppercase italic tracking-tighter">
						Indie Console
					</h1>
					<p className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
						From Vision to Launch.
					</p>
				</div>

				<Card className="relative overflow-hidden border-muted/40 border-t-primary/20 bg-card/95 shadow-2xl backdrop-blur-xl">
					{isPending && (
						<div className="absolute top-0 right-0 left-0 h-[3px] animate-pulse bg-primary" />
					)}
					<CardContent className="flex flex-col gap-6 px-8 pt-12 pb-10 sm:px-12">
						{/* Note: Ensure RegisterForm accepts and calls onLoading if you want the pulse bar to sync with form submission */}
						<RegisterForm onLoading={setIsPending} />

						<div className="flex items-center">
							<div className="h-px flex-1 bg-muted-foreground/15" />
							<span className="mx-4 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
								OAUTH
							</span>
							<div className="h-px flex-1 bg-muted-foreground/15" />
						</div>

						<div className="flex gap-3">
							<OAuthButton
								disabled={isPending}
								onLoading={setIsPending}
								provider="google"
							/>
							<OAuthButton
								disabled={isPending}
								onLoading={setIsPending}
								provider="github"
							/>
						</div>
					</CardContent>
				</Card>

				<p className="mt-10 text-center text-muted-foreground text-sm">
					Already have a account?
					<Link
						className="ml-2 font-bold text-foreground transition-colors hover:text-primary"
						href="/auth/login"
					>
						Sign In
					</Link>
				</p>
			</motion.div>
		</div>
	);
}
