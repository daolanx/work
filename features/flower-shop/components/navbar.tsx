"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./sheet";

const menuIcon = "/images/flower-shop/navbar/menu.svg";
const cartIcon = "/images/flower-shop/navbar/cart.svg";
const closeIcon = "/images/flower-shop/navbar/close.svg";
const instagramIcon = "/images/flower-shop/navbar/instagram.svg";
const pinterestIcon = "/images/flower-shop/navbar/pinterest.svg";
const facebookIcon = "/images/flower-shop/navbar/facebook.svg";
const twitterIcon = "/images/flower-shop/navbar/twitter.svg";
const telegramIcon = "/images/flower-shop/navbar/telegram.svg";

// Desktop navigation links (left side)
const desktopNavLinks = [
	{ label: "Shop", href: "/shop" },
	{ label: "Contact", href: "/contact" },
];

// Desktop navigation links (right side)
const desktopRightLinks = [
	{ label: "Sign in", href: "/signin" },
	{ label: "Cart", href: "/cart" },
];

// Mobile sheet menu links
const mobileNavLinks = [
	{ label: "Sign in", href: "/signin" },
	{ label: "Shop", href: "/shop" },
	{ label: "Services", href: "/services" },
	{ label: "Contact", href: "/contact" },
	{ label: "About us", href: "/about" },
];

// Footer links in mobile sheet
const footerLinks = [
	{ label: "Shipping & returns", href: "/shipping" },
	{ label: "Terms & conditions", href: "/terms" },
	{ label: "Privacy policy", href: "/privacy" },
];

// Social media links
const socialLinks = [
	{ icon: instagramIcon, label: "Instagram", href: "https://instagram.com" },
	{ icon: pinterestIcon, label: "Pinterest", href: "https://pinterest.com" },
	{ icon: facebookIcon, label: "Facebook", href: "https://facebook.com" },
	{ icon: twitterIcon, label: "Twitter", href: "https://twitter.com" },
	{ icon: telegramIcon, label: "Telegram", href: "https://telegram.com" },
];

export default function Navbar() {
	return (
		<nav
			className="sticky top-0 right-0 left-0 z-50 border-primary border-b border-solid bg-white"
			data-name="Navbar"
		>
			{/* Desktop: Full navigation (lg and above) */}
			<div className="hidden items-center justify-between lg:flex">
				{/* Left menu */}
				<div className="flex">
					{desktopNavLinks.map((link) => (
						<Link
							className="flex w-[180px] items-center justify-center border-primary border-r px-6 py-8 font-medium text-base text-primary tracking-wide"
							data-name="Navbar link/button"
							href={link.href}
							key={link.label}
						>
							<motion.span
								className="absolute inset-0"
								style={{ willChange: "backgroundColor", inset: 0 }}
								whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
							/>
							{link.label}
						</Link>
					))}
				</div>
				{/* Right menu */}
				<div className="flex">
					{desktopRightLinks.map((link) => (
						<Link
							className="flex w-[180px] items-center justify-center border-primary border-l px-6 py-8 font-medium text-base text-primary tracking-wide"
							data-name="Navbar link/button"
							href={link.href}
							key={link.label}
						>
							<motion.span
								className="absolute inset-0"
								style={{ willChange: "backgroundColor", inset: 0 }}
								whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
							/>
							{link.label}
						</Link>
					))}
				</div>
			</div>

			{/* Tablet: Icons only (md to lg) */}
			<div className="hidden items-center justify-between md:flex lg:hidden">
				<div className="flex">
					<button
						aria-label="Menu"
						className="flex cursor-pointer items-center justify-center border-primary border-r p-4"
						data-name="Navbar link/button"
						type="button"
					>
						<Image
							alt="Menu"
							className="h-6 w-6"
							height={24}
							src={menuIcon}
							unoptimized
							width={24}
						/>
					</button>
				</div>
				<div className="flex">
					<Link
						aria-label="Cart"
						className="flex items-center justify-center border-primary border-l p-4"
						data-name="Navbar link/button"
						href="/cart"
					>
						<Image
							alt="Cart"
							className="h-6 w-6"
							height={24}
							src={cartIcon}
							unoptimized
							width={24}
						/>
					</Link>
				</div>
			</div>

			{/* Mobile: Sheet menu (below md) */}
			<div className="flex items-center justify-between md:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<button
							aria-label="Menu"
							className="flex cursor-pointer items-center justify-center border-primary border-r p-3"
							data-name="Navbar link/button"
							type="button"
						>
							<Image
								alt="Menu"
								className="h-6 w-6"
								height={24}
								src={menuIcon}
								unoptimized
								width={24}
							/>
						</button>
					</SheetTrigger>
					<SheetContent
						className="w-[85vw] max-w-[384px] border-primary border-l p-0"
						showCloseButton={false}
						side="right"
					>
						<div className="flex h-full flex-col">
							{/* Header with close button */}
							<div className="flex items-center border-primary border-b px-4 py-3">
								<SheetClose asChild>
									<button
										aria-label="Close menu"
										className="flex h-8 w-8 cursor-pointer items-center justify-center"
										type="button"
									>
										<Image
											alt="Close"
											className="h-8 w-8"
											height={32}
											src={closeIcon}
											unoptimized
											width={32}
										/>
									</button>
								</SheetClose>
							</div>

							{/* Navigation links */}
							{mobileNavLinks.map((link) => (
								<Link
									className="flex items-center border-primary border-b px-6 py-5 font-medium text-base text-primary sm:text-lg"
									data-name="Navbar link/button"
									href={link.href}
									key={link.label}
								>
									{link.label}
								</Link>
							))}

							{/* Footer links */}
							<div className="flex flex-col gap-4 border-primary border-b px-6 py-6">
								{footerLinks.map((link) => (
									<Link
										className="font-medium text-base text-primary tracking-wide"
										href={link.href}
										key={link.label}
									>
										{link.label}
									</Link>
								))}
							</div>

							{/* Social media links */}
							<div className="flex items-center justify-between px-6 py-6">
								{socialLinks.map((social) => (
									<Link
										aria-label={social.label}
										className="h-6 w-6"
										href={social.href}
										key={social.label}
										rel="noopener noreferrer"
										target="_blank"
									>
										<Image
											alt={social.label}
											className="h-6 w-6"
											height={24}
											src={social.icon}
											unoptimized
											width={24}
										/>
									</Link>
								))}
							</div>
						</div>
					</SheetContent>
				</Sheet>
				<div className="flex">
					<Link
						aria-label="Cart"
						className="flex items-center justify-center border-primary border-l p-3"
						data-name="Navbar link/button"
						href="/cart"
					>
						<Image
							alt="Cart"
							className="h-6 w-6"
							height={24}
							src={cartIcon}
							unoptimized
							width={24}
						/>
					</Link>
				</div>
			</div>
		</nav>
	);
}
