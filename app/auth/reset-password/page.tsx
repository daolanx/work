"use client";

import { Loader2, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Main Page Wrapper
 */
export default function ResetPasswordPage() {
	const [isPending, setIsPending] = useState(false);

	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4">
			{/* Background decoration */}
			<div className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-md"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<div className="mb-8 flex flex-col items-center gap-3 text-center">
					<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
						<ShieldCheck size={28} />
					</div>
					<h1 className="font-black text-3xl uppercase italic tracking-tighter">
						Reset Password
					</h1>
					<p className="text-muted-foreground text-sm">
						Secure your account with a new strong password.
					</p>
				</div>

				<Card className="relative overflow-hidden border-muted/40 bg-card/80 shadow-2xl backdrop-blur-sm">
					{/* Top progress bar */}
					{isPending && (
						<div className="absolute top-0 right-0 left-0 h-[2px] overflow-hidden">
							<div className="h-full w-full origin-left animate-progress bg-primary" />
						</div>
					)}

					<CardContent className="px-6 py-10 md:px-10">
						<Suspense
							fallback={
								<div className="flex flex-col items-center justify-center gap-4 py-12">
									<Loader2 className="animate-spin text-primary" size={40} />
									<p className="animate-pulse text-muted-foreground text-xs">
										Initializing...
									</p>
								</div>
							}
						>
							<ResetPasswordForm onLoading={setIsPending} />
						</Suspense>
					</CardContent>
				</Card>

				<p className="mt-8 text-center text-muted-foreground text-xs">
					Need help?{" "}
					<Link
						className="underline underline-offset-4 hover:text-primary"
						href="mailto:daolanx.dev@gmail.com"
					>
						Contact Security Team
					</Link>
				</p>
			</motion.div>
		</div>
	);
}
