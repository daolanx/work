"use client";

import { Loader2, MailCheck } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormError, FormSuccess } from "@/components/ui/form-messages";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";

export default function ForgetPasswordPage() {
	const [email, setEmail] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [state, setState] = useState<{ success?: string; error?: string }>({});

	const handleForgetPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);
		setState({});

		await authClient.requestPasswordReset(
			{
				email,
				redirectTo: "/auth/reset-password",
			},
			{
				onSuccess: () => {
					setIsPending(false);
					setState({ success: "A recovery link has been sent to your inbox." });
				},
				onError: (ctx) => {
					setIsPending(false);
					setState({ error: ctx.error.message });
				},
			},
		);
	};

	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className={`w-full transition-all duration-300 sm:max-w-[400px] md:max-w-[420px] lg:max-w-[440px] ${isPending ? "pointer-events-none opacity-70 blur-[0.3px]" : ""}`}
				initial={{ opacity: 0, y: 10 }}
			>
				<div className="mb-10 flex flex-col items-center gap-3 text-center">
					<h1 className="font-black text-3xl uppercase italic tracking-tighter sm:text-4xl">
						Reset Access
					</h1>
					<p className="text-muted-foreground text-sm sm:text-base">
						Enter your email to receive a recovery link.
					</p>
				</div>

				<Card className="relative overflow-hidden border-muted/40 border-t-primary/20 bg-card/95 shadow-2xl backdrop-blur-xl">
					{isPending && (
						<div className="absolute top-0 right-0 left-0 h-[3px] animate-pulse bg-primary" />
					)}
					<CardContent className="px-8 pt-12 pb-10 sm:px-12">
						{state.success ? (
							<div className="flex flex-col items-center gap-6 py-4 text-center">
								<div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
									<MailCheck className="text-primary" size={32} />
								</div>
								<div className="space-y-2">
									<FormSuccess message={state.success} />
									<p className="text-muted-foreground text-sm leading-relaxed">
										Please check your email and follow the instructions to reset
										your password.
									</p>
								</div>
								<Button asChild className="mt-4 h-12 w-full" variant="outline">
									<Link href="/auth/login">Return to Login</Link>
								</Button>
							</div>
						) : (
							<form
								className="flex flex-col gap-6"
								onSubmit={handleForgetPassword}
							>
								<FormError message={state.error || ""} />

								<div className="flex flex-col gap-2.5">
									<Label htmlFor="email">Email Address</Label>
									<Input
										className="h-11"
										disabled={isPending}
										id="email"
										onChange={(e) => setEmail(e.target.value)}
										placeholder="name@example.com"
										required
										type="email"
										value={email}
									/>
								</div>

								<Button
									className="mt-2 h-12 w-full font-semibold text-base"
									disabled={isPending}
									type="submit"
								>
									{isPending ? (
										<Loader2 className="h-5 w-5 animate-spin" />
									) : (
										"Send Recovery Link"
									)}
								</Button>
							</form>
						)}
					</CardContent>
				</Card>

				<p className="mt-10 text-center text-muted-foreground text-sm">
					Remember your password?{" "}
					<Link
						className="font-bold text-foreground transition-colors hover:text-primary"
						href="/auth/login"
					>
						Return to Login
					</Link>
				</p>
			</motion.div>
		</div>
	);
}
