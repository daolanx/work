"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import LoginForm from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GithubIcon, GoogleIcon } from "@/components/ui/icons";
import { signInWithGithub, signInWithGoogle } from "@/lib/auth/client";

export default function LoginPage() {
	const [isPending, setIsPending] = useState(false);

	return (
		<motion.div
			animate={{ opacity: 1, scale: 1 }}
			className={`w-full max-w-[420px] px-6 transition-all ${isPending ? "pointer-events-none opacity-70 blur-[0.5px]" : ""}`}
			initial={{ opacity: 0, scale: 0.98 }}
		>
			<div className="mb-8 flex flex-col items-center gap-3 text-center">
				<h1 className="font-black text-3xl uppercase italic italic tracking-tight">
					Indie Console
				</h1>
				<p className="font-mono text-muted-foreground text-xs">
					From Vision to Launch.
				</p>
			</div>

			<Card className="overflow-hidden border-muted/40 border-t-primary/20 bg-card/95 shadow-2xl backdrop-blur-xl">
				{isPending && (
					<div className="absolute top-0 right-0 left-0 h-1 animate-pulse bg-primary" />
				)}
				<CardContent className="flex flex-col gap-6 pt-10 pb-8">
					<LoginForm onLoading={setIsPending} />

					<div className="flex items-center">
						<div className="h-px flex-1 bg-muted-foreground/15" />
						<span className="mx-4 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
							OAuth Access
						</span>
						<div className="h-px flex-1 bg-muted-foreground/15" />
					</div>

					<div className="flex gap-3">
						<Button
							className="w-1/2"
							disabled={isPending}
							onClick={signInWithGoogle}
							variant="outline"
						>
							<GoogleIcon className="mr-2" /> Google
						</Button>
						<Button
							className="w-1/2"
							disabled={isPending}
							onClick={signInWithGithub}
							variant="outline"
						>
							<GithubIcon className="mr-2" /> GitHub
						</Button>
					</div>
				</CardContent>
			</Card>

			<p className="mt-8 text-center text-muted-foreground text-sm">
				Not building yet?{" "}
				<Link
					className="font-bold text-foreground hover:text-primary"
					href="/auth/register"
				>
					Initialize Account
				</Link>
			</p>
		</motion.div>
	);
}
