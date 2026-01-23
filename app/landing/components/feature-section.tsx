import {
	ArrowRightIcon,
	CalendarIcon,
	Link2Icon,
	type LucideIcon,
	SearchIcon,
	WaypointsIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import FadeInWrapper from "@/app/landing/components/fadeIn-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Command } from "@/components/ui/command";
import { IconCloud } from "@/components/ui/icon-cloud";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const CARDS = [
	{
		Icon: Link2Icon,
		name: "Shorten links",
		description: "Create short links that are easy to remember and share.",
		href: "#",
		cta: "Learn more",
		className: "col-span-3 lg:col-span-1",
		background: (
			<Card className="absolute top-10 left-10 origin-top rounded-none rounded-tl-md border border-border border-r-0 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-105">
				<CardHeader>
					<CardTitle>Create short links</CardTitle>
					<CardDescription>
						Create short links that are easy to remember and share.
					</CardDescription>
				</CardHeader>
				<CardContent className="-mt-4">
					<Label>Paste your link</Label>
					<Input
						className="w-full focus-visible:ring-0 focus-visible:ring-transparent"
						placeholder="Paste your link here..."
						type="text"
					/>
				</CardContent>
			</Card>
		),
	},
	{
		Icon: SearchIcon,
		name: "Search your links",
		description: "Quickly find the links you need with AI-powered search.",
		href: "#",
		cta: "Learn more",
		className: "col-span-3 lg:col-span-2",
		background: (
			<Command className="absolute top-10 right-10 w-[70%] origin-to translate-x-0 border border-border p-2 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
				<Input placeholder="Type to search..." />
				<div className="mt-1 cursor-pointer">
					<div className="rounded-md px-4 py-2 hover:bg-muted">
						linkify.io/hdf00c
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted">
						linkify.io/sdv0n0
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted">
						linkify.io/03gndo
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted">
						linkify.io/09vmmw
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted">
						linkify.io/s09vws
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted">
						linkify.io/sd8fv5
					</div>
				</div>
			</Command>
		),
	},
	{
		Icon: WaypointsIcon,
		name: "Connect your apps",
		description: "Integrate with your favorite apps and services.",
		href: "#",
		cta: "Learn more",
		className: "col-span-3 lg:col-span-2 max-w-full overflow-hidden",
		background: (
			<div className="absolute right-0 w-[70%] origin-to translate-x-0 p-2 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-y-10">
				<IconCloud
					images={[
						"dart",
						"java",
						"react",
						"flutter",
						"nodedotjs",
						"express",
						"nextdotjs",
						"prisma",
						"amazonaws",
						"postgresql",
						"firebase",
						"nginx",
						"vercel",
						"cypress",
						"docker",
						"jira",
						"github",
						"gitlab",
						"visualstudiocode",
						"androidstudio",
						"sonarqube",
						"figma",
					].map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`)}
				/>
			</div>
		),
	},
	{
		Icon: CalendarIcon,
		name: "Calendar",
		description: "Keep track of your links with our calendar view.",
		className: "col-span-3 lg:col-span-1",
		href: "#",
		cta: "Learn more",
		background: (
			<Calendar
				className="absolute top-10 right-0 origin-top rounded-md border border-border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
				mode="single"
				selected={new Date(2022, 4, 11, 0, 0, 0)}
			/>
		),
	},
];

const BentoGrid = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
				className,
			)}
		>
			{children}
		</div>
	);
};

const BentoCard = ({
	name,
	className,
	background,
	Icon,
	description,
	href,
	cta,
}: {
	name: string;
	className: string;
	background: ReactNode;
	Icon: LucideIcon;
	description: string;
	href: string;
	cta: string;
}) => (
	<div
		className={cn(
			"group relative col-span-2 flex flex-col justify-between overflow-hidden rounded-xl border border-border/60",
			"bg-black [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
			className,
		)}
		key={name}
	>
		<div className="pointer-events-none">{background}</div>
		<div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
			<Icon className="h-12 w-12 origin-left text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
			<h3 className="font-semibold text-neutral-300 text-xl">{name}</h3>
			<p className="max-w-lg text-neutral-400">{description}</p>
		</div>

		<div
			className={cn(
				"absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
			)}
		>
			<Link
				className={buttonVariants({
					size: "sm",
					variant: "ghost",
					className: "cursor-pointer",
				})}
				href={href}
			>
				{cta}
				<ArrowRightIcon className="ml-2 h-4 w-4" />
			</Link>
		</div>
		<div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
	</div>
);

export default function FeatureSection() {
	return (
		<section>
			<FadeInWrapper delay={0.1}>
				<div className="flex w-full flex-col items-center justify-center py-8 lg:items-center">
					<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
						Manage Links Like a Pro
					</h2>
					<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
						Linkify is a powerful link management tool that helps you shorten,
						track, and organize all your links in one place.
					</p>
				</div>
			</FadeInWrapper>
			<FadeInWrapper delay={0.2}>
				<BentoGrid className="py-8">
					{CARDS.map((feature) => (
						<BentoCard key={feature.name} {...feature} />
					))}
				</BentoGrid>
			</FadeInWrapper>
		</section>
	);
}
