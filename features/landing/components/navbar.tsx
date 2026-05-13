"use client";
import Link from "next/link";
import * as React from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const navs = [
	{
		label: "Products",
		description:
			"Explore the tools designed to turn your creative vision into a high-performance reality.",
		subNavs: [
			{
				label: "The Visual Editor",
				description:
					"Experience a weightless drag-and-drop workflow with zero lag.",
			},
			{
				label: "Performance & Speed",
				description:
					"Infrastructure built for sub-1s loading and better SEO rankings.",
			},
			{
				label: "Integrations",
				description:
					"Connect seamlessly with Stripe, Mailchimp, and your favorite tools.",
			},
			{
				label: "Global Hosting",
				description:
					"Secure, one-click publishing with automated SSL and CDN delivery.",
			},
		],
	},
	{
		label: "Templates",
		description:
			"Start with a high-carat foundation from our library of conversion-tested designs.",
		subNavs: [
			{
				label: "SaaS & Tech",
				description:
					"Modern layouts for software startups and digital products.",
			},
			{
				label: "E-commerce",
				description: "Product-focused pages engineered to drive direct sales.",
			},
			{
				label: "Lead Generation",
				description:
					"Clean, professional forms to capture and convert your audience.",
			},
			{
				label: "Blank Canvas",
				description:
					"A flexible starting point for custom landing page architecture.",
			},
		],
	},
	{
		label: "Solutions",
		description:
			"Tailored landing page experiences for every type of business and goal.",
		subNavs: [
			{
				label: "For Marketers",
				description:
					"Launch seasonal campaigns and landing pages without a developer.",
			},
			{
				label: "For Founders",
				description:
					"Quickly validate your MVP and build early-access waitlists.",
			},
			{
				label: "For Agencies",
				description:
					"Scale client results with reusable components and workspaces.",
			},
			{
				label: "For Creators",
				description:
					"Beautiful personal branding pages that grow your subscriber list.",
			},
		],
	},
	{
		label: "Resources",
		description:
			"Everything you need to master the craft of high-conversion landing pages.",
		subNavs: [
			{
				label: "Help Center",
				description: "Step-by-step tutorials and technical documentation.",
			},
			{
				label: "Midaland Blog",
				description:
					"Fresh insights on design trends and revenue growth strategies.",
			},
			{
				label: "Success Stories",
				description:
					"Real-world examples of brands that scaled using Midaland.",
			},
			{
				label: "Video Tours",
				description: "Visual walkthroughs of our intuitive building features.",
			},
		],
	},
	{
		label: "Pricing",
		description:
			"Transparent plans designed to scale alongside your growing revenue.",
		subNavs: [], // Pricing usually links directly to the section
	},
];

export default function NavBar() {
	return (
		<NavigationMenu className="ml-10 hidden md:block">
			<NavigationMenuList>
				{navs.map((nav) => {
					const { label, subNavs = [] } = nav;
					return (
						<NavigationMenuItem key={label}>
							{subNavs.length ? (
								<NavigationMenuTrigger>{label}</NavigationMenuTrigger>
							) : (
								<NavigationMenuLink asChild>
									<Link
										className={cn(navigationMenuTriggerStyle())}
										href="#"
										onClick={(e) => e.preventDefault()}
									>
										{label}
									</Link>
								</NavigationMenuLink>
							)}

							<NavigationMenuContent>
								<ul className="grid w-[400px] list-none gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
									{subNavs.map((subNav) => (
										<ListItem
											href={subNav.label}
											key={subNav.label}
											title={subNav.label}
										>
											{subNav.description}
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, href, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
					href={href}
					onClick={(e) => e.preventDefault()}
					ref={ref}
					{...props}
				>
					<div className="font-medium text-sm leading-none">{title}</div>
					<p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
