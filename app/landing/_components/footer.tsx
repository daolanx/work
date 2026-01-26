import Link from "next/link";
import FadeInWrapper from "./fadeIn-wrapper";

export function Footer() {
	return (
		<footer className="section-max-width-wrapper mt-8 border-t px-6 pt-8 md:pb-0 lg:px-8">
			<div className="grid w-full gap-8 xl:grid-cols-3">
				<div className="grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
					<div className="md:grid md:grid-cols-2 md:gap-8">
						<FadeInWrapper delay={0.2}>
							<div className="">
								<h3 className="font-medium text-base">Product</h3>
								<ul className="mt-4 text-sm">
									<li className="mt-2">
										<Link
											className="transition-all duration-300 hover:text-foreground"
											href=""
										>
											Features
										</Link>
									</li>
									<li className="mt-2">
										<Link
											className="transition-all duration-300 hover:text-foreground"
											href=""
										>
											Pricing
										</Link>
									</li>
									<li className="mt-2">
										<Link
											className="transition-all duration-300 hover:text-foreground"
											href=""
										>
											Testimonials
										</Link>
									</li>
									<li className="mt-2">
										<Link
											className="transition-all duration-300 hover:text-foreground"
											href=""
										>
											Integration
										</Link>
									</li>
								</ul>
							</div>
						</FadeInWrapper>
						<FadeInWrapper delay={0.3}>
							<div className="mt-10 flex flex-col md:mt-0">
								<h3 className="font-medium text-base">Integrations</h3>
								<ul className="mt-4 text-sm">
									<li className="">
										<Link
											className="transition-all duration-300 hover:text-foreground"
											href=""
										>
											Facebook
										</Link>
									</li>
									<li className="mt-2">
										<Link
											className="transition-all duration-300 hover:text-foreground"
											href=""
										>
											Instagram
										</Link>
									</li>
									<li className="mt-2">
										<Link
											className="transition-all duration-300 hover:text-foreground"
											href=""
										>
											Twitter
										</Link>
									</li>
									<li className="mt-2">
										<Link
											className="transition-all duration-300 hover:text-foreground"
											href=""
										>
											LinkedIn
										</Link>
									</li>
								</ul>
							</div>
						</FadeInWrapper>
					</div>
					<div className="md:grid md:grid-cols-2 md:gap-8">
						<FadeInWrapper delay={0.4}>
							<div className="">
								<h3 className="font-medium text-base">Resources</h3>
								<ul className="mt-4 text-sm">
									<li className="mt-2">
										<Link
											className="transition-all duration-300 hover:text-foreground"
											href="/resources/blog"
										>
											Blog
										</Link>
									</li>
									<li className="mt-2">
										<Link
											className="transition-all duration-300 hover:text-foreground"
											href="/resources/help"
										>
											Support
										</Link>
									</li>
								</ul>
							</div>
						</FadeInWrapper>
						<FadeInWrapper delay={0.5}>
							<div className="mt-10 flex flex-col md:mt-0">
								<h3 className="font-medium text-base">Company</h3>
								<ul className="mt-4 text-sm">
									<li className="">
										<Link
											className="transition-all duration-300 hover:text-foreground"
											href=""
										>
											About Us
										</Link>
									</li>
									<li className="mt-2">
										<Link
											className="transition-all duration-300 hover:text-foreground"
											href="/privacy"
										>
											Privacy Policy
										</Link>
									</li>
									<li className="mt-2">
										<Link
											className="transition-all duration-300 hover:text-foreground"
											href="/terms"
										>
											Terms & Conditions
										</Link>
									</li>
								</ul>
							</div>
						</FadeInWrapper>
					</div>
				</div>
			</div>

			<div className="mt-8 w-full border-border/40 border-t py-2 md:flex md:items-center md:justify-between md:py-4">
				<FadeInWrapper delay={0.6}>
					<p className="text-sm">
						&copy; {new Date().getFullYear()} Dax INC. All rights reserved.
					</p>
				</FadeInWrapper>
			</div>
		</footer>
	);
}

export default Footer;
