import { BarChart3Icon, FolderOpenIcon, WandSparklesIcon } from "lucide-react";
import FadeInWrapper from ".//fadeIn-wrapper";

export const PROCESS = [
	{
		title: "Organize Your Links",
		description:
			"Efficiently categorize and tag your links for quick access and easy management.",
		icon: FolderOpenIcon,
	},
	{
		title: "Shorten and Customize",
		description:
			"Create concise, branded links that are easy to share and track.",
		icon: WandSparklesIcon,
	},
	{
		title: "Analyze and Optimize",
		description:
			"Gain insights into link performance and optimize for better engagement.",
		icon: BarChart3Icon,
	},
] as const;

export default function ProcessSection() {
	return (
		<section>
			<FadeInWrapper delay={0.1}>
				<div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center">
					<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
						Build Just With 3 Steps
					</h2>
					<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
						Follow these simple steps to optimize, organize, and share your
						links with ease.
					</p>
				</div>
			</FadeInWrapper>
			<div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
				{PROCESS.map((process, id) => (
					<FadeInWrapper delay={0.2 * id} key={process.title}>
						<div className="group rounded-2xl p-4 ring-1 ring-gray-200 md:p-8">
							<div className="flex w-full flex-col items-start justify-center">
								<process.icon
									className="h-10 w-10 text-foreground"
									strokeWidth={1.5}
								/>
								<div className="relative flex flex-col items-start">
									<span className="absolute -top-6 right-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border pt-0.5 font-medium text-2xl text-foreground">
										{id + 1}
									</span>
									<h3 className="mt-6 font-medium text-base text-foreground">
										{process.title}
									</h3>
									<p className="mt-2 text-muted-foreground text-sm">
										{process.description}
									</p>
								</div>
							</div>
						</div>
					</FadeInWrapper>
				))}
			</div>
		</section>
	);
}
