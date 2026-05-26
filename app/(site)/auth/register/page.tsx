"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { OAuthButton } from "@/features/console/auth/components/oauth-button";
import RegisterForm from "@/features/console/auth/components/register-form";
import { OAUTH_PROVIDERS } from "@/features/console/auth/constants";

export default function RegisterPage() {
	const [registerChannel, setRegisterChannel] = useState<string | null>(null);
	const isRegistering = registerChannel !== null;
	const t = useTranslations("console");

	return (
		<div className="flex min-h-screen w-full items-center justify-center px-4">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className={`w-full transition-all duration-300 sm:max-w-[400px] md:max-w-[420px] lg:max-w-[440px] ${isRegistering ? "pointer-events-none opacity-70 blur-[0.3px]" : ""}`}
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
					{isRegistering && (
						<div className="absolute top-0 right-0 left-0 h-[3px] animate-pulse bg-primary" />
					)}
					<CardContent className="flex flex-col gap-6 px-8 pt-12 pb-10 sm:px-12">
						<RegisterForm
							onRegisteringEnd={() => {
								setRegisterChannel(null);
							}}
							onRegisteringStart={() => {
								setRegisterChannel("form");
							}}
						/>

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
									disabled={isRegistering}
									isSubmitting={registerChannel === p.id}
									key={p.id}
									onSubmittingEnd={() => {
										setRegisterChannel(null);
									}}
									onSubmittingStart={(providerId) => {
										setRegisterChannel(providerId);
									}}
									provider={p}
								/>
							))}
						</div>
					</CardContent>
				</Card>

				<p className="mt-10 text-center text-muted-foreground text-sm">
					{t("auth.already-have-account")}{" "}
					<Link
						className="ml-2 font-bold text-foreground transition-colors hover:text-primary"
						href="/auth/login"
					>
						{t("auth.sign-in-link")}
					</Link>
				</p>
			</motion.div>
		</div>
	);
}
