"use client";

import { motion } from "motion/react";
import { SocialLinks } from "./social-links";

const shopLinks = [
	"All Products",
	"Fresh Flowers",
	"Dried Flowers",
	"Live Plants",
	"Designer Vases",
	"Aroma Candles",
	"Freshener Diffuser",
];

const serviceLinks = ["Flower Subcription", "Wedding & Event Decor"];

const aboutLinks = [
	"Our story",
	"Blog",
	"Shipping & returns",
	"Terms & conditions",
	"Privacy policy",
];

const socialLinks = [
	{ name: "Instagram", icon: "/images/flower-shop/footer/icon-instagram.svg" },
	{ name: "Pinterest", icon: "/images/flower-shop/footer/icon-pinterest.svg" },
	{ name: "Facebook", icon: "/images/flower-shop/footer/icon-facebook.svg" },
	{ name: "Twitter", icon: "/images/flower-shop/footer/icon-twitter.svg" },
	{ name: "Telegram", icon: "/images/flower-shop/footer/icon-telegram.svg" },
];

export default function Footer() {
	return (
		<footer className="mx-auto w-full border-primary border-t">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
				{/* Column 1: Newsletter */}
				<motion.div
					className="p-8 md:p-10"
					initial={{ opacity: 0, y: 30 }}
					style={{ willChange: "opacity, transform" }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<div className="flex flex-col gap-6">
						<p className="text-base text-primary leading-relaxed">
							Remember to offer beautiful flowers from Kyiv LuxeBouquets
							Valentines Day, Mothers Day, Christmas... Reminds you 7 days
							before. No spam or sharing your address
						</p>
						<div className="flex flex-col gap-4">
							<input
								aria-label="Your Email"
								className="h-14 border border-muted-light px-4 text-sm focus:outline-none"
								placeholder="Your Email"
								type="email"
							/>
							<button
								className="flex h-14 cursor-pointer items-center justify-center bg-primary font-medium text-base text-white uppercase tracking-widest transition-opacity hover:opacity-90"
								type="submit"
							>
								Remind
							</button>
						</div>
					</div>
				</motion.div>

				{/* Column 2: Contact Us */}
				<motion.div
					className="border-primary border-t p-8 md:border-t-0 md:border-l md:p-10"
					initial={{ opacity: 0, y: 30 }}
					style={{ willChange: "opacity, transform" }}
					transition={{ duration: 0.6, delay: 0.1 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<div className="flex flex-col gap-6">
						<h3 className="font-medium text-xl">Contact Us</h3>

						<div className="flex flex-col gap-2">
							<p className="text-sm">Address</p>
							<p className="font-medium text-base text-primary tracking-wide">
								15/4 Khreshchatyk Street, Kyiv
							</p>
						</div>

						<div className="flex flex-col gap-2">
							<p className="text-sm">Phone</p>
							<motion.a
								className="font-medium text-base text-primary tracking-wide hover:opacity-70"
								href="tel:+380980099777"
								style={{ willChange: "transform" }}
								whileHover={{ x: 4 }}
							>
								+380980099777
							</motion.a>
						</div>

						<div className="flex flex-col gap-2">
							<p className="text-sm">General Enquiry:</p>
							<motion.a
								className="font-medium text-base text-primary tracking-wide hover:opacity-70"
								href="mailto:Kiev.Florist.Studio@gmail.com"
								style={{ willChange: "transform" }}
								whileHover={{ x: 4 }}
							>
								Kiev.Florist.Studio@gmail.com
							</motion.a>
						</div>

						<div className="flex flex-col gap-4 pt-2">
							<h4 className="font-medium text-xl">Follow Us</h4>
							<SocialLinks links={socialLinks} />
						</div>
					</div>
				</motion.div>

				{/* Column 3: Shop + Service */}
				<motion.div
					className="border-primary border-t p-8 md:border-t-0 md:border-l md:p-10"
					initial={{ opacity: 0, y: 30 }}
					style={{ willChange: "opacity, transform" }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<div className="flex flex-col gap-6">
						<h3 className="font-medium text-xl">Shop</h3>
						<div className="flex flex-col gap-3">
							{shopLinks.map((link) => (
								<motion.a
									className="font-medium text-base text-primary tracking-wide hover:opacity-70"
									href="#"
									key={link}
									whileHover={{ x: 4 }}
								>
									{link}
								</motion.a>
							))}
						</div>

						<h3 className="pt-4 font-medium text-xl">Service</h3>
						<div className="flex flex-col gap-3">
							{serviceLinks.map((link) => (
								<motion.a
									className="font-medium text-base text-primary tracking-wide hover:opacity-70"
									href="#"
									key={link}
									whileHover={{ x: 4 }}
								>
									{link}
								</motion.a>
							))}
						</div>
					</div>
				</motion.div>

				{/* Column 4: About Us */}
				<motion.div
					className="border-primary border-t p-8 md:border-t-0 md:border-l md:p-10"
					initial={{ opacity: 0, y: 30 }}
					style={{ willChange: "opacity, transform" }}
					transition={{ duration: 0.6, delay: 0.3 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<div className="flex flex-col gap-6">
						<h3 className="font-medium text-xl">About Us</h3>
						<div className="flex flex-col gap-3">
							{aboutLinks.map((link) => (
								<motion.a
									className="font-medium text-base text-primary tracking-wide hover:opacity-70"
									href="#"
									key={link}
									whileHover={{ x: 4 }}
								>
									{link}
								</motion.a>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}
