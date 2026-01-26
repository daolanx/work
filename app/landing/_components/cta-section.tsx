import { ArrowRightIcon } from "lucide-react";
import FadeInWrapper from ".//fadeIn-wrapper";
import { Button } from "@/components/ui/button";

export default function CTASection() {
	return (
		<section>
			<FadeInWrapper delay={0.1}>
				<div className="relative flex w-full flex-col items-center justify-center text-center">
					<h2 className="!leading-[1.15] mt-8 bg-clip-text py-4 text-center font-heading font-medium text-4xl tracking-tight md:text-7xl">
						Step into the future of link management
					</h2>
					<p className="mx-auto mt-6 max-w-md text-muted-foreground">
						Experience the cutting-edge solution that transforms how you handle
						your links. Elevate your online presence with our next-gen platform.
					</p>
					<div className="mt-6">
						<Button>
							Get started for free
							<ArrowRightIcon className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</div>
			</FadeInWrapper>
		</section>
	);
}
