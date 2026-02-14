import { Menu } from "lucide-react";
import { useState } from "react";
import { IconGithub } from "@/components/auth/icon-github";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { navs } from "./navbar";

export default function ToolBar() {
	return (
		<>
			<LargeToolbar />
			<MiniToolbar />
		</>
	);
}

function LargeToolbar() {
	return (
		<div className="hidden items-center space-x-4 text-sm md:flex">
			<Button>Sign Up</Button>
			<Button variant={"outline"}>Sign In</Button>
			<IconGithub />
		</div>
	);
}

function MiniToolbar() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className="flex items-center justify-end md:hidden">
			<Sheet onOpenChange={setIsOpen} open={isOpen}>
				<SheetTrigger asChild>
					<Button className="md:hidden" size="icon" variant="ghost" aria-label="Open menu">
						<Menu className="h-6 w-6" />
					</Button>
				</SheetTrigger>
				<SheetContent className="w-screen pt-10" side="top">
					<SheetHeader className="sr-only">
						<SheetTitle>Navigation Menu</SheetTitle>
					</SheetHeader>

					<div className="flex flex-col gap-4">
						<Accordion className="w-full" collapsible type="single">
							{navs.map((nav) => {
								if (nav.subNavs.length === 0) {
									return (
										<a
											className="block w-full border-gray-200 border-b p-4 font-medium text-sm transition-colors hover:bg-gray-100"
											href={`/${nav.label.toLowerCase()}`}
											key={nav.label}
										>
											{nav.label}
										</a>
									);
								}

								return (
									<AccordionItem key={nav.label} value={nav.label}>
										<AccordionTrigger className="p-4 font-medium text-sm hover:bg-gray-100 hover:no-underline">
											{nav.label}
										</AccordionTrigger>
										<AccordionContent>
											<div className="mr-4 ml-1 flex flex-col gap-3 border-l py-2 pl-2">
												{nav.subNavs.map((sub) => (
													<a
														className="flex flex-col gap-1 rounded-lg p-2 transition-all hover:bg-gray-100"
														href={`/products/${sub.label.toLowerCase().replace(/\s+/g, "-")}`}
														key={sub.label}
													>
														<span className="font-semibold text-sm text-zinc-800">
															{sub.label}
														</span>
													</a>
												))}
											</div>
										</AccordionContent>
									</AccordionItem>
								);
							})}
						</Accordion>
					</div>

					<div className="grid w-full grid-cols-1 gap-y-4 p-4">
						<Button>Sign Up</Button>
						<Button variant={"outline"}>Sign In</Button>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
