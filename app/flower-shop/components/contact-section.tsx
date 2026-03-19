"use client";

import Image from "next/image";
import { SocialLinks } from "./social-links";

const phoneNumbers = ["+380980099777", "+380980099111"];

const socialLinks = [
	{
		name: "Instagram",
		href: "#",
		icon: "/images/flower-shop/contact/icon-instagram.svg",
	},
	{
		name: "Pinterest",
		href: "#",
		icon: "/images/flower-shop/contact/icon-pinterest.svg",
	},
	{
		name: "Facebook",
		href: "#",
		icon: "/images/flower-shop/contact/icon-facebook.svg",
	},
	{
		name: "Twitter",
		href: "#",
		icon: "/images/flower-shop/contact/icon-twitter.svg",
	},
	{
		name: "Telegram",
		href: "#",
		icon: "/images/flower-shop/contact/icon-telegram.svg",
	},
];

export default function ContactSection() {
	return (
		<section className="mx-auto w-full">
			<div className="flex flex-col md:flex-row">
				{/* Left Column */}
				<div className="flex flex-col md:w-1/2">
					{/* Top Block - Title + Form */}
					<div className="border-primary border-t px-8 py-10 md:px-20 md:py-20">
						<h2 className="font-semibold text-4xl text-primary leading-tight md:text-5xl">
							Let&apos;s Talk
						</h2>
						<div className="mt-6">
							<p className="font-medium text-lg text-primary leading-relaxed">
								Enter your number and we&apos;ll call you back ASAP to help you
								with any questions or to place an order
							</p>
							<div className="mt-4 flex w-full flex-col gap-4 md:flex-row">
								<input
									aria-label="Your Email"
									className="h-14 border border-muted-light px-4 text-base md:flex-1"
									placeholder="Your Email"
									type="email"
								/>
								<button
									className="h-14 cursor-pointer border border-muted-light bg-primary text-base text-white md:flex-1"
									type="submit"
								>
									REACH US
								</button>
							</div>
						</div>
					</div>

					{/* Bottom Block - Phone + Address */}
					<div className="flex flex-col md:flex-row md:divide-x md:divide-primary">
						{/* Phone Column */}
						<div className="flex-1 bg-white text-center">
							<div className="border-primary border-t border-b px-4 py-4 md:px-2.5">
								<h3 className="font-medium text-4xl leading-tight">Phone</h3>
							</div>
							<div className="flex flex-col items-center justify-center gap-4 px-4 py-6">
								{phoneNumbers.map((phone) => (
									<a
										className="flex w-full items-center justify-center gap-2 font-semibold text-base text-primary tracking-wide transition-opacity hover:opacity-70"
										href={`tel:${phone}`}
										key={phone}
									>
										<Image
											alt="Phone"
											className="h-6 w-6"
											height={24}
											src="/images/flower-shop/contact/icon-call.svg"
											unoptimized
											width={24}
										/>
										{phone}
									</a>
								))}
							</div>
						</div>

						{/* Address Column */}
						<div className="flex-1 bg-white text-center">
							<div className="border-primary border-t border-b px-4 py-4 md:px-2.5">
								<h3 className="font-medium text-4xl text-primary leading-tight">
									Address
								</h3>
							</div>
							<div className="flex flex-col items-center justify-center gap-4 px-4 py-6">
								<p className="text-center font-medium text-primary text-sm uppercase tracking-wide">
									Opening hours: 8 to 11 p.m.
								</p>
								<a
									className="flex items-center justify-center gap-1 font-semibold text-base text-primary tracking-wide transition-opacity hover:opacity-70"
									href="#"
								>
									<Image
										alt="Location"
										className="h-6 w-6"
										height={24}
										src="/images/flower-shop/contact/icon-location.svg"
										unoptimized
										width={24}
									/>
									15/4 Khreshchatyk Street, Kyiv
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Right Column - Background Image + Social */}
				<div className="relative h-[360px] min-h-[400px] border-primary md:h-auto md:w-1/2 md:border-l">
					<div className="absolute inset-0">
						<Image
							alt="Contact background"
							className="object-cover"
							fill
							sizes="(max-width: 768px) 100vw, 50vw"
							src="/images/flower-shop/contact/contact-bg.png"
							unoptimized
						/>
					</div>

					{/* Follow us */}
					<div className="absolute right-0 bottom-0 left-0 flex flex-col md:flex-row">
						<div className="flex-1 border-primary border-t bg-white px-10 py-4">
							<h3 className="font-medium text-4xl text-primary leading-tight">
								Follow us
							</h3>
						</div>
						<div className="flex flex-1 items-center justify-between border-primary border-t border-l bg-white px-10 py-4">
							<SocialLinks links={socialLinks} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
