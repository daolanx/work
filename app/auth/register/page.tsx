"use client";

import { motion } from "motion/react";
import Link from "next/link";
import RegisterForm from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GithubIcon, GoogleIcon } from "@/components/ui/icons";
import { signInWithGithub, signInWithGoogle } from "@/lib/auth/client";

export default function RegisterPage() {
	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className="w-full max-w-[420px] px-6"
			initial={{ opacity: 0, y: 20 }}
		>
			<div className="mb-8 flex flex-col items-center gap-3 text-center">
				<h1 className="font-black text-3xl uppercase italic italic tracking-tight">
					Indie Console
				</h1>
				<p className="font-mono text-muted-foreground text-xs">
					From Vision to Launch.
				</p>
			</div>

			<Card className="border-muted/40 border-t-primary/20 bg-card/95 shadow-2xl backdrop-blur-xl">
				<CardContent className="flex flex-col gap-6 pt-10 pb-8">
					<RegisterForm />

					<div className="flex items-center">
						<div className="h-px flex-1 bg-muted-foreground/15" />
						<span className="mx-4 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
							Quick Auth
						</span>
						<div className="h-px flex-1 bg-muted-foreground/15" />
					</div>

					<div className="flex gap-3">
						<Button
							className="w-1/2"
							onClick={signInWithGoogle}
							variant="outline"
						>
							<GoogleIcon className="mr-2" /> Google
						</Button>
						<Button
							className="w-1/2"
							onClick={signInWithGithub}
							variant="outline"
						>
							<GithubIcon className="mr-2" /> GitHub
						</Button>
					</div>
				</CardContent>
			</Card>

			<p className="mt-8 text-center text-muted-foreground text-sm">
				Already have access?{" "}
				<Link
					className="font-bold text-foreground hover:text-primary"
					href="/auth/login"
				>
					Sign In
				</Link>
			</p>
		</motion.div>
	);
}
