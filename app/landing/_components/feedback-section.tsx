import { StarIcon } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import FadeInWrapper from "./fadeIn-wrapper";

export const REVIEWS = [
	{
		name: "Michael Smith",
		username: "@michaelsmith",
		avatar: "https://randomuser.me/api/portraits/men/1.jpg",
		rating: 5,
		review:
			"This tool is a lifesaver! Managing and tracking my links has never been easier. A must-have for anyone dealing with numerous links.",
	},
	{
		name: "Emily Johnson",
		username: "@emilyjohnson",
		avatar: "https://randomuser.me/api/portraits/women/1.jpg",
		rating: 4,
		review:
			"Very useful app! It has streamlined my workflow considerably. A few minor bugs, but overall a great experience.",
	},
	{
		name: "Daniel Williams",
		username: "@danielwilliams",
		avatar: "https://randomuser.me/api/portraits/men/2.jpg",
		rating: 5,
		review:
			"I've been using this app daily for months. The insights and analytics it provides are invaluable. Highly recommend it!",
	},
	{
		name: "Sophia Brown",
		username: "@sophiabrown",
		avatar: "https://randomuser.me/api/portraits/women/2.jpg",
		rating: 4,
		review:
			"This app is fantastic! It offers everything I need to manage my links efficiently.",
	},
	{
		name: "James Taylor",
		username: "@jamestaylor",
		avatar: "https://randomuser.me/api/portraits/men/3.jpg",
		rating: 5,
		review:
			"Absolutely love this app! It's intuitive and feature-rich. Has significantly improved how I manage and track links.",
	},
	{
		name: "Olivia Martinez",
		username: "@oliviamartinez",
		avatar: "https://randomuser.me/api/portraits/women/3.jpg",
		rating: 4,
		review:
			"Great app with a lot of potential. It has already saved me a lot of time. Looking forward to future updates and improvements.",
	},
	{
		name: "William Garcia",
		username: "@williamgarcia",
		avatar: "https://randomuser.me/api/portraits/men/4.jpg",
		rating: 5,
		review:
			"This app is a game-changer for link management. It's easy to use, extremely powerful and highly recommended!",
	},
	{
		name: "Mia Rodriguez",
		username: "@miarodriguez",
		avatar: "https://randomuser.me/api/portraits/women/4.jpg",
		rating: 4,
		review:
			"I've tried several link management tools, but this one stands out. It's simple, effective.",
	},
	{
		name: "Henry Lee",
		username: "@henrylee",
		avatar: "https://randomuser.me/api/portraits/men/5.jpg",
		rating: 5,
		review:
			"This app has transformed my workflow. Managing and analyzing links is now a breeze. I can't imagine working without it.",
	},
] as const;

export default function FeedBackCard() {
	return (
		<section className="">
			<FadeInWrapper delay={0.1}>
				<div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center">
					<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
						What our users are saying
					</h2>
					<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
						Here&apos;s what some of our users have to say about Linkify.
					</p>
				</div>
			</FadeInWrapper>
			<div className="grid grid-cols-1 place-items-start gap-4 py-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
				{REVIEWS.map((review, index) => (
					<FadeInWrapper delay={0.1 * index} key={review.name}>
						<Card className="flex h-min w-full flex-col border-none">
							<CardHeader className="space-y-0">
								<CardTitle className="font-medium text-lg text-muted-foreground">
									{review.name}
								</CardTitle>
								<CardDescription>{review.username}</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4 pb-4">
								<p className="text-muted-foreground">{review.review}</p>
							</CardContent>
							<CardFooter className="mt-auto w-full space-x-1">
								{Array.from({ length: review.rating }, (_, i) => (
									<StarIcon
										className="h-4 w-4 fill-yellow-500 text-yellow-500"
										key={`${review.name}-star-${i}`}
									/>
								))}
							</CardFooter>
						</Card>
					</FadeInWrapper>
				))}
			</div>
		</section>
	);
}
