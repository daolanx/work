import Image from "next/image";
import FadeInWrapper from ".//fadeIn-wrapper";

export const COMPANIES = [
	{
		name: "Asana",
		logo: "company-01.svg",
	},
	{
		name: "Tidal",
		logo: "company-02.svg",
	},
	{
		name: "Innovaccer",
		logo: "company-03.svg",
	},
	{
		name: "Linear",
		logo: "company-04.svg",
	},
	{
		name: "Raycast",
		logo: "company-05.svg",
	},
	{
		name: "Labelbox",
		logo: "company-06.svg",
	},
];

export default function CompanySection() {
	return (
		<section>
			<FadeInWrapper delay={0.4}>
				<div className="py-14">
					<div className="mx-auto px-4 md:px-8">
						<h2 className="text-center font-heading font-medium text-neutral-400 text-sm uppercase">
							Trusted by the best in the industry
						</h2>
						<div className="mt-8">
							<ul className="grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
								{COMPANIES.map((company) => (
									<li
										className="flex h-20 w-full items-center justify-center rounded-xl bg-gray-600 p-4 shadow-sm"
										key={company.name}
									>
										<Image
											alt={company.name}
											className="h-auto w-auto max-w-[110px] object-contain"
											height={60}
											src={`/landing/${company.logo}`}
											width={120}
										/>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</FadeInWrapper>
		</section>
	);
}
