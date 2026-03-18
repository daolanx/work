import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function HeroSection() {
	return (
		<section>
			<div className="text-center">
				<h1 className="!leading-[1.15] text-balance py-6 font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
					Intuitive Landing Page Builder for{" "}
					<span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
						Revenue Growth
					</span>
				</h1>
				<p className="mb-12 text-balance text-lg text-muted-foreground tracking-tight md:text-xl">
					Design high-performance landing pages that load instantly and convert
					consistently.
					<br className="hidden md:block" />
					<span className="hidden md:block">Simple, Fast, Intuitive.</span>
				</p>
				<RainbowButton asChild className="px-8 py-6 text-xl">
					<Link className="group inline-flex items-center" href="#">
						Start Building for Free
						<ArrowRightIcon className="h-4 w-4 transition-all duration-200 group-hover:translate-x-1" />
					</Link>
				</RainbowButton>
			</div>

			<div className="relative w-full bg-transparent px-2 pt-20 pb-20 md:py-32">
				{/* Hero image: no animation wrapper for faster LCP */}
				<div className="-m-2 rounded-xl bg-opacity-50 p-2 ring-1 ring-foreground/20 ring-inset backdrop-blur-3xl lg:-m-4 lg:rounded-2xl">
					<Image
						alt="Dashboard"
						className="rounded-md bg-foreground/10 ring-1 ring-border lg:rounded-xl"
						width={1920}
						height={956}
						priority
						fetchPriority="high"
						sizes="(max-width: 1200px) 100vw, 1120px"
						src="/landing/dashboard.webp"
					/>
					<div className="absolute inset-x-0 -bottom-4 z-40 h-1/2 w-full bg-gradient-to-t from-background"></div>
					<div className="absolute inset-x-0 bottom-0 z-50 h-1/4 w-full bg-gradient-to-t from-background md:-bottom-8"></div>
				</div>
			</div>
		</section>
	);
}
