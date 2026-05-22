"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/features/console/auth/components/login-form";
import { OAuthButton } from "@/features/console/auth/components/oauth-button";
import { OAUTH_PROVIDERS } from "@/features/console/auth/constants";

export default function LoginPage() {
	const [loginChannel, setLoginChannel] = useState<string | null>(null);
	const isLogging = loginChannel !== null;
	const t = useTranslations("console");

	return (
		<div className="flex min-h-screen w-full items-center justify-center px-4">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className={`w-full transition-all duration-300 sm:max-w-[400px] md:max-w-[420px] lg:max-w-[440px] ${isLogging ? "pointer-events-none opacity-70 blur-[0.3px]" : ""}`}
				initial={{ opacity: 0, y: 10 }}
			>
				<div className="mb-10 flex flex-col items-center gap-3 text-center">
					<h1 className="font-black text-4xl uppercase italic tracking-tighter">
						{t("auth.brand-name")}
					</h1>
					<p className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
						{t("auth.brand-tagline")}
					</p>
				</div>

				<Card className="relative overflow-hidden border-muted/40 border-t-primary/20 bg-card/95 shadow-2xl backdrop-blur-xl">
					{isLogging && (
						<div className="absolute top-0 right-0 left-0 h-[3px] animate-pulse bg-primary" />
					)}
					<CardContent className="flex flex-col gap-6 px-8 pt-12 pb-10 sm:px-12">
						<LoginForm
							onLoginingEnd={() => {
								setLoginChannel(null);
							}}
							onLoginingStart={() => {
								setLoginChannel("form");
							}}
						/>

						<div className="-mt-2 flex justify-end">
							<Link
								className="font-medium text-muted-foreground text-xs transition-colors hover:text-primary"
								href="/auth/forget-password"
							>
								{t("auth.forget-password-link")}
							</Link>
						</div>

						<div className="flex items-center">
							<div className="h-px flex-1 bg-muted-foreground/15" />
							<span className="mx-4 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
								{t("auth.oauth-divider")}
							</span>
							<div className="h-px flex-1 bg-muted-foreground/15" />
						</div>

						<div className="flex gap-3">
							{OAUTH_PROVIDERS.map((p) => (
								<OAuthButton
									disabled={isLogging}
									isSubmitting={loginChannel === p.id}
									key={p.id}
									onSubmittingEnd={() => {
										setLoginChannel(null);
									}}
									onSubmittingStart={(providerId) => {
										setLoginChannel(providerId);
									}}
									provider={p}
								/>
							))}
						</div>
					</CardContent>
				</Card>

				<p className="mt-10 text-center text-muted-foreground text-sm">
					{t("auth.no-account-text")}{" "}
					<Link
						className="ml-2 font-bold text-foreground transition-colors hover:text-primary"
						href="/auth/register"
					>
						{t("auth.create-account-link")}
					</Link>
				</p>

				<footer className="mt-12 flex flex-col items-center gap-4">
					<div className="flex items-center gap-6 font-mono text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em]">
						<Link
							className="transition-colors hover:text-primary hover:italic"
							href="/legal/terms"
							target="_blank"
						>
							{t("auth.terms")}
						</Link>
						<Link
							className="transition-colors hover:text-primary hover:italic"
							href="/legal/privacy"
							target="_blank"
						>
							{t("auth.privacy")}
						</Link>
						<Link
							className="transition-colors hover:text-primary hover:italic"
							href="/legal/refund"
							target="_blank"
						>
							{t("auth.refund")}
						</Link>
					</div>
					<div className="h-px w-8 bg-muted-foreground/20" />
					<p className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-widest">
						{t("auth.copyright")}
					</p>
				</footer>
			</motion.div>
		</div>
	);
}
