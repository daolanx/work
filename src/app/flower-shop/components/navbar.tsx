'use client';

import Link from 'next/link';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import { motion } from 'motion/react';

const menuIcon = '/images/flower-shop/navbar/menu.svg';
const cartIcon = '/images/flower-shop/navbar/cart.svg';
const closeIcon = '/images/flower-shop/navbar/close.svg';
const instagramIcon = '/images/flower-shop/navbar/instagram.svg';
const pinterestIcon = '/images/flower-shop/navbar/pinterest.svg';
const facebookIcon = '/images/flower-shop/navbar/facebook.svg';
const twitterIcon = '/images/flower-shop/navbar/twitter.svg';
const telegramIcon = '/images/flower-shop/navbar/telegram.svg';

// Desktop navigation links (left side)
const desktopNavLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
];

// Desktop navigation links (right side)
const desktopRightLinks = [
  { label: 'Sign in', href: '/signin' },
  { label: 'Cart', href: '/cart' },
];

// Mobile sheet menu links
const mobileNavLinks = [
  { label: 'Sign in', href: '/signin' },
  { label: 'Shop', href: '/shop' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
  { label: 'About us', href: '/about' },
];

// Footer links in mobile sheet
const footerLinks = [
  { label: 'Shipping & returns', href: '/shipping' },
  { label: 'Terms & conditions', href: '/terms' },
  { label: 'Privacy policy', href: '/privacy' },
];

// Social media links
const socialLinks = [
  { icon: instagramIcon, label: 'Instagram', href: 'https://instagram.com' },
  { icon: pinterestIcon, label: 'Pinterest', href: 'https://pinterest.com' },
  { icon: facebookIcon, label: 'Facebook', href: 'https://facebook.com' },
  { icon: twitterIcon, label: 'Twitter', href: 'https://twitter.com' },
  { icon: telegramIcon, label: 'Telegram', href: 'https://telegram.com' },
];

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-primary border-solid"
      data-name="Navbar"
    >
      {/* Desktop: Full navigation (lg and above) */}
      <div className="hidden lg:flex items-center justify-between">
        {/* Left menu */}
        <div className="flex">
          {desktopNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-center w-[180px] px-6 py-8 border-r border-primary font-medium text-base tracking-wide text-primary"
              data-name="Navbar link/button"
            >
              <motion.span
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                style={{ willChange: 'backgroundColor', inset: 0 }}
                className="absolute inset-0"
              />
              {link.label}
            </Link>
          ))}
        </div>
        {/* Right menu */}
        <div className="flex">
          {desktopRightLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-center w-[180px] px-6 py-8 border-l border-primary font-medium text-base tracking-wide text-primary"
              data-name="Navbar link/button"
            >
              <motion.span
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                style={{ willChange: 'backgroundColor', inset: 0 }}
                className="absolute inset-0"
              />
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Tablet: Icons only (md to lg) */}
      <div className="hidden md:flex lg:hidden items-center justify-between">
        <div className="flex">
          <button
            type="button"
            className="flex items-center justify-center p-4 border-r border-primary"
            data-name="Navbar link/button"
            aria-label="Menu"
          >
            <Image src={menuIcon} alt="Menu" width={24} height={24} className="w-6 h-6" />
          </button>
        </div>
        <div className="flex">
          <Link
            href="/cart"
            className="flex items-center justify-center p-4 border-l border-primary"
            data-name="Navbar link/button"
            aria-label="Cart"
          >
            <Image src={cartIcon} alt="Cart" width={24} height={24} className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Mobile: Sheet menu (below md) */}
      <div className="flex md:hidden items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="flex items-center justify-center p-3 border-r border-primary"
              data-name="Navbar link/button"
              aria-label="Menu"
            >
              <Image src={menuIcon} alt="Menu" width={24} height={24} className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[384px] border-l border-primary p-0"
            showCloseButton={false}
          >
            <div className="flex flex-col h-full">
              {/* Header with close button */}
              <div className="flex items-center px-4 py-3 border-b border-primary">
                <SheetClose asChild>
                  <button
                    type="button"
                    className="flex items-center justify-center w-8 h-8"
                    aria-label="Close menu"
                  >
                    <Image src={closeIcon} alt="Close" width={32} height={32} className="w-8 h-8" />
                  </button>
                </SheetClose>
              </div>

              {/* Navigation links */}
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center px-6 py-6 border-b border-primary font-medium text-xl text-primary"
                  data-name="Navbar link/button"
                >
                  {link.label}
                </Link>
              ))}

              {/* Footer links */}
              <div className="flex flex-col gap-4 px-6 py-6 border-b border-primary">
                {footerLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-medium text-base tracking-wide text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Social media links */}
              <div className="flex items-center justify-between px-6 py-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6 h-6"
                    aria-label={social.label}
                  >
                    <Image
                      src={social.icon}
                      alt={social.label}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex">
          <Link
            href="/cart"
            className="flex items-center justify-center p-3 border-l border-primary"
            data-name="Navbar link/button"
            aria-label="Cart"
          >
            <Image src={cartIcon} alt="Cart" width={24} height={24} className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
